"use client";

import { Check, X } from "lucide-react";

import { Button } from "~/app/components/ui/button";
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
      const { success, error } = await acceptJoinRequest(joinRequest);
      console.log(success, error);
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
    <div className="mr-3 flex">
      <Button variant="ghost" onClick={() => onAccept()}>
        <Check />
      </Button>
      <Button variant="ghost" onClick={() => onDecline()}>
        <X />
      </Button>
    </div>
  );
}
