import { FormData } from "./Form";

function closestSchoolYearStartDate() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  if (month < 6) {
    return new Date(year - 1, 8, 15);
  } else {
    return new Date(year, 8, 15);
  }
}

export const parseElsysEmail = (email: string) => {
  if (!email.endsWith("@elsys-bg.org")) return null;
  const namePart = email.slice(0, -"@elsys-bg.org".length);

  const segments = namePart.split(".");
  if (segments.length !== 4) return null;
  const [firstName, middleNameInitial, lastName, admissionYearStr] = segments;
  if (!firstName || !middleNameInitial || !lastName) return null;
  const admissionYear = parseInt(admissionYearStr);
  if (isNaN(admissionYear)) return null;

  const closestStartDate = closestSchoolYearStartDate();
  const grade = 8 + (closestStartDate.getFullYear() - admissionYear);
  const isAlumni = grade > 12;

  return {
    email,
    firstName,
    middleNameInitial,
    lastName,
    admissionYear,
    isAlumni,
    grade: isAlumni ? (admissionYear + 5).toString() : grade.toString(),
  };
};

export function convertStringToGrade(input: string): FormData["grade"] {
  if (
    [
      "8",
      "9",
      "10",
      "11",
      "12",
      "1993",
      "1994",
      "1995",
      "1996",
      "1997",
      "1998",
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "",
    ].includes(input)
  ) {
    return input as FormData["grade"]; // Type assertion
  }
  return "";
}
