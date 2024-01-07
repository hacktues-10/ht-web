import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";

export default function TableData({ data }: { data: Array<object> }) {
  if (!data || data.length === 0) {
    return null; // or handle the case when there is no data
  }

  const columns = Object.keys(data[0]);

  return (
    <Table className="w-full rounded-3xl bg-black p-5">
      <TableCaption>A list of items.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead className="w-[100px]" key={column}>
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              //@ts-ignore
              <TableCell key={column}>{item[column]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
