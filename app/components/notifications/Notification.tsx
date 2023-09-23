import { getNotificationDetails } from "~/app/notifications/actions";
import { getParticipantFromSession } from "~/app/participants/service";

// Rename the interface to avoid naming conflict
interface NotificationData {
  id: number;
  targetUserId: number;
  referenceId: number;
  type: "invitation" | "ask_join";
}

export default async function Notification({
  notification,
}: {
  notification: NotificationData;
}) {
  const res = await getNotificationDetails(notification);
  const user = await getParticipantFromSession();

  if (res?.userId == notification.targetUserId && res?.userId == user?.id)
    return (
      <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-2 text-lg font-semibold text-black">
          {notification.type == "ask_join" ? "Join request" : "Invite request"}
        </div>
        <div className="text-sm text-black">
          <p>Team: {res?.teamName}</p>
        </div>
        <div className="">
          <button
            className="m-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            //   onClick={() => console.log("Request accepted")}
          >
            Accept
          </button>
          <button
            className="m-1 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            //   onClick={() => console.log("Request declined")}
          >
            Decline
          </button>
        </div>
      </div>
    );
}
