"use client";

import { useEffect, useState } from "react";

import { formatNick, PrepareParticipants } from "~/app/participants/actions";
import DisqualifyParticipantComponent from "./components/DisqualifyParticipantComponent";
import FilterDisqulifiedComponent from "./components/FilterDisqulifiedComponent";
import FilterEmailComponent from "./components/FilterEmailComponent";
import FilterTshirtsComponent from "./components/FilterTshirtsComponent";
import TableData from "./components/TableData";

export default function TableAndOptions({
  participants,
}: {
  participants: PrepareParticipants;
}) {
  const [data, setData] = useState(participants);
  const [filterDisqulified, setFilterDisqulified] = useState("all");
  const [filterTshirt, setFilterTshirt] = useState("all");
  const [filterEmail, setFilterEmail] = useState("");
  useEffect(() => {
    let filteredData = participants;

    if (filterDisqulified === "yes") {
      filteredData = filteredData.filter(
        (participant) => participant.isDisqualified == "Yes",
      );
    } else if (filterDisqulified === "no") {
      filteredData = filteredData.filter(
        (participant) => participant.isDisqualified == "No",
      );
    }

    if (filterTshirt != "all") {
      filteredData = filteredData.filter(
        (participant) => participant.tshirt === filterTshirt,
      );
    }

    if (filterEmail) {
      filteredData = filteredData.filter(
        (participant) => participant.email?.includes(filterEmail),
      );
    }

    setData(filteredData);
  }, [filterDisqulified, filterTshirt, filterEmail]);

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
          <FilterTshirtsComponent
            filterTshirt={filterTshirt}
            setFilterTshirt={setFilterTshirt}
          />
          <FilterEmailComponent
            filterEmail={filterEmail}
            setFilterEmail={setFilterEmail}
          />
        </div>
        <TableData data={data} />
      </>
    )
  );
}
