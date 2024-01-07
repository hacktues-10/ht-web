interface Participant {
  label: string;
  value: string;
  id: number;
  firstName: string;
  lastName: string;
  grade: string;
  parallel: string;
  technologies: string;
}

export function getParticipantIdByValue(
  value: string,
  participants: Participant[] | null,
) {
  return (
    participants?.find((participant) => participant.value == value)?.id ?? 0
  );
}
