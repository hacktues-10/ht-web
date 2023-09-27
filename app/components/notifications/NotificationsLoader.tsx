import { getNotifications } from "../../notifications/actions";
import JoinRequestNotification from "./Notification";

export default async function NotificationsLoader() {
  const notifications = await getNotifications();
  console.log(notifications);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications?.map((notification) => {
        return (
          <JoinRequestNotification
            key={notification.id}
            notification={notification}
          />
        );
      })}
      <pre>{JSON.stringify(notifications, null, 2)}</pre>
    </div>
  );
}
