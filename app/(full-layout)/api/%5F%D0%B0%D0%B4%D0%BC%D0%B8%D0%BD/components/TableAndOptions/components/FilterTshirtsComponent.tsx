"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";

export default function FilterTshirtsComponent({
  filterTshirt,
  setFilterTshirt,
}: {
  filterTshirt: string;
  setFilterTshirt: Function;
}) {
  const handleChange = (value: string) => {
    setFilterTshirt(value);
    console.log(value);
  };

  return (
    <div className="mx-3">
      <h3 className="m-5 mb-0 font-semibold">Размер тениска</h3>
      <div className="m-5 mt-1 ">
        <Select onValueChange={handleChange} defaultValue={filterTshirt}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            <SelectItem value="S">S</SelectItem>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="L">L</SelectItem>
            <SelectItem value="XL">XL</SelectItem>
            <SelectItem value="XXL">XXL</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
