"use client";

import {
  acceptInvitation,
  acceptJoinRequest,
  declineInvitation,
  declineJoinRequest,
} from "../actions";

type Invitation = {
  id: number;
};

export function InvitationActionButtons({
  invitation,
}: {
  invitation: Invitation;
}) {
  const handleAccept = async () => {
    const { success } = await acceptInvitation({
      invitationId: invitation.id,
    });
    if (success) {
      // FIXME: do not reload, but update the UI
      window.location.reload();
    }
  };

  const handleDecline = async () => {
    const { success } = await declineInvitation({
      invitationId: invitation.id,
    });
    if (success) {
      // FIXME: do not reload, but update the UI
      window.location.reload();
    }
  };

  return (
    <AcceptDeclineButtons onAccept={handleAccept} onDecline={handleDecline} />
  );
}

interface JoinRequest {
  id: number;
  userId: number;
  teamId: string;
}

export function JoinRequestActionButtons({
  joinRequest,
}: {
  joinRequest: JoinRequest | null;
}) {
  const handleAccept = async () => {
    if (joinRequest) {
      const { success } = await acceptJoinRequest(joinRequest);
      if (success) {
        window.location.reload();
      }
    }
  };

  const handleDecline = async () => {
    if (joinRequest) {
      const { success } = await declineJoinRequest(joinRequest);
      if (success) {
        window.location.reload();
      }
    }
  };

  return (
    <AcceptDeclineButtons onAccept={handleAccept} onDecline={handleDecline} />
  );
}

function AcceptDeclineButtons({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div>
      <button
        className="m-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => onAccept()}
      >
        Accept
      </button>
      <button
        className="m-1 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={() => onDecline()}
      >
        Decline
      </button>
    </div>
  );
}
