import { getNotifications } from "~/app/notifications/actions";
import NotificationItem from "./notification";

export default async function NotificationLoader() {
  const notifications = await getNotifications();

  return (
    <div>
      <h1>Notifications</h1>
      {notifications?.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      <pre>{JSON.stringify(notifications, null, 2)}</pre>
    </div>
  );
}
