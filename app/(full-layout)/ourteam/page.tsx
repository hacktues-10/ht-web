import OrganizatorDetailed from "~/app/(full-layout)/ourteam/components/organizatorDetailed";
import { organizators } from "./organizators";

export default function OurTeam() {
  return (
    <div className="w-full ">
      <h1 className="mt-5 text-center font-htags text-3xl font-extrabold">
        Екипът на Hack TUES X
      </h1>
      {Object.entries(organizators).map(([groupName, group], index) => (
        <div
          className="z-1 mx-auto w-full justify-center rounded-xl text-center"
          key={index}
        >
          <h1 className="mt-10 font-htags text-2xl font-extrabold">
            {groupName}
          </h1>
          {group.map((member, memberIndex) => (
            <OrganizatorDetailed
              key={memberIndex}
              member={member}
              index={memberIndex + 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
