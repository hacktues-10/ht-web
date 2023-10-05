import invariant from "tiny-invariant";

import { type NotificationList } from "~/app/notifications/actions";
import { getParticipantFromSession } from "~/app/participants/service";
import { getParticipantById } from "~/app/user/configure/actions";
import JoinRequestActionButtons, {
  InvitationActionButtons,
} from "./NotificationActionButtons";

// Rename the interface to avoid naming conflict
type NotificationData = NotificationList[number];

export default async function Notification({
  notification,
}: {
  notification: NotificationData;
}) {
  const participant = await getParticipantFromSession();
  invariant(participant !== null);

  switch (notification.type) {
    case "ask_join":
      return <JoinRequestNotification notification={notification} />;
    case "invitation":
      return participant.isLookingForTeam ? (
        <InvitationNotification notification={notification} />
      ) : null;
    default:
      return null;
  }
}

export async function JoinRequestNotification({
  notification,
}: {
  notification: NotificationData;
}) {
  invariant(
    notification.type === "ask_join" && notification.joinRequest !== null,
  );

  const participant = await getParticipantFromSession();
  const senderParticipant = await getParticipantById(
    notification.joinRequest.userId,
  );

  if (notification.targetUserId === participant?.id) {
    return (
      <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-2 text-lg font-semibold text-black">
          Join request
        </div>
        <div className="text-sm text-black">
          <p>
            От:{" "}
            {senderParticipant?.firstName +
              (senderParticipant?.lastName
                ? " " + senderParticipant.lastName
                : "")}
          </p>
          <p>
            Клас:{" "}
            {senderParticipant?.grade +
              (senderParticipant?.parallel
                ? " " + senderParticipant.parallel
                : " ")}
          </p>
          <p>Технологии: {senderParticipant?.technologies}</p>
        </div>
        <div>
          <JoinRequestActionButtons joinRequest={notification.joinRequest} />
        </div>
      </div>
    );
  }
}

export async function InvitationNotification({
  notification,
}: {
  notification: NotificationData;
}) {
  invariant(
    notification.type === "invitation" && notification.invitation !== null,
  );

  const participant = await getParticipantFromSession();
  const senderParticipant = await getParticipantById(
    notification.invitation.senderParticipantId,
  );

  if (notification.targetUserId === participant?.id) {
    return (
      <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-2 text-lg font-semibold text-black">Invitation</div>
        <div className="text-sm text-black">
          <p>
            От:{" "}
            {senderParticipant?.firstName +
              (senderParticipant?.lastName
                ? " " + senderParticipant.lastName
                : "")}
          </p>
          <p>
            Клас:{" "}
            {senderParticipant?.grade +
              (senderParticipant?.parallel
                ? " " + senderParticipant.parallel
                : " ")}
          </p>
          <p>Технологии: {senderParticipant?.technologies}</p>
        </div>
        <div>
          <InvitationActionButtons invitation={notification.invitation} />
        </div>
      </div>
    );
  }
}
