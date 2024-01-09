"use client";

import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";

export default function FilterEmailComponent({
  filterEmail,
  setFilterEmail,
}: {
  filterEmail: string;
  setFilterEmail: Function;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterEmail(event.target.value.toLowerCase());
  };

  return (
    <div className="mx-3 mt-5">
      <div className="m-5 mt-1 ">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          onChange={handleChange}
          defaultValue={filterEmail}
        />
      </div>
    </div>
  );
}
