"use client";

import { useSearchParams } from "next/navigation";

export const IfQueryParamPresent = (props: {
  name: string;
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(props.name);
  return value ? <>{props.children}</> : null;
};

export const IfQueryParamNotPresent = (props: {
  name: string;
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(props.name);
  return value ? null : <>{props.children}</>;
};
