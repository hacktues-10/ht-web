import fs from "fs";
import path from "path";

export const getAllMentors = async () => {
  const filePath = path.join(process.cwd(), "public", "static", "mentors.json");
  const jsonData = await fs.promises.readFile(filePath, "utf8");
  const allMentors = JSON.parse(jsonData);
  return allMentors;
};

export const getMentorById = async (id: string) => {
  const allMentors = await getAllMentors();
  return allMentors.find((mentor: any) => mentor.id === id);
};
