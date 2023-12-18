import Link from "next/link";

import { organizators } from "./organizators";

export default function ourTeam() {
  return (
    <div className="flex w-full flex-wrap gap-5">
      {organizators.map((member) => {
        return (
          <div
            key={member.name}
            className="h-auto rounded-xl border-2 border-gray-500 p-2"
            style={{ backgroundImage: member.photo }}
          >
            <p className="font-sans text-xl leading-7">{member.name}</p>
            <p className="font-sans leading-7">{member.role}</p>
            <Link
              href={`https://www.instagram.com/${
                member.Instagram.startsWith("@")
                  ? member.Instagram.slice(1)
                  : member.Instagram
              }`}
              className="hover:underline"
            >
              {member.Instagram}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
