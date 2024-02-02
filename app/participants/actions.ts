import { disqualifyParticipantByEmail } from "./service_admin";

interface ParticipantAdmin {
  team: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string | null;
  phoneNumber: string;
  grade: string;
  parallel: string;
  isLookingForTeam: boolean;
  tshirt: number | null;
  isCaptain: boolean;
  isDisqualified: boolean;
  createdAt: Date;
  discordUser: string | null;
}

interface Participant {
  label: string;
  value: string;
  team: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string | null;
  phoneNumber: string;
  grade: string;
  parallel: string;
  isLookingForTeam: boolean;
  tshirt: number | null;
  isCaptain: boolean;
  isDisqualified: boolean;
  createdAt: Date;
  discordUser: string | null;
}

export function getParticipantIdByValue(
  value: string,
  participants:
    | {
        label: string;
        value: string;
        id: number;
        firstName: string;
        lastName: string;
        grade: string;
        parallel: string;
        technologies: string;
      }[]
    | null,
) {
  const res =
    participants?.find((participant) => participant.value == value)?.id ?? 0;
  return res;
}

export async function disqualifyParticipantByIdClient(
  value: string,
  participants: Participant[] | null,
) {
  try {
    const participant = participants
      ?.filter((participant) => participant.value == value)
      .at(0);
    if (!participant) {
      return { success: false, message: "no such participant" };
    }

    if (!participant.email) {
      return { success: false, message: "no such participant" };
    }
    const res = await disqualifyParticipantByEmail(participant.email);
    return res;
  } catch (e) {
    return { success: false, message: "Error in disqualifying participant" };
  }
}

export function perpareParticipantAdmin(particpants: ParticipantAdmin[]) {
  const convertTshirt = (tshirtId: number | null) => {
    switch (tshirtId) {
      case 1:
        return "S";
      case 2:
        return "M";
      case 3:
        return "L";
      case 4:
        return "XL";
      case 5:
        return "XXL";
      default:
        return "No t-shirt";
    }
  };

  return particpants.map((participant) => {
    return {
      ...participant,
      tshirt: convertTshirt(participant.tshirt),
      isCaptain: participant.isCaptain ? "Yes" : "No",
      isLookingForTeam: participant.isLookingForTeam ? "Yes" : "No",
      isDisqualified: participant.isDisqualified ? "Yes" : "No",
      createdAt: participant.createdAt.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  });
}

export type PrepareParticipants = Awaited<
  ReturnType<typeof perpareParticipantAdmin>
>;

export const formatNick = (user: any): string => {
  if (user.grade.length <= 2) {
    return `${user.firstName} ${user.lastName} (${user.grade}${user.parallel})`;
  } else {
    return `${user.firstName} ${user.lastName} (ТУЕС'${user.grade})`;
  }
};
