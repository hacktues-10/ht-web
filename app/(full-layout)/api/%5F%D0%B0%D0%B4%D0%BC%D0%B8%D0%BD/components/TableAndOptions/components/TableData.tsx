import React from "react";

import { ScrollArea } from "~/app/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";

// FIXME: any :/
export default function TableData({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return null;
  }

  const columns = Object.keys(data[0]);

  return (
    <Table className=" rounded-3xl bg-black p-5">
      <TableCaption>A list of items.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead className="max-w-[60px] overflow-hidden" key={column}>
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column} className="max-w-[100px] overflow-auto">
                <ScrollArea className="max-h-[60px]">{item[column]}</ScrollArea>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
