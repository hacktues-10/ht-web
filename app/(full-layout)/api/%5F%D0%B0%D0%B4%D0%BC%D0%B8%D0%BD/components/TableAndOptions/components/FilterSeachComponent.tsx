"use client";

import { Input } from "~/app/components/ui/input";

export default function FilterSearchComponent({
  filterSearch,
  setFilterSearch,
  isTeam = false,
}: {
  filterSearch: string;
  setFilterSearch: Function;
  isTeam: boolean;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSearch(event.target.value.toLowerCase());
  };

  return (
    <div className=" w-[430px]">
      <h3 className="m-5 mb-0 font-semibold">Търсене</h3>
      <div className="m-5 mt-1 ">
        <Input
          type="text"
          placeholder={
            isTeam
              ? "Търси по име на отбор"
              : "Търсете по имена, имейл, отбор и Discord"
          }
          onChange={handleChange}
          defaultValue={filterSearch}
        />
      </div>
    </div>
  );
}
