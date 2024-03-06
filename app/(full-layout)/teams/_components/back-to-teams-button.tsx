import Link from "next/link";

import { Button } from "~/app/components/ui/button";

export function BackToTeamsButton() {
  return (
    <Button asChild variant="secondary" className="mt-8 backdrop-blur-md">
      <Link href="/teams">
        {"<- "}
        Назад
      </Link>
    </Button>
  );
}

export function BackToMyTeamButton() {
  return (
    <Button asChild variant="secondary" className="mt-8 backdrop-blur-md">
      <Link href="/teams/myteam">
        {"<- "}
        Назад
      </Link>
    </Button>
  );
}
