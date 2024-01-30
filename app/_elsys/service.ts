import invariant from "tiny-invariant";

import { SEPTEMBER } from "../utils";

export const emailDomain = "@elsys-bg.org";

export function isValidElsysEmail(email: string) {
  return email.endsWith(emailDomain) && email.length > emailDomain.length;
}

function resolveSegments(segments: string[]) {
  invariant(segments.length === 3 || segments.length === 4);

  let firstName = "";
  let middleNameInitial = "";
  let lastName = "";
  let admissionYearStr = "";
  if (segments.length === 3) {
    [firstName, lastName, admissionYearStr] = segments;
  } else {
    [firstName, middleNameInitial, lastName, admissionYearStr] = segments;
  }

  return {
    firstName,
    middleNameInitial,
    lastName,
    admissionYearStr,
  };
}

function closestSchoolYearStartDate() {
  const now = new Date();
  const year = now.getFullYear();
  if (now.getMonth() < SEPTEMBER && now.getDate() < 15) {
    return new Date(year - 1, SEPTEMBER, 15);
  } else {
    return new Date(year, SEPTEMBER, 15);
  }
}

function getStudentGrade(admissionYear: number, repeatedGrades: number) {
  admissionYear += repeatedGrades;
  const closestStartDate = closestSchoolYearStartDate();
  const grade = 8 + (closestStartDate.getFullYear() - admissionYear);
  const isAlumni = grade > 12;
  return {
    grade,
    isAlumni,
    graduationYear: admissionYear + repeatedGrades + 5,
  };
}

type Student = {
  email: string;
  firstName: string;
  middleNameInitial: string;
  lastName: string;
  admissionYear: number;
  grade: number;
  parallel: string;
  repeatedGrades: number;
  isAlumni: boolean;
  graduationYear: number;
};

export function parseStudentElsysEmail(email: string) {
  if (!email.endsWith(emailDomain)) return null;
  const namePart = email.slice(0, -emailDomain.length);

  const segments = namePart.split(".");
  if (![3, 4].includes(segments.length)) return null;
  const { firstName, middleNameInitial, lastName, admissionYearStr } =
    resolveSegments(segments);
  if (!firstName || (!middleNameInitial && segments.length === 4) || !lastName)
    return null;
  const admissionYear = parseInt(admissionYearStr);
  if (isNaN(admissionYear)) return null;

  const { grade, isAlumni, graduationYear } = getStudentGrade(admissionYear, 0);

  return {
    email,
    firstName: capitalizeName(firstName),
    middleNameInitial: capitalizeName(middleNameInitial) + ".",
    lastName: capitalizeName(lastName),
    admissionYear,
    grade,
    parallel: "",
    isAlumni,
    repeatedGrades: 0,
    graduationYear,
  } satisfies Student;
}

function capitalizeFirstLetter(str: string) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function capitalizeName(name: string) {
  name = capitalizeFirstLetter(name);
  name = name.split("-").map(capitalizeFirstLetter).join("-");
  return name;
}
