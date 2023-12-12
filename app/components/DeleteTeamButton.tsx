"use client";

import { useRouter } from "next/navigation";

<<<<<<< HEAD
import { deleteMyTeam } from "../(full-layout)/teams/actions";
=======
import { deleteMyTeam } from "../teams/actions";
import { Button } from "./ui/button";
>>>>>>> dd673b6 (golqma chast ot team id page gotova?)

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
    <Button variant="destructive" onClick={deleteTeam}>
      Delete Team
    </Button>
  );
}
