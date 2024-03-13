import { XOctagon } from "lucide-react";

export function ErrorMessage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-sm border border-destructive bg-destructive/10 p-3 text-destructive">
      <XOctagon className="h-4 w-4 shrink-0" />
      <p className="max-w-full text-center text-sm font-semibold">{children}</p>
    </div>
  );
}
