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
import { getTeamMembers, removeTeamMember } from "../teams/actions";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function RemoveMemberComponent({
  title,
  memberToRemove,
}: {
  title: string;
  memberToRemove: Exclude<
    Awaited<ReturnType<typeof getTeamMembers>>[number],
    null
  >;
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
        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 opacity-70 hover:cursor-pointer hover:bg-gray-400">
          <h1 className="p-2 text-lg sm:text-xl">X</h1>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-4/5 rounded-3xl sm:w-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            Това действие не може да бъде върнато назад.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отказ</AlertDialogCancel>
          <AlertDialogAction className="destructive" onClick={handleClick}>
            Напред
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
