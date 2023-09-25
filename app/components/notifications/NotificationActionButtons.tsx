"use client";

import { acceptedJoinRequest, declineJoinRequest } from "./actions";

interface DetailedNotification {
  teamName: string | undefined;
  id: number;
  userId: number;
  teamId: string;
}

export default function NotificationActionButtons({
  notificationDetails,
}: {
  notificationDetails: DetailedNotification | undefined;
}) {
  const handleReqAcc = async () => {
    if (notificationDetails) {
      const res = await acceptedJoinRequest(notificationDetails);
      if (res.success) {
        window.location.reload();
      }
    }
  };

  const handleReqDec = async () => {
    if (notificationDetails) {
      const res = await declineJoinRequest(notificationDetails);
      if (res.success) {
        window.location.reload();
      }
    }
  };
  return (
    <div>
      <button
        className="m-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => handleReqAcc()}
      >
        Accept
      </button>
      <button
        className="m-1 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={() => handleReqDec()}
      >
        Decline
      </button>
    </div>
  );
}
