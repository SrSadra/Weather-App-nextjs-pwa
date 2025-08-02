"use server";

import clientPromise from "@/lib/utils/mongodb";

const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:sadraspurs@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function sendNotification(message, title) {
  try {
    const myClient = await clientPromise;
    const db = myClient.db("pwa");
    const collection = db.collection("subscription");

    const subscriptions = await collection.find().toArray();

    if (!subscriptions.length) throw new Error("No subscribers");

    const results = await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            sub,
            JSON.stringify({
              title,
              body: message,
              icon: "/icon1.png",
            })
          );
          return { success: true };
        } catch (err) {
          // Optionally remove invalid subscriptions
          if (err.statusCode === 410 || err.statusCode === 404) {
            await collection.deleteOne({ endpoint: sub.endpoint });
          }
          return { success: false };
        }
      })
    );

    return { success: true, results };
  } catch (err) {
    console.error("Error sending notifications:", err);
    return { success: false };
  }
}

export async function subscribeUser(sub) {
  try {
    const myClient = await clientPromise;
    const db = myClient.db("pwa");
    const collection = db.collection("subscription");

    // Optional: prevent duplicate subscriptions
    await collection.updateOne(
      { endpoint: sub.endpoint },
      { $set: sub },
      { upsert: true }
    );

    return { success: true };
  } catch (err) {
    console.error("DB error:", err);
    return { success: false };
  }
}

export async function unsubscribeUser(endpoint) {
  try {
    if (endpoint === null || endpoint === "") {
      throw new Error("no endpoint found");
    }
    const myClient = await clientPromise;
    const db = myClient.db("pwa");
    const collection = db.collection("subscription");

    await collection.deleteOne({ endpoint });
    return { success: true };
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return { success: false };
  }
}
