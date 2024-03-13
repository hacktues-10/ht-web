import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

type IconProps = {
  name: keyof typeof dynamicIconImports;
} & LucideProps;

export const DynamicIcon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon {...props} />;
};

type ExternalIconProps = {
  name: string;
} & LucideProps;

export const ExternalIcon = ({ name, ...props }: ExternalIconProps) => {
  if (name in dynamicIconImports) {
    return (
      <DynamicIcon name={name as keyof typeof dynamicIconImports} {...props} />
    );
  }
  return null;
};
