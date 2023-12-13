export const STUDENT_PARALLELS = ["А", "Б", "В", "Г"] as const;

export const REGULAR_ALUMNI_PARALLELS = STUDENT_PARALLELS;
export const EXTENDED_ALUMNI_PARALLELS = ["Д", "Е"] as const;

export const ALUMNI_PARALLELS = [
  ...REGULAR_ALUMNI_PARALLELS,
  ...EXTENDED_ALUMNI_PARALLELS,
] as const;

export const STUDENT_GRADES = ["8", "9", "10", "11", "12"] as const;

export const EXTENDED_ALUMNI_GRADES = ["1993", "1994"] as const;
export const REGULAR_ALUMNI_GRADES = [
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
] as const;

export const ALUMNI_GRADES = [
  ...EXTENDED_ALUMNI_GRADES,
  ...REGULAR_ALUMNI_GRADES,
] as const;
