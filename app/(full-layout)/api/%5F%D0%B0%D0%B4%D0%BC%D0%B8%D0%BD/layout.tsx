import { PropsWithChildren } from "react";

import { getAdminFromSession } from "./service";

export default async function AdminLayout({ children }: PropsWithChildren<{}>) {
  const admin = await getAdminFromSession();
  if (!admin) {
    // XXX: TS wanted me to put it in fragment, dont know why ¯\_(ツ)_/¯
    return <>{children}</>;
  }

  return (
    <section className="flex h-screen w-screen justify-center gap-3">
      <nav className="flex h-full flex-col gap-3 p-2">
        <ul>
          {/* FIXME: dont hardcode /api/_админ/ </3 */}
          <li>
            <a href="/api/_админ">Админ</a>
          </li>
          <li>
            <a href="/api/_админ/participants">Участници</a>
          </li>
          <li>
            <a href="/api/_админ/mentors">Ментори</a>
          </li>
          <li>
            <a href="/api/_админ/teams">Отбори</a>
          </li>
        </ul>
        <span className="font-bold">
          {admin.firstName} {admin.lastName}
        </span>
      </nav>

      <main className="h-full max-h-screen w-full flex-1 overflow-scroll">
        {children}
      </main>
    </section>
  );
}
