"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "~/app/components/ui/button";
import { TeamsAdmin } from "../../teams/service";
import DownloadAsCSVComponent from "./components/DownloadAsCSVComponent";
import FilterIsFinalistComponent from "./components/FilterIsFinalistComponent";
import FilterSearchComponent from "./components/FilterSeachComponent";
import TableData from "./components/TableData";
import UpdateTeamName from "./components/UpdateTeamName";

export default function TableAndOptions({ teams }: { teams: TeamsAdmin }) {
  const [filterIsFinalist, setFilterIsFinalist] = useState("all");
  const [filterSearch, setFilterEmail] = useState("");
  const [index, setIndex] = useState(1);

  const filteredData = useMemo(() => {
    let filteredData = teams;

    if (filterIsFinalist === "yes") {
      filteredData = filteredData.filter((team) => team.isFinalist == "Yes");
    } else if (filterIsFinalist === "no") {
      filteredData = filteredData.filter((team) => team.isFinalist == "No");
    }

    if (filterSearch) {
      filteredData = filteredData.filter(
        (team) =>
          (team.name + team.mentor)?.toLowerCase().includes(filterSearch),
      );
    }
    setIndex(1);
    return filteredData;
  }, [filterIsFinalist, filterSearch, teams]);

  const preparedData = filteredData.map((team: TeamsAdmin[0]) => {
    try {
      return {
        ...team,
        label: team.name,
        value: team.id,
      };
    } catch (error) {
      console.error("Error in map function:", error);
    }
  });

  return (
    preparedData != undefined && (
      <>
        <h1 className="m-2 mt-4 text-left text-lg font-bold">Търсене</h1>

        <div className="mb-5 flex w-min rounded-3xl border-2 border-white p-2">
          <FilterSearchComponent
            filterSearch={filterSearch}
            setFilterSearch={setFilterEmail}
            isTeam={true}
          />
          <FilterIsFinalistComponent
            filterIsFinalist={filterIsFinalist}
            setFilterIsFinalist={setFilterIsFinalist}
          />
          <DownloadAsCSVComponent data={filteredData} />
        </div>
        <UpdateTeamName data={preparedData} />
        <DeleteTeam data={preparedData} />
        <div>
          <h1 className="m-2 mt-4 text-left text-lg font-bold">Pagination</h1>
          <div className="flex gap-2">
            <Button
              disabled={index - 1 == 0 ?? "true"}
              onClick={() => setIndex(index - 1)}
            >
              Previous
            </Button>
            <Button onClick={() => setIndex(index + 1)}>Next</Button>
          </div>
        </div>
        <TableData data={filteredData.slice((index - 1) * 20, index * 20)} />
      </>
    )
  );
}
