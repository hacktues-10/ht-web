"use client";

import invariant from "tiny-invariant";

import { inviteToTeam } from "../teams/actions";

export const InviteForm = ({ teamId }: { teamId: string }) => {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const participantIdField = data.get("participant-id");
    invariant(
      typeof participantIdField === "string",
      "Participant ID must be a string",
    );
    const participantId = parseInt(participantIdField, 10);
    invariant(!isNaN(participantId), "Participant ID must be a number");
    const { success } = await inviteToTeam({
      inviteeParticipantId: participantId,
      teamId,
    });
    if (!success) {
      throw new Error("Failed to invite participant to team :(");
    }
  }

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <label htmlFor="participant-id">Participant ID</label>
      <input
        id="participant-id"
        name="participant-id"
        type="number"
        className="rounded-md border border-gray-300"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 via-green-500 to-orange-900 bg-clip-text font-serif text-6xl font-extrabold italic text-transparent underline"
      >
        Покани
      </button>
    </form>
  );
};
