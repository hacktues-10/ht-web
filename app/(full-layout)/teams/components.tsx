export const IfTEAM = (teamId: any, { children }: React.PropsWithChildren) => {
  console.log("teamId:" + teamId)
  
  if (teamId) {
    console.log("plesae")
    return <>{children}</>;
  } else {
    return null;
  }
};

export const IfNotTEAM = (teamId: any, { children }: React.PropsWithChildren) => {
    if (!teamId) {
      return <>{children}</>;
    } else {
      return null;
    }
};
