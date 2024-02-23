"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";

export default function FilterDisqulifiedComponent({
  filterDisqulified,
  setFilterDisqulified,
}: {
  filterDisqulified: string;
  setFilterDisqulified: Function;
}) {
  const handleChange = (value: string) => {
    setFilterDisqulified(value);
  };

  return (
    <div className="mx-3">
      <h3 className="m-5 mb-0 font-semibold">Дисквалифициран</h3>
      <div className="m-5 mt-1 ">
        <Select onValueChange={handleChange} defaultValue={filterDisqulified}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            <SelectItem value="yes">Да</SelectItem>
            <SelectItem value="no">Не</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
