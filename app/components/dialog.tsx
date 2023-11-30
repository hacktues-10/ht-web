import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/app/components/ui/dialog";

export default function InformationDialog({
  title,
  description,
  open,
}: {
  title: string;
  description: string;
  open: boolean;
}) {
  return (
    <Dialog open={open}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="text-center">
          {description}
        </DialogDescription>
      </DialogHeader>
    </Dialog>
  );
}
