import invariant from "tiny-invariant";

import { Card } from "~/app/components/ui/card";
import { HTNotification } from "../service";
import {
  InvitationActionButtons,
  JoinRequestActionButtons,
} from "./notification-action-buttons";

export default function NotificationItem({
  notification,
  participant,
}: {
  notification: HTNotification;
  participant: { id: number; isLookingForTeam: boolean };
}) {
  console.log(notification);
  console.log(participant);
  console.log(notification.type);
  switch (notification.type) {
    case "ask_join":
      return (
        <JoinRequestNotification
          notification={notification}
          participant={participant}
        />
      );
    case "invitation":
      console.log("VLIZA");
      return participant.isLookingForTeam ? (
        <InvitationNotification
          notification={notification}
          participant={participant}
        />
      ) : null;
    default:
      return null;
  }
}

function JoinRequestNotification({
  notification,
  participant,
}: {
  notification: HTNotification;
  participant: { id: number; isLookingForTeam: boolean };
}) {
  invariant(notification.type === "ask_join");
  console.log("in client component");

  if (notification.targetUserId === participant.id) {
    return (
      <Card>
        <div className="flex">
          <div className="m-5 flex h-8 flex-1 items-center overflow-ellipsis">
            <p className="text-sm">
              <strong className="font-semibold">
                {notification.joinRequest.senderParticipant.firstName +
                  (notification.joinRequest.senderParticipant.lastName
                    ? " " + notification.joinRequest.senderParticipant.lastName
                    : "")}
              </strong>{" "}
              от{" "}
              <strong className="font-semibold">
                {notification.joinRequest.senderParticipant.grade +
                  (notification.joinRequest.senderParticipant.parallel
                    ? " " + notification.joinRequest.senderParticipant.parallel
                    : " ")}
              </strong>{" "}
              иска да се присъедини към отбор{" "}
              <strong className="font-semibold">
                {notification.joinRequest.teamName}
              </strong>
              .
            </p>
          </div>
          <div className="mb-auto mt-auto">
            <JoinRequestActionButtons joinRequest={notification.joinRequest} />
          </div>
        </div>
      </Card>
    );
  }
}

function InvitationNotification({
  notification,
  participant,
}: {
  notification: HTNotification;
  participant: { id: number };
}) {
  console.log("in client component");
  invariant(
    notification.type === "invitation" && notification.invitation !== null,
  );

  if (notification.targetUserId === participant?.id) {
    return (
      // <Card>
      //   <div className="flex">
      //     <div className="m-5 flex  flex-1 items-center overflow-ellipsis">
      //       <p className="text-xs">
      //         <strong className="font-semibold">
      //           {notification.invitation.senderParticipant.firstName +
      //             (notification.invitation.senderParticipant.lastName
      //               ? " " + notification.invitation.senderParticipant.lastName
      //               : "")}
      //         </strong>{" "}
      //         от{" "}
      //         <strong className="font-semibold">
      //           {notification.invitation.senderParticipant.grade +
      //             (notification.invitation.senderParticipant.parallel
      //               ? " " + notification.invitation.senderParticipant.parallel
      //               : " ")}
      //         </strong>{" "}
      //         те кани да си част от отбор{" "}
      //         <strong className="font-semibold">
      //           {notification.invitation.teamName}
      //         </strong>
      //         .
      //       </p>
      //     </div>
      //     <div className="mb-auto mt-auto">
      //       <InvitationActionButtons invitation={notification.invitation} />
      //     </div>
      //   </div>
      // </Card>
      <Card>
        <div className="flex">
          <div className="m-5 flex h-8 flex-1 items-center overflow-ellipsis">
            <p className="text-sm">
              <strong className="font-semibold">
                {notification.invitation.senderParticipant.firstName +
                  (notification.invitation.senderParticipant.lastName
                    ? " " + notification.invitation.senderParticipant.lastName
                    : "")}
              </strong>{" "}
              от{" "}
              <strong className="font-semibold">
                {notification.invitation.senderParticipant.grade +
                  (notification.invitation.senderParticipant.parallel
                    ? " " + notification.invitation.senderParticipant.parallel
                    : " ")}
              </strong>{" "}
              иска да се присъедини към отбор{" "}
              <strong className="font-semibold">
                {notification.invitation.teamName}
              </strong>
              .
            </p>
          </div>
          <div className="mb-auto mt-auto">
            <InvitationActionButtons invitation={notification.invitation} />
          </div>
        </div>
      </Card>
    );
  }
}
