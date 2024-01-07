import { X } from "lucide-react";

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
import {
  getTeamMembers,
  removeTeamMember,
} from "../(full-layout)/teams/actions";
import { useToast } from "./ui/use-toast";

export default function RemoveMemberComponent({
  memberToRemove,
  remove,
}: {
  memberToRemove: Exclude<
    Awaited<ReturnType<typeof getTeamMembers>>[number],
    null
  >;
  remove: boolean;
}) {
  const { toast } = useToast();
  const handleClick = async () => {
    const { success, message } = await removeTeamMember(memberToRemove.id);
    if (success) {
      window.location.reload();
    } else {
      toast({
        title: "Неуспешен опит",
        description: `Моля опитайте отново след мъничко. 
        Error: ${message}`,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="z-10 m-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 p-2 opacity-70 hover:cursor-pointer hover:bg-red-700">
          <X />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-4/5 rounded-3xl sm:w-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {remove
              ? "Сигурни ли сте, че искате да премахнете този участник от отбора?"
              : "Сигурни ли сте, че искате да напуснете този отбор?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Това действие не може да бъде върнато назад.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отказ</AlertDialogCancel>
          <AlertDialogAction className="destructive" onClick={handleClick}>
            {remove ? "Премахни" : "Напусни"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
