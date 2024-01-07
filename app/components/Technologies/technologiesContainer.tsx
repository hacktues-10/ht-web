import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import invariant from "tiny-invariant";

import { Input } from "~/app/components/ui/input";
import { convertToTechnology, technologies } from "~/app/technologies";
import { SelectableTechnology } from "./selectableCard";

type NewIsSelected = {
  [technologyName: string]: boolean;
};

const TechnologiesTab = ({
  technologiesFromParent,
  setTechnolgoies,
  inputClassName,
  badgeBorderColor,
}: {
  technologiesFromParent: ReturnType<typeof convertToTechnology>;
  setTechnolgoies: Dispatch<
    SetStateAction<
      {
        id: number;
        name: string;
        color: string;
        textColor: string;
        value: string;
      }[]
    >
  >;
  inputClassName: string;
  badgeBorderColor: string;
}) => {
  const [isSelected, setIsSelected] = useState<NewIsSelected>({});
  const [filterValue, setFilterValue] = useState("");

  const handleOnChange = (value: string) => {
    setTechnolgoies((prevTechnologies) => {
      const technologyExists = prevTechnologies.some(
        (technology) => technology?.name === value,
      );

      const newTechnology = convertToTechnology(value).at(0);
      invariant(newTechnology !== undefined);

      if (!technologyExists) {
        return [...prevTechnologies, newTechnology];
      } else {
        const newTechnologies = prevTechnologies.filter(
          (technology) => technology?.name != newTechnology?.name,
        );
        return newTechnologies;
      }
    });
    setIsSelected({
      ...isSelected,
      [value]: !isSelected[value],
    });
  };

  useEffect(() => {
    if (!technologiesFromParent) return;
    const newIsSelected: NewIsSelected = {};
    technologiesFromParent.forEach((technology) => {
      if (technology) {
        newIsSelected[technology.name] = true;
      }
    });

    setIsSelected(newIsSelected);
  }, [technologiesFromParent]);

  const filteredTechnologies = useMemo(
    () =>
      technologies
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((technology) =>
          technology.name
            .toLowerCase()
            .includes(filterValue.trim().toLowerCase()),
        ),
    [filterValue],
  );

  return (
    <div className="w-full">
      <Input
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        placeholder="Потърси технология..."
        className={`mb-4 ${inputClassName}`}
      />
      <div className="h-[320px] overflow-scroll pb-[20px] [mask-image:linear-gradient(to_bottom,#fff,calc(100%-10px),transparent)]">
        {filteredTechnologies.length > 0 ? (
          filteredTechnologies.map((technology) => (
            <SelectableTechnology
              key={technology?.name}
              name={technology?.name ?? "?"}
              selected={isSelected[technology?.name ?? "?"]}
              style={{
                backgroundColor: technology?.color,
                color: technology?.textColor,
                opacity: isSelected[technology?.name ?? ""] ? 1 : 0.7,
                outline: !isSelected[technology?.name ?? ""]
                  ? "none"
                  : `2px solid ${badgeBorderColor}`,
                cursor: "pointer",
              }}
              onClick={() => handleOnChange(technology?.name ?? "?")}
            />
          ))
        ) : (
          <div className="grid h-full place-content-center">
            <p className="h-full text-center text-muted-foreground">
              Няма намерени технологии.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnologiesTab;
