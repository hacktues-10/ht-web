import { HTLogo, HTXLogoDuotone } from "~/app/components/logos";
import OrganizatorDetailed from "./components/organizatorDetailed";
import { organizators } from "./organizators";

export default function OurTeam() {
  return (
    <div className="flex w-full flex-col gap-11">
      <h1 className="font-htags mt-5 flex flex-col gap-5 text-center text-5xl font-extrabold">
        Екипът на <HTXLogoDuotone />
      </h1>
      {Object.entries(organizators).map(([groupName, group], index) => (
        <div
          className="z-1 mx-auto w-full justify-center rounded-xl text-center"
          key={index}
        >
          <h1 className="font-htags mt-10 text-3xl font-extrabold">
            {groupName}
          </h1>
          <div className="flex flex-wrap justify-center gap-10 ">
            {group.map((member, memberIndex) => (
              <OrganizatorDetailed
                key={memberIndex}
                member={member}
                index={memberIndex + 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
