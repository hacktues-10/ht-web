"use client";

import { useRouter } from "next/navigation";

import { deleteMyTeam } from "~/app/(full-layout)/teams/actions";
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
} from "~/app/components/ui/alert-dialog";
import { Button } from "./ui/button";

export default function DeleteTeamButton({ id }: { id: string }) {
  const router = useRouter();

  async function deleteTeam() {
    const res = await deleteMyTeam();
    if (res?.success) {
      router.push("/teams");
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
        <Button className="" variant="destructive">
          Изтрий отбора
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-4/5 rounded-3xl sm:w-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Сигурни ли сте, че искате да изтриете отбора
          </AlertDialogTitle>
          <AlertDialogDescription>
            Това действие не може да бъде върнато назад. Ще изтриете отбора си
            перманентно.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отказ</AlertDialogCancel>
          <AlertDialogAction className="destructive" onClick={deleteTeam}>
            Изтрий
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
