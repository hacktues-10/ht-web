"use client";

import { useRouter } from "next/navigation";

import { deleteMyTeam } from "../(full-layout)/teams/actions";

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
    <button className="btn btn-danger" onClick={deleteTeam}>
      Delete Team
    </button>
  );
}
