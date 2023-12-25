import { useEffect, useState } from "react";

import { Badge } from "~/app/components/ui/badge";

const SelectableCard = ({
  children,
  selected,
  styles,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  selected: boolean;
  styles?: React.CSSProperties;
  onClick: () => void;
}) => {
  const handleClick = () => {
    onClick();
  };

  const [className, setClassName] = useState("border-none");

  useEffect(() => {
    if (selected) {
      setClassName("border-1");
    } else {
      setClassName("border-none");
    }
  }, [selected]);

  return (
    <Badge
      variant="outline"
      className={`m-1 whitespace-nowrap text-sm hover:cursor-pointer ${className}`}
      style={styles}
      {...props}
      onClick={handleClick}
    >
      {children}
    </Badge>
  );
};

export default SelectableCard;

interface SelectableTechnologyProps {
  name: string;
  selected: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
}

export const SelectableTechnology = ({
  name,
  selected,
  onClick,
  style,
  ...props
}: SelectableTechnologyProps) => {
  return (
    <SelectableCard
      selected={selected}
      styles={style}
      onClick={onClick}
      {...props}
    >
      {name}
    </SelectableCard>
  );
};
