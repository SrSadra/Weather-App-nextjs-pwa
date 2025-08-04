import HomePage from "@/component/HomePage";
import PushNotificationManager from "@/component/PushNotification";
import PwaHome from "@/component/PwaHome";
import SearchWeather from "@/component/SearchWeather";

export default function Home() {
  return (
    <div>
      <PushNotificationManager />
      <PwaHome />
      <HomePage />
    </div>
  );
}
