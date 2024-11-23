import { HTEditionLogo } from "~/app/components/logos";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";

export default function GitHubMessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full max-w-lg flex-col gap-5">
      <Card className="flex w-full flex-col gap-5 p-6 text-center">
        {children}
      </Card>
      <Separator />
      <p className="cursor-default text-center text-xl">
        <HTEditionLogo />
      </p>
    </section>
  );
}
