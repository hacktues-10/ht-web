import { saveAs } from "file-saver";
import Papa from "papaparse";
import { FaDownload } from "react-icons/fa6";

import { Button } from "~/app/components/ui/button";
import { PrepareParticipants } from "~/app/participants/actions";

export default function DownloadAsCSVComponent({
  data,
}: {
  data: Array<object>;
}) {
  const downloadDataAsCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  };

  return (
    <div className="m-3 mt-12 flex">
      <Button onClick={downloadDataAsCSV}>
        <div className="pr-2">
          <FaDownload />
        </div>
        Изтегли като CSV
      </Button>
    </div>
  );
}
