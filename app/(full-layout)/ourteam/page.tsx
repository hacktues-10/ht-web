import { HTLogo, HTXLogoDuotone } from "~/app/components/logos";
import OrganizatorDetailed from "./components/organizatorDetailed";
import { organizators } from "./organizators";

export default function OurTeam() {
  return (
    <div className="w-full ">
      <h1 className="font-htags mt-5 text-center text-5xl font-extrabold">
        Екипът на <HTXLogoDuotone />
      </h1>
      {Object.entries(organizators).map(([groupName, group], index) => (
        <div
          className="z-1 mx-auto w-full justify-center rounded-xl text-center"
          key={index}
        >
          <h1 className="font-htags mt-10 text-2xl font-extrabold">
            {groupName}
          </h1>
          <div className="flex flex-wrap justify-center ">
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
