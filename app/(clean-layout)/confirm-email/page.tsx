import { IfHTSession, IfNotHTSession } from "~/app/api/auth/components";
import { HTXLogoDuotone } from "~/app/components/logos";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";

export default function ConfirmEmailPage() {
  return (
    <section className="flex w-full max-w-xl flex-col gap-5">
      <Card className="flex w-full flex-col gap-3 p-6">
        <IfNotHTSession>
          <h1 className="text-center text-3xl font-extrabold">
            Потвърдете имейл адреса си!
          </h1>
          <p className="text-center">
            На вашия имейл адрес е изпратен линк за потвърждение. Моля,
            проверете входящата си поща.
          </p>
        </IfNotHTSession>
        <IfHTSession>
          <h1 className="text-center text-3xl font-extrabold">
            Успешно потвърдихте имейл адреса си!
          </h1>
          <p className="text-center">Можете да затворите тази страница.</p>
        </IfHTSession>
      </Card>
      <Separator />
      <p className="cursor-default text-center text-xl">
        <HTXLogoDuotone />
      </p>
    </section>
  );
}
