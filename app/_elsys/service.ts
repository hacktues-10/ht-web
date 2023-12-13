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
