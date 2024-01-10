"use client";

import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";

export default function FilterSearchComponent({
  filterSearch,
  setFilterSearch,
}: {
  filterSearch: string;
  setFilterSearch: Function;
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
          placeholder="Търсете по имена, имейл и Discord"
          onChange={handleChange}
          defaultValue={filterSearch}
        />
      </div>
    </div>
  );
}
