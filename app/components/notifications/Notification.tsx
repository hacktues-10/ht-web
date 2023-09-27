import { joinRequests, notifications } from "~/app/db/schema";
import { type NotificationList } from "~/app/notifications/actions";
import { getParticipantFromSession } from "~/app/participants/service";
import { getParticipantById } from "~/app/user/configure/actions";
import JoinRequestActionButtons from "./NotificationActionButtons";
import invariant from "tiny-invariant";

// Rename the interface to avoid naming conflict
type NotificationData = NotificationList[number];

export default function Notification({
  notification,
}: {
  notification: NotificationData;
}) {
  switch (notification.type) {
    case "ask_join":
      return <JoinRequestNotification notification={notification} />;
    default:
      return null;
  }
}

async function JoinRequestNotification({
  notification,
}: {
  notification: NotificationData;
}) {
  invariant(
    notification.type === "ask_join" && notification.joinRequest !== null
  );

  const participant = await getParticipantFromSession();
  const fromParticipant = await getParticipantById(
    notification.joinRequest.userId
  );

  if (notification.targetUserId === participant?.id) {
    return (
      <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-2 text-lg font-semibold text-black">
          {notification.type === "ask_join" ? "Join request" : "Invite request"}
        </div>
        <div className="text-sm text-black">
          <p>
            От:{" "}
            {fromParticipant?.firstName +
              (fromParticipant?.lastName ? " " + fromParticipant.lastName : "")}
          </p>
          <p>
            Клас:{" "}
            {fromParticipant?.grade +
              (fromParticipant?.parallel
                ? " " + fromParticipant.parallel
                : " ")}
          </p>
          <p>Технологии: {fromParticipant?.technologies}</p>
        </div>
        <div>
          <JoinRequestActionButtons joinRequest={notification.joinRequest} />
        </div>
      </div>
    );
  }
}
