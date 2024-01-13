import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";

export default function CustomizableDialog({
  children,
  dialogTitle,
  dialogDescription,
  cancelTitle,
  actionTitle,
  actionFunction,
}: {
  dialogTitle: string;
  dialogDescription: string;
  cancelTitle: string;
  actionTitle: string;
  children: React.ReactNode;
  actionFunction: () => Promise<any>;
}) {
  const router = useRouter();
  const { toast } = useToast();

  async function actionProcess() {
    toast({
      title: "Действието се извършва...",
      description:
        "Съли е в процес на затварянето на портала към вашата вселена...",
    });

    const res = await actionFunction();
    if (res?.success) {
      router.push("/");
    } else if (res?.success === false) {
      console.error(res.message);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className="ml-auto mr-auto items-center justify-center"
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-4/5 rounded-3xl sm:w-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelTitle}</AlertDialogCancel>
          <AlertDialogAction className="destructive" onClick={actionProcess}>
            {actionTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
