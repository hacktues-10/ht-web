"use client";

import { useEffect, useState } from "react";

import { formatNick, PrepareParticipants } from "~/app/participants/actions";
import DisqualifyParticipantComponent from "./components/DisqualifyParticipantComponent";
import FilterDisqulifiedComponent from "./components/FilterDisqulifiedComponent";
import TableData from "./components/TableData";

export default function TableAndOptions({
  participants,
}: {
  participants: PrepareParticipants;
}) {
  const [data, setData] = useState(participants);
  const [filterDisqulified, setFilterDisqulified] = useState("all");

  useEffect(() => {
    if (filterDisqulified === "all") {
      setData(participants);
    } else if (filterDisqulified === "yes") {
      setData(
        participants.filter(
          (participant) => participant.isDisqualified == "Yes",
        ),
      );
    } else if (filterDisqulified === "no") {
      setData(
        participants.filter(
          (participant) => participant.isDisqualified == "No",
        ),
      );
    }
  }, [filterDisqulified]);

  const preparedParticipants = data.map(
    (participant: PrepareParticipants[number]) => {
      try {
        const fullName = formatNick(participant);
        return {
          ...participant,
          label: fullName,
          value: `${fullName.toLowerCase()}`,
        };
      } catch (error) {
        console.error("Error in map function:", error);
      }
    },
  );
  return (
    data && (
      <>
        <div className="flex">
          <DisqualifyParticipantComponent participants={preparedParticipants} />
          <FilterDisqulifiedComponent
            filterDisqulified={filterDisqulified}
            setFilterDisqulified={setFilterDisqulified}
          />
        </div>
        <TableData data={data} />
      </>
    )
  );
}
