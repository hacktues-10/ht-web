import { getNotifications } from "../../notifications/actions";
import Notification from "./Notification";

export default async function NotificationsLoader() {
  const notifications = await getNotifications();

  return (
    <div>
      <h1>Notifications</h1>
      {notifications?.map((notification) => {
        return (
          <Notification key={notification.id} notification={notification} />
        );
      })}
    </div>
  );
}
