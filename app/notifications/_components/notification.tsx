"use client";

import invariant from "tiny-invariant";

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
  switch (notification.type) {
    case "ask_join":
      return (
        <JoinRequestNotification
          notification={notification}
          participant={participant}
        />
      );
    case "invitation":
      return participant.isLookingForTeam ? null : (
        <InvitationNotification
          notification={notification}
          participant={participant}
        />
      );
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

  if (notification.targetUserId === participant.id) {
    return (
      <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-2 text-lg font-semibold text-black">
          Join request
        </div>
        <div className="text-sm text-black">
          <p>
            От:{" "}
            {notification.joinRequest.senderParticipant.firstName +
              (notification.joinRequest.senderParticipant.lastName
                ? " " + notification.joinRequest.senderParticipant.lastName
                : "")}
          </p>
          <p>
            Клас:{" "}
            {notification.joinRequest.senderParticipant.grade +
              (notification.joinRequest.senderParticipant.parallel
                ? " " + notification.joinRequest.senderParticipant.parallel
                : " ")}
          </p>
          <p>
            Технологии:{" "}
            {notification.joinRequest.senderParticipant.technologies}
          </p>
        </div>
        <div>
          <JoinRequestActionButtons joinRequest={notification.joinRequest} />
        </div>
      </div>
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
  invariant(
    notification.type === "invitation" && notification.invitation !== null,
  );

  if (notification.targetUserId === participant?.id) {
    return (
      <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
        <div className="mb-2 text-lg font-semibold text-black">Invitation</div>
        <div className="text-sm text-black">
          <p>
            От:{" "}
            {notification.invitation.senderParticipant.firstName +
              (notification.invitation.senderParticipant.lastName
                ? " " + notification.invitation.senderParticipant.lastName
                : "")}
          </p>
          <p>
            Клас:{" "}
            {notification.invitation.senderParticipant.grade +
              (notification.invitation.senderParticipant.parallel
                ? " " + notification.invitation.senderParticipant.parallel
                : " ")}
          </p>
          <p>
            Технологии: {notification.invitation.senderParticipant.technologies}
          </p>
        </div>
        <div>
          <InvitationActionButtons invitation={notification.invitation} />
        </div>
      </div>
    );
  }
}
