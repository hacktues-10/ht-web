import { getNotificationDetails } from "~/app/notifications/actions";
import { getParticipantFromSession } from "~/app/participants/service";
import { getParticipantById } from "~/app/user/configure/actions";

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
  const fromUser = await getParticipantById(res?.userId);

  if (notification.targetUserId === user?.id) {
    return (
      <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-2 text-lg font-semibold text-black">
          {notification.type === "ask_join" ? "Join request" : "Invite request"}
        </div>
        <div className="text-sm text-black">
          <p>
            От:{" "}
            {fromUser?.firstName +
              (fromUser?.lastName ? " " + fromUser.lastName : "")}
          </p>
          <p>
            Клас:{" "}
            {fromUser?.grade +
              (fromUser?.parallel ? " " + fromUser.parallel : " ")}
          </p>
          <p>Технологии: {fromUser?.technologies}</p>
        </div>
        <div>
          <button
            className="m-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            // onClick={() => console.log("Request accepted")}
          >
            Accept
          </button>
          <button
            className="m-1 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            // onClick={() => console.log("Request declined")}
          >
            Decline
          </button>
        </div>
      </div>
    );
  }
}
