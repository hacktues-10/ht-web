import { signInRedirect } from "~/app/api/auth/session";
import { getNotifications } from "../../notifications/actions";
import {
  InvitationNotification,
  JoinRequestNotification,
} from "./Notification";

export default async function NotificationsLoader() {
  const notifications = await getNotifications();
  console.log(notifications);
  if (!notifications) {
    signInRedirect();
  }

  return (
    <div>
      <h1>Notifications</h1>
      {notifications?.map((notification) => {
        switch (notification.type) {
          case "ask_join":
            return <JoinRequestNotification notification={notification} />;
          case "invitation":
            return <InvitationNotification notification={notification} />;
        }
      })}
      <pre>{JSON.stringify(notifications, null, 2)}</pre>
    </div>
  );
}
