"use client";

import { useState } from "react";
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
import { useToast } from "~/app/components/ui/use-toast";
import { Button } from "./ui/button";

export default function DeleteTeamButton({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function deleteTeam() {
    toast({
      title: "Вашият отбор се изтрива...",
      description:
        "Съли в е процес на затварянето на портала към вашата вселена...",
    });
    setIsLoading(true);

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
        <Button className="" variant="destructive" disabled={isLoading}>
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
