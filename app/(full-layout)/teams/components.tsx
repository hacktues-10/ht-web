export const IfTeam = (teamId: any, { children }: React.PropsWithChildren) => {
  console.log("teamId:" + teamId);

  if (teamId) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const IfNotTeam = (
  teamId: any,
  { children }: React.PropsWithChildren,
) => {
  if (!teamId) {
    return <>{children}</>;
  } else {
    return null;
  }
};
