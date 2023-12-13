import invariant from "tiny-invariant";

export function convertToTechnology(text: string) {
  const selectedNames = text.split(",");
  const selectedTechnologies = selectedNames
    .map((selectedName) => {
      selectedName = selectedName.trim();
      const technology = technologies.find(
        (tech) => tech.name === selectedName,
      );
      if (technology) {
        return technology;
      }
    })
    .filter((tech) => tech !== undefined);
  if (selectedTechnologies) return selectedTechnologies;
  return [];
}

export function convertToPaginatedTechnologies(text: string, num: number) {
  const selectedTechnologies = convertToTechnology(text);
  if (selectedTechnologies.length > num) {
    const returnTechnologies = selectedTechnologies.slice(0, num);
    const totalCharCount = returnTechnologies.reduce(
      // FIXME: why is this any?
      (acc, technology) => acc + (technology as any).name.length,
      0,
    );
    if (totalCharCount > num * 9) {
      returnTechnologies.pop();
    }
    returnTechnologies.push({
      id: 93,
      name: `+${selectedTechnologies.length - num} more`,
      color: "#696969",
      textColor: "#FFFFFF",
      value: `+${selectedTechnologies.length - 3}`,
    });
    return returnTechnologies;
  }
  return selectedTechnologies;
}

export function convertTechnologiesToText(
  selectedTechnologies: ReturnType<typeof convertToTechnology>,
) {
  const technologyNames = selectedTechnologies.map(
    (technology) => technology?.name,
  );
  return technologyNames.join(", ");
}

export function prepareTechnologies(techn: string) {
  const selectedTechnologies = convertToTechnology(techn);

  const newTechnologies = technologies.filter((technology) => {
    return !selectedTechnologies.some(
      (selectedTech) => selectedTech?.id === technology.id,
    );
  });

  return newTechnologies;
}

