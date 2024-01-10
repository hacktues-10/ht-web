"use client";

import { useEffect, useState } from "react";

import { formatNick, PrepareParticipants } from "~/app/participants/actions";
import DisqualifyParticipantComponent from "./components/DisqualifyParticipantComponent";
import DownloadAsCSVComponent from "./components/DownloadAsCSVComponent";
import FilterDisqulifiedComponent from "./components/FilterDisqulifiedComponent";
import FilterSearchComponent from "./components/FilterSeachComponent";
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
  const [filterSearch, setFilterEmail] = useState("");

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

    if (filterSearch) {
      filteredData = filteredData.filter(
        (participant) =>
          (
            participant.email +
            participant.firstName +
            participant.middleName +
            participant.lastName +
            participant.discordUser +
            participant.team
          )
            ?.toLowerCase()
            .includes(filterSearch),
      );
    }

    setData(filteredData);
  }, [filterDisqulified, filterTshirt, filterSearch]);

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
        <h1 className="m-2 mt-4 text-left text-lg font-bold">Търсене</h1>

        <div className="mb-5 flex w-min rounded-3xl border-2 border-white p-2">
          <FilterSearchComponent
            filterSearch={filterSearch}
            setFilterSearch={setFilterEmail}
            isTeam={false}
          />
          <FilterDisqulifiedComponent
            filterDisqulified={filterDisqulified}
            setFilterDisqulified={setFilterDisqulified}
          />
          <FilterTshirtsComponent
            filterTshirt={filterTshirt}
            setFilterTshirt={setFilterTshirt}
          />
          <DownloadAsCSVComponent data={data} />
        </div>
        <div className="w-[440px]">
          <DisqualifyParticipantComponent participants={preparedParticipants} />
        </div>

        <TableData data={data} />
      </>
    )
  );
}
