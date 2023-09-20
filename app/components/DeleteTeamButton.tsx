'use client'
import { deleteTeamById } from "../teams/actions";
import { useRouter } from "next/navigation";
export default function DeleteTeamButton ({id}: {id: string})
{
    const router = useRouter();



    async function deleteTeam() {
        console.log(`deleteTeam called ${id}`);
        const res = await deleteTeamById(id);
        console.log(res)
        console.log(res.success)
        if (res.success) {
            router.push("/teams")
        }else if(res.success === false) {
            console.error(res.message);
        }
    }


    return (
        <button className="btn btn-danger" onClick={deleteTeam}>
            Delete Team
        </button>
    )
}