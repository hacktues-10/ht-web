import { LogOutIcon } from "lucide-react";

import { getHTSession } from "~/app/api/auth/session";
import { SignOutButton } from "~/app/components/buttons";
import { Button, buttonVariants } from "~/app/components/ui/button";
import { Card, CardTitle } from "~/app/components/ui/card";

// TODO: maybe use preload here? or not?
async function Step1Header() {
  const session = await getHTSession();

  return (
    <Card>
      <CardTitle>
        Влезли сте като{" "}
        <span className={buttonVariants({ variant: "link" })}>
          {session?.user?.email}
        </span>
        .
      </CardTitle>
      <Button asChild variant="destructive">
        <SignOutButton>
          <LogOutIcon /> Изход
        </SignOutButton>
      </Button>
    </Card>
  );
}
