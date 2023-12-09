import invariant from "tiny-invariant";

export function convertToTechnology(text: string) {
  const selectedNames = text.split(",");
  const selectedTechnologies = selectedNames.map((selectedName) => {
    selectedName = selectedName.trim();
    const technology = technologies.find((tech) => tech.name === selectedName);
    invariant(technology, "Invalid technology");
    return technology;
  });
  return selectedTechnologies;
}

export function convertToPaginatedTechnologies(text: string) {
  const selectedTechnologies = convertToTechnology(text);
  if (selectedTechnologies.length > 3) {
    const returnTechnologies = selectedTechnologies.slice(0, 3);
    const totalCharCount = returnTechnologies.reduce(
      (acc, technology) => acc + technology.name.length,
      0,
    );
    if (totalCharCount > 26) {
      returnTechnologies.pop();
    }
    returnTechnologies.push({
      id: 93,
      name: `+${selectedTechnologies.length - 3} more`,
      color: "#696969",
      textColor: "#FFFFFF",
    });
    return returnTechnologies;
  }
  return selectedTechnologies;
}

export const technologies = [
  { id: 1, name: "Python", color: "#306998", textColor: "#FFFFFF" },
  { id: 2, name: "JavaScript", color: "#F0DB4F", textColor: "#000000" },
  { id: 3, name: "Java", color: "#5382A1", textColor: "#FFFFFF" },
  { id: 4, name: "C", color: "#A8B9CC", textColor: "#000000" },
  { id: 5, name: "C++", color: "#659AD2", textColor: "#FFFFFF" },
  { id: 6, name: "C#", color: "#178600", textColor: "#FFFFFF" },
  { id: 7, name: "Ruby", color: "#CC342D", textColor: "#FFFFFF" },
  { id: 8, name: "PHP", color: "#8993BE", textColor: "#000000" },
  { id: 9, name: "Swift", color: "#FA7343", textColor: "#FFFFF" },
  { id: 10, name: "Kotlin", color: "#3DDC84", textColor: "#000000" },
  { id: 11, name: "Go", color: "#00ADD8", textColor: "#FFFFFF" },
  { id: 12, name: "Rust", color: "#000000", textColor: "#FFFFFF" },
  { id: 13, name: "TS", color: "#007ACC", textColor: "#FFFFFF" },
  { id: 14, name: "HTML", color: "#E44D26", textColor: "#FFFFFF" },
  { id: 15, name: "CSS", color: "#264DE4", textColor: "#FFFFFF" },
  { id: 16, name: "Node.js", color: "#8CC84B", textColor: "#000000" },
  { id: 17, name: "React", color: "#00D8FF", textColor: "#000000" },
  { id: 18, name: "Angular", color: "#DD0031", textColor: "#FFFFFF" },
  { id: 19, name: "Vue.js", color: "#4FC08D", textColor: "#000000" },
  { id: 20, name: "Django", color: "#092E20", textColor: "#FFFFFF" },
  { id: 21, name: "Flask", color: "#000000", textColor: "#FFFFFF" },
  { id: 22, name: "Java Spring", color: "#6DB33F", textColor: "#000000" },
  { id: 23, name: "Ruby", color: "#CC0000", textColor: "#FFFFFF" },
  { id: 24, name: "ASP.NET", color: "#5C2D91", textColor: "#FFFFFF" },
  { id: 25, name: "Xamarin", color: "#3498DB", textColor: "#FFFFFF" },
  { id: 26, name: "Electron", color: "#2C2C2C", textColor: "#FFFFFF" },
  { id: 27, name: "Unity", color: "#000000", textColor: "#FFFFFF" },
  { id: 28, name: "Unreal Engine", color: "#313131", textColor: "#FFFFFF" },
  { id: 29, name: "NumPy", color: "#013243", textColor: "#FFFFFF" },
  { id: 30, name: "TensorFlow", color: "#FF6F61", textColor: "#000000" },
  { id: 31, name: "PyTorch", color: "#EE4C2C", textColor: "#FFFFFF" },
  { id: 32, name: "Keras", color: "#D00000", textColor: "#FFFFFF" },
  { id: 33, name: "OpenCV", color: "#5C3E0F", textColor: "#FFFFFF" },
  { id: 34, name: "Docker", color: "#2496ED", textColor: "#FFFFFF" },
  { id: 35, name: "Kubernetes", color: "#326CE5", textColor: "#FFFFFF" },
  { id: 36, name: "Jenkins", color: "#D24939", textColor: "#FFFFFF" },
  { id: 37, name: "Bitbucket", color: "#0052CC", textColor: "#FFFFFF" },
  { id: 38, name: "Subversion", color: "#809CC9", textColor: "#000000" },
  { id: 39, name: "MongoDB", color: "#47A248", textColor: "#000000" },
  { id: 40, name: "MySQL", color: "#4479A1", textColor: "#FFFFFF" },
  { id: 41, name: "PostgreSQL", color: "#336791", textColor: "#FFFFFF" },
  { id: 42, name: "Redis", color: "#DC382D", textColor: "#FFFFFF" },
  { id: 43, name: "Elasticsearch", color: "#005571", textColor: "#FFFFFF" },
  { id: 44, name: "Apache Kafka", color: "#231F20", textColor: "#FFFFFF" },
  { id: 45, name: "Apache Hadoop", color: "#FF6525", textColor: "#000000" },
  { id: 46, name: "Apache Spark", color: "#E25A1C", textColor: "#FFFFFF" },
  { id: 47, name: "Cassandra", color: "#1287B1", textColor: "#FFFFFF" },
  { id: 48, name: "Microsoft Azure", color: "#0078D4", textColor: "#FFFFFF" },
  {
    id: 49,
    name: "AWS",
    color: "#FF9900",
    textColor: "#000000",
  },
  {
    id: 50,
    name: "Google Cloud",
    color: "#4285F4",
    textColor: "#FFFFFF",
  },
  { id: 51, name: "Firebase", color: "#FFCA28", textColor: "#000000" },
  { id: 52, name: "NextJS", color: "#000000", textColor: "#FFFFFF" },
  { id: 53, name: "NoSQL", color: "#4DB33D", textColor: "#000000" },
  {
    id: 54,
    name: "Machine Learning",
    color: "#E25A1C",
    textColor: "#FFFFFF",
  },
  {
    id: 55,
    name: "Deep Learning",
    color: "#FF6F61",
    textColor: "#000000",
  },
  { id: 56, name: "Arduino", color: "#00979D", textColor: "#FFFFFF" },
  { id: 57, name: "ESP32/ESP8266", color: "#3F4953", textColor: "#FFFFFF" },
  { id: 58, name: "IoT", color: "#008272", textColor: "#FFFFFF" },
  { id: 59, name: "Git", color: "#F05032", textColor: "#FFFFFF" },
  { id: 60, name: "Security", color: "#FFD700", textColor: "#000000" },
  { id: 61, name: "Web Development", color: "#F16529", textColor: "#FFFFFF" },
  { id: 62, name: "Компютърни мрежи", color: "#FF9900", textColor: "#000000" },
  { id: 63, name: "Bash", color: "#4EAA25", textColor: "#FFFFFF" },
  { id: 64, name: "Flutter", color: "#02569B", textColor: "#FFFFFF" },
  { id: 65, name: "React Native", color: "#00D8FF", textColor: "#000000" },
  { id: 66, name: "Jetpack Compose", color: "#3F4053", textColor: "#FFFFFF" },
  { id: 67, name: "Blockchain", color: "#2758A6", textColor: "#FFFFFF" },
  { id: 68, name: "Web3", color: "#1C1E22", textColor: "#FFFFFF" },
  { id: 69, name: "Solidity", color: "#363636", textColor: "#FFFFFF" },
  { id: 70, name: "IBM Cloud", color: "#3F51B5", textColor: "#FFFFFF" },
  { id: 71, name: "RaspberryPi", color: "#C51A4A", textColor: "#FFFFFF" },
  { id: 72, name: "2D Modeling", color: "#008272", textColor: "#FFFFFF" },
  { id: 73, name: "3D Modeling", color: "#D291BC", textColor: "#000000" },
  { id: 74, name: "Nginx", color: "#269539", textColor: "#FFFFFF" },
  { id: 75, name: "Blender", color: "#F5792A", textColor: "#000000" },
  { id: 76, name: "Dart", color: "#0175C2", textColor: "#FFFFFF" },
  {
    id: 77,
    name: "Mobile Development",
    color: "#3DDC84",
    textColor: "#000000",
  },
  { id: 78, name: "Embedded", color: "#808080", textColor: "#000000" },
  { id: 79, name: "Babel", color: "#F5DA55", textColor: "#000000" },
  { id: 80, name: "Bootstrap", color: "#563D7C", textColor: "#FFFFFF" },
  { id: 81, name: "Svelte", color: "#FF3E00", textColor: "#FFFFFF" },
  { id: 82, name: "Vim", color: "#019733", textColor: "#FFFFFF" },
  { id: 83, name: "Vercel", color: "#000000", textColor: "#FFFFFF" },
  { id: 84, name: "Vite", color: "#646CFF", textColor: "#FFFFFF" },
  { id: 85, name: "WordPress", color: "#00749C", textColor: "#FFFFFF" },
  { id: 86, name: "Jax", color: "#000000", textColor: "#FFFFFF" },
];
