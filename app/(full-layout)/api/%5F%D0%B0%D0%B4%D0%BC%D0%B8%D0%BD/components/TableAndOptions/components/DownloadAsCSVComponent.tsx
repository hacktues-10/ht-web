import { saveAs } from "file-saver";
import Papa from "papaparse";

import { Button } from "~/app/components/ui/button";
import { PrepareParticipants } from "~/app/participants/actions";

export default function DownloadAsCSVComponent({
  data,
}: {
  data: PrepareParticipants;
}) {
  const downloadDataAsCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  };

  return (
    <Button className="mt-12" onClick={downloadDataAsCSV}>
      Download CSV
    </Button>
  );
}
