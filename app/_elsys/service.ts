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
  const grade = 8 + (2023 - admissionYear);
  return {
    grade,
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
  graduationYear: number;
};

export function parseElsysEmail(email: string) {
  if (!email.endsWith(emailDomain)) return null;
  const namePart = email.slice(0, -emailDomain.length);

  const segments = namePart.split(".");
  const admissionYearStr = segments[segments.length - 1];
  const admissionYear = parseInt(admissionYearStr);
  if (isNaN(admissionYear)) return null;

  const { grade, graduationYear } = getStudentGrade(admissionYear, 0);

  return {
    admissionYear,
    grade,
    parallel: "",
    repeatedGrades: 0,
    graduationYear,
  };
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
