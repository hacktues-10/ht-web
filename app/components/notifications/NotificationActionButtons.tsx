"use client";

import { acceptJoinRequest, declineJoinRequest } from "./actions";

interface JoinRequest {
  id: number;
  userId: number;
  teamId: string;
}

export default function JoinRequestActionButtons({
  joinRequest,
}: {
  joinRequest: JoinRequest | null;
}) {
  const handleAccept = async () => {
    if (joinRequest) {
      const res = await acceptJoinRequest(joinRequest);
      if (res.success) {
        window.location.reload();
      }
    }
  };

  const handleDecline = async () => {
    if (joinRequest) {
      const res = await declineJoinRequest(joinRequest);
      if (res.success) {
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <button
        className="m-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => handleAccept()}
      >
        Accept
      </button>
      <button
        className="m-1 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={() => handleDecline()}
      >
        Decline
      </button>
    </div>
  );
}
