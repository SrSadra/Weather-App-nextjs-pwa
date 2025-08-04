"use client";

import { sendNotification, subscribeUser, unsubscribeUser } from "@/app/actions/actions";
import { useEffect, useState } from "react";

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export default function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            registerServiceWorker();
        }
    }, []);

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        });
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
    }

    async function subscribeToPush() {
        const registration = await navigator.serviceWorker.ready; // wait until service worker is active and ready
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true, //means every push message must show a notification to the user — required by most browsers.
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
            ),
        });
        setSubscription(sub);
        
        await subscribeUser(sub.toJSON()); // sub object contains methods and properties that are not serializable 
        // this is not ok for action file that is rendered on server
    }

    async function unsubscribeFromPush() {
        console.log("subbb" , subscription);
        
        await unsubscribeUser(subscription?.endpoint);
        await subscription?.unsubscribe();
        setSubscription(null);
    }

    async function sendTestNotification() {
        if (subscription) {
            await sendNotification(message , "From Weather App");
            setMessage('');
        }
    }

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>;
    }

    return (
        <div>
            <h3>Push Notifications</h3>
            {subscription ? (
                <>
                    <p>You are subscribed to push notifications.</p>
                    <button onClick={unsubscribeFromPush}>Unsubscribe</button>
                    <input
                        type="text"
                        placeholder="Enter notification message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendTestNotification}>Send Test</button>
                </>
            ) : (
                <>
                    <p>You are not subscribed to push notifications.</p>
                    <button onClick={subscribeToPush}>Subscribe</button>
                </>
            )}
        </div>
    );
}