import fs from "fs";
import path from "path";

const SEMIFINALS_COUNT = 7;
const getTeamsData = () => {
  const filePath = path.join(process.cwd(), "public", "static", "teams.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData);
};

export const getTeamsBySemiFinal = async () => {
  const teamsData = getTeamsData();
  let teamsSemiFinal = [];

  for (let i = 1; i <= SEMIFINALS_COUNT; i++) {
    const teamsInSemiFinal = teamsData.filter(
      (team: any) => team.semiFinal === i,
    );

    if (teamsInSemiFinal.length <= 0) {
      return teamsSemiFinal;
    }

    teamsInSemiFinal.sort((a: any, b: any) => {
      return Number(b.semiFinalResult) - Number(a.semiFinalResult);
    });
    teamsSemiFinal.push(teamsInSemiFinal);
  }
  return teamsSemiFinal;
};

export const getAlumniTeams = async () => {
  const teamsData = getTeamsData();
  const alumniTeams = teamsData.filter((team: any) => team.isAlumni);

  alumniTeams.sort((a: any, b: any) => {
    return Number(b.finalResult) - Number(a.finalResult);
  });

  return alumniTeams;
};