export const technologies = [
  {
    id: 1,
    name: "Python",
    color: "#306998",
    textColor: "#FFFFFF",
    value: "python",
  },
  {
    id: 2,
    name: "JavaScript",
    color: "#F0DB4F",
    textColor: "#000000",
    value: "javascript",
  },
  {
    id: 3,
    name: "Java",
    color: "#5382A1",
    textColor: "#FFFFFF",
    value: "java",
  },
  { id: 4, name: "C", color: "#A8B9CC", textColor: "#000000", value: "c" },
  { id: 5, name: "C++", color: "#659AD2", textColor: "#FFFFFF", value: "c++" },
  { id: 6, name: "C#", color: "#178600", textColor: "#FFFFFF", value: "c#" },
  {
    id: 7,
    name: "Ruby",
    color: "#CC342D",
    textColor: "#FFFFFF",
    value: "ruby",
  },
  { id: 8, name: "PHP", color: "#8993BE", textColor: "#000000", value: "php" },
  {
    id: 9,
    name: "Swift",
    color: "#FA7343",
    textColor: "#FFFFF",
    value: "swift",
  },
  {
    id: 10,
    name: "Kotlin",
    color: "#3DDC84",
    textColor: "#000000",
    value: "kotlin",
  },
  { id: 11, name: "Go", color: "#00ADD8", textColor: "#FFFFFF", value: "go" },
  {
    id: 12,
    name: "Rust",
    color: "#000000",
    textColor: "#FFFFFF",
    value: "rust",
  },
  { id: 13, name: "TS", color: "#007ACC", textColor: "#FFFFFF", value: "ts" },
  {
    id: 14,
    name: "HTML",
    color: "#E44D26",
    textColor: "#FFFFFF",
    value: "html",
  },
  { id: 15, name: "CSS", color: "#264DE4", textColor: "#FFFFFF", value: "css" },
  {
    id: 16,
    name: "Node.js",
    color: "#8CC84B",
    textColor: "#000000",
    value: "node.js",
  },
  {
    id: 17,
    name: "React",
    color: "#00D8FF",
    textColor: "#000000",
    value: "react",
  },
  {
    id: 18,
    name: "Angular",
    color: "#DD0031",
    textColor: "#FFFFFF",
    value: "angular",
  },
  {
    id: 19,
    name: "Vue.js",
    color: "#4FC08D",
    textColor: "#000000",
    value: "vue.js",
  },
  {
    id: 20,
    name: "Django",
    color: "#092E20",
    textColor: "#FFFFFF",
    value: "django",
  },
  {
    id: 21,
    name: "Flask",
    color: "#000000",
    textColor: "#FFFFFF",
    value: "flask",
  },
  {
    id: 22,
    name: "Java Spring",
    color: "#6DB33F",
    textColor: "#000000",
    value: "java-spring",
  },
  {
    id: 23,
    name: "Ruby",
    color: "#CC0000",
    textColor: "#FFFFFF",
    value: "ruby",
  },
  {
    id: 24,
    name: "ASP.NET",
    color: "#5C2D91",
    textColor: "#FFFFFF",
    value: "asp-net",
  },
  {
    id: 25,
    name: "Xamarin",
    color: "#3498DB",
    textColor: "#FFFFFF",
    value: "xamarin",
  },
  {
    id: 26,
    name: "Electron",
    color: "#2C2C2C",
    textColor: "#FFFFFF",
    value: "electron",
  },
  {
    id: 27,
    name: "Unity",
    color: "#000000",
    textColor: "#FFFFFF",
    value: "unity",
  },
  {
    id: 28,
    name: "Unreal Engine",
    color: "#313131",
    textColor: "#FFFFFF",
    value: "unreal-engine",
  },
  {
    id: 29,
    name: "NumPy",
    color: "#013243",
    textColor: "#FFFFFF",
    value: "numpy",
  },
  {
    id: 30,
    name: "TensorFlow",
    color: "#FF6F61",
    textColor: "#000000",
    value: "tensorflow",
  },
  {
    id: 31,
    name: "PyTorch",
    color: "#EE4C2C",
    textColor: "#FFFFFF",
    value: "pytorch",
  },
  {
    id: 32,
    name: "Keras",
    color: "#D00000",
    textColor: "#FFFFFF",
    value: "keras",
  },
  {
    id: 33,
    name: "OpenCV",
    color: "#5C3E0F",
    textColor: "#FFFFFF",
    value: "opencv",
  },
  {
    id: 34,
    name: "Docker",
    color: "#2496ED",
    textColor: "#FFFFFF",
    value: "docker",
  },
  {
    id: 35,
    name: "Kubernetes",
    color: "#326CE5",
    textColor: "#FFFFFF",
    value: "kubernetes",
  },
  {
    id: 36,
    name: "Jenkins",
    color: "#D24939",
    textColor: "#FFFFFF",
    value: "jenkins",
  },
  {
    id: 37,
    name: "Bitbucket",
    color: "#0052CC",
    textColor: "#FFFFFF",
    value: "bitbucket",
  },
  {
    id: 38,
    name: "Subversion",
    color: "#809CC9",
    textColor: "#000000",
    value: "subversion",
  },
  {
    id: 39,
    name: "MongoDB",
    color: "#47A248",
    textColor: "#000000",
    value: "mongodb",
  },
  {
    id: 40,
    name: "MySQL",
    color: "#4479A1",
    textColor: "#FFFFFF",
    value: "mysql",
  },
  {
    id: 41,
    name: "PostgreSQL",
    color: "#336791",
    textColor: "#FFFFFF",
    value: "postgresql",
  },
  {
    id: 42,
    name: "Redis",
    color: "#DC382D",
    textColor: "#FFFFFF",
    value: "redis",
  },
  {
    id: 43,
    name: "Elasticsearch",
    color: "#005571",
    textColor: "#FFFFFF",
    value: "elasticsearch",
  },
  {
    id: 44,
    name: "Apache Kafka",
    color: "#231F20",
    textColor: "#FFFFFF",
    value: "apache-kafka",
  },
  {
    id: 45,
    name: "Apache Hadoop",
    color: "#FF6525",
    textColor: "#000000",
    value: "apache-hadoop",
  },
  {
    id: 46,
    name: "Apache Spark",
    color: "#E25A1C",
    textColor: "#FFFFFF",
    value: "apache-spark",
  },
  {
    id: 47,
    name: "Cassandra",
    color: "#1287B1",
    textColor: "#FFFFFF",
    value: "cassandra",
  },
  {
    id: 48,
    name: "Microsoft Azure",
    color: "#0078D4",
    textColor: "#FFFFFF",
    value: "microsoft-azure",
  },
  { id: 49, name: "AWS", color: "#FF9900", textColor: "#000000", value: "aws" },
  {
    id: 50,
    name: "Google Cloud",
    color: "#4285F4",
    textColor: "#FFFFFF",
    value: "google-cloud",
  },
  {
    id: 51,
    name: "Firebase",
    color: "#FFCA28",
    textColor: "#000000",
    value: "firebase",
  },
  {
    id: 52,
    name: "NextJS",
    color: "#000000",
    textColor: "#FFFFFF",
    value: "nextjs",
  },
  {
    id: 53,
    name: "NoSQL",
    color: "#4DB33D",
    textColor: "#000000",
    value: "nosql",
  },
  {
    id: 54,
    name: "Machine Learning",
    color: "#E25A1C",
    textColor: "#FFFFFF",
    value: "machine-learning",
  },
  {
    id: 55,
    name: "Deep Learning",
    color: "#FF6F61",
    textColor: "#000000",
    value: "deep-learning",
  },
  {
    id: 56,
    name: "Arduino",
    color: "#00979D",
    textColor: "#FFFFFF",
    value: "arduino",
  },
  {
    id: 57,
    name: "ESP32/ESP8266",
    color: "#3F4953",
    textColor: "#FFFFFF",
    value: "esp32-esp8266",
  },
  { id: 58, name: "IoT", color: "#008272", textColor: "#FFFFFF", value: "iot" },
  { id: 59, name: "Git", color: "#F05032", textColor: "#FFFFFF", value: "git" },
  {
    id: 60,
    name: "Security",
    color: "#FFD700",
    textColor: "#000000",
    value: "security",
  },
  {
    id: 61,
    name: "Web Development",
    color: "#F16529",
    textColor: "#FFFFFF",
    value: "web-development",
  },
  {
    id: 62,
    name: "Компютърни мрежи",
    color: "#FF9900",
    textColor: "#000000",
    value: "computer-networks",
  },
  {
    id: 63,
    name: "Bash",
    color: "#4EAA25",
    textColor: "#FFFFFF",
    value: "bash",
  },
  {
    id: 64,
    name: "Flutter",
    color: "#02569B",
    textColor: "#FFFFFF",
    value: "flutter",
  },
  {
    id: 65,
    name: "React Native",
    color: "#00D8FF",
    textColor: "#000000",
    value: "react-native",
  },
  {
    id: 66,
    name: "Jetpack Compose",
    color: "#3F4053",
    textColor: "#FFFFFF",
    value: "jetpack-compose",
  },
  {
    id: 67,
    name: "Blockchain",
    color: "#2758A6",
    textColor: "#FFFFFF",
    value: "blockchain",
  },
  {
    id: 68,
    name: "Web3",
    color: "#1C1E22",
    textColor: "#FFFFFF",
    value: "web3",
  },
  {
    id: 69,
    name: "Solidity",
    color: "#363636",
    textColor: "#FFFFFF",
    value: "solidity",
  },
  {
    id: 70,
    name: "IBM Cloud",
    color: "#3F51B5",
    textColor: "#FFFFFF",
    value: "ibm-cloud",
  },
  {
    id: 71,
    name: "RaspberryPi",
    color: "#C51A4A",
    textColor: "#FFFFFF",
    value: "respberrypi",
  },
  {
    id: 72,
    name: "2D Modeling",
    color: "#008272",
    textColor: "#FFFFFF",
    value: "2d-modeling",
  },
  {
    id: 73,
    name: "3D Modeling",
    color: "#D291BC",
    textColor: "#000000",
    value: "3d-modeling",
  },
  {
    id: 74,
    name: "Nginx",
    color: "#269539",
    textColor: "#FFFFFF",
    value: "nginx",
  },
  {
    id: 75,
    name: "Blender",
    color: "#F5792A",
    textColor: "#000000",
    value: "blender",
  },
  {
    id: 76,
    name: "Dart",
    color: "#0175C2",
    textColor: "#FFFFFF",
    value: "dart",
  },
  {
    id: 77,
    name: "Mobile Development",
    color: "#3DDC84",
    textColor: "#000000",
    value: "mobile-development",
  },
  {
    id: 78,
    name: "Embedded",
    color: "#808080",
    textColor: "#000000",
    value: "embedded",
  },
  {
    id: 79,
    name: "Babel",
    color: "#F5DA55",
    textColor: "#000000",
    value: "babel",
  },
  {
    id: 80,
    name: "Bootstrap",
    color: "#563D7C",
    textColor: "#FFFFFF",
    value: "bootstrap",
  },
  {
    id: 81,
    name: "Svelte",
    color: "#FF3E00",
    textColor: "#FFFFFF",
    value: "svelte",
  },
  { id: 82, name: "Vim", color: "#019733", textColor: "#FFFFFF", value: "vim" },
  {
    id: 83,
    name: "Vercel",
    color: "#000000",
    textColor: "#FFFFFF",
    value: "vercel",
  },
  {
    id: 84,
    name: "Vite",
    color: "#646CFF",
    textColor: "#FFFFFF",
    value: "vite",
  },
  {
    id: 85,
    name: "WordPress",
    color: "#00749C",
    textColor: "#FFFFFF",
    value: "wordpress",
  },
  { id: 86, name: "Jax", color: "#000000", textColor: "#FFFFFF", value: "jax" },
];
