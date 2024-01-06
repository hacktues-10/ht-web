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
    name: "Assembly",
    color: "#001f3f",
    textColor: "#FFFFFF",
    value: "assembly",
  },
  {
    id: 2,
    name: "C",
    color: "#002042",
    textColor: "#FFFFFF",
    value: "c",
  },
  {
    id: 3,
    name: "C++",
    color: "#002245",
    textColor: "#FFFFFF",
    value: "c++",
  },
  {
    id: 4,
    name: "Rust",
    color: "#002347",
    textColor: "#FFFFFF",
    value: "rust",
  },
  {
    id: 5,
    name: "Kotlin",
    color: "#00254a",
    textColor: "#FFFFFF",
    value: "kotlin",
  },
  {
    id: 6,
    name: "Swift",
    color: "#00264d",
    textColor: "#FFFFFF",
    value: "swift",
  },
  {
    id: 7,
    name: "Java",
    color: "#002850",
    textColor: "#FFFFFF",
    value: "java",
  },
  {
    id: 8,
    name: "Dart",
    color: "#002953",
    textColor: "#FFFFFF",
    value: "dart",
  },
  {
    id: 9,
    name: "C#",
    color: "#002a55",
    textColor: "#FFFFFF",
    value: "c#",
  },
  {
    id: 10,
    name: "Go",
    color: "#002c58",
    textColor: "#FFFFFF",
    value: "go",
  },
  {
    id: 11,
    name: "Python",
    color: "#002d5b",
    textColor: "#FFFFFF",
    value: "python",
  },
  {
    id: 12,
    name: "Ruby",
    color: "#002f5e",
    textColor: "#FFFFFF",
    value: "ruby",
  },
  {
    id: 13,
    name: "PHP",
    color: "#003060",
    textColor: "#FFFFFF",
    value: "php",
  },
  {
    id: 14,
    name: "JavaScript",
    color: "#003263",
    textColor: "#FFFFFF",
    value: "javascript",
  },
  {
    id: 15,
    name: "TypeScript",
    color: "#003366",
    textColor: "#FFFFFF",
    value: "typescript",
  },
  {
    id: 16,
    name: "HTML",
    color: "#ffd700",
    textColor: "#000000",
    value: "html",
  },
  {
    id: 17,
    name: "CSS",
    color: "#f8cf10",
    textColor: "#000000",
    value: "css",
  },
  {
    id: 18,
    name: "Sass",
    color: "#f0c71f",
    textColor: "#000000",
    value: "sass",
  },
  {
    id: 19,
    name: "Tailwind",
    color: "#e9bf30",
    textColor: "#000000",
    value: "tailwind",
  },
  {
    id: 20,
    name: "React",
    color: "#e1b73f",
    textColor: "#000000",
    value: "react",
  },
  {
    id: 21,
    name: "Vue.js",
    color: "#daaf50",
    textColor: "#000000",
    value: "vue.js",
  },
  {
    id: 22,
    name: "Bootstrap",
    color: "#d2a75f",
    textColor: "#000000",
    value: "bootstrap",
  },
  {
    id: 23,
    name: "Svelte",
    color: "#cb9f70",
    textColor: "#000000",
    value: "svelte",
  },
  {
    id: 24,
    name: "Vite",
    color: "#c3977f",
    textColor: "#000000",
    value: "vite",
  },
  {
    id: 25,
    name: "WordPress",
    color: "#bc8f8f",
    textColor: "#000000",
    value: "wordpress",
  },
  {
    id: 26,
    name: "Node.js",
    color: "#00796b",
    textColor: "#FFFFFF",
    value: "node.js",
  },
  {
    id: 27,
    name: "Django",
    color: "#0a8068",
    textColor: "#FFFFFF",
    value: "django",
  },
  {
    id: 28,
    name: "Flask",
    color: "#138764",
    textColor: "#FFFFFF",
    value: "flask",
  },
  {
    id: 29,
    name: "Laravel",
    color: "#1d8d61",
    textColor: "#FFFFFF",
    value: "laravel",
  },
  {
    id: 30,
    name: "Bun",
    color: "#26945d",
    textColor: "#FFFFFF",
    value: "bun",
  },
  {
    id: 31,
    name: "Spring Boot",
    color: "#309b5a",
    textColor: "#FFFFFF",
    value: "spring-boot",
  },
  {
    id: 32,
    name: "ASP.NET",
    color: "#39a257",
    textColor: "#000000",
    value: "asp.net",
  },
  {
    id: 33,
    name: "ExpressJS",
    color: "#43a853",
    textColor: "#000000",
    value: "expressjs",
  },
  {
    id: 34,
    name: "NextJS",
    color: "#4caf50",
    textColor: "#000000",
    value: "nextjs",
  },
  {
    id: 35,
    name: "Xamarin",
    color: "#b22222",
    textColor: "#FFFFFF",
    value: "xamarin",
  },
  {
    id: 36,
    name: "Electron",
    color: "#c5322b",
    textColor: "#FFFFFF",
    value: "electron",
  },
  {
    id: 37,
    name: "Flutter",
    color: "#d94335",
    textColor: "#FFFFFF",
    value: "flutter",
  },
  {
    id: 38,
    name: "React Native",
    color: "#ec533e",
    textColor: "#FFFFFF",
    value: "react-native",
  },
  {
    id: 39,
    name: "Jetpack Compose",
    color: "#ff6347",
    textColor: "#000000",
    value: "jetpack-compose",
  },
  {
    id: 40,
    name: "Unity",
    color: "#ff6f61",
    textColor: "#000000",
    value: "unity",
  },
  {
    id: 41,
    name: "Unreal Engine",
    color: "#c53776",
    textColor: "#FFFFFF",
    value: "unreal-engine",
  },
  {
    id: 42,
    name: "Godot",
    color: "#8b008b",
    textColor: "#FFFFFF",
    value: "godot",
  },
  {
    id: 43,
    name: "Bash",
    color: "#ffa500",
    textColor: "#000000",
    value: "bash",
  },
  {
    id: 44,
    name: "Vim",
    color: "#c5750a",
    textColor: "#FFFFFF",
    value: "vim",
  },
  {
    id: 45,
    name: "Git",
    color: "#8b4513",
    textColor: "#FFFFFF",
    value: "git",
  },
  {
    id: 46,
    name: "Microsoft Azure",
    color: "#4682b4",
    textColor: "#FFFFFF",
    value: "microsoft-azure",
  },
  {
    id: 47,
    name: "AWS",
    color: "#5391c2",
    textColor: "#000000",
    value: "aws",
  },
  {
    id: 48,
    name: "Google Cloud",
    color: "#60a0d0",
    textColor: "#000000",
    value: "google-cloud",
  },
  {
    id: 49,
    name: "IBM Cloud",
    color: "#6db0de",
    textColor: "#000000",
    value: "ibm-cloud",
  },
  {
    id: 50,
    name: "Firebase",
    color: "#7abfec",
    textColor: "#000000",
    value: "firebase",
  },
  {
    id: 51,
    name: "Vercel",
    color: "#87cefa",
    textColor: "#000000",
    value: "vercel",
  },
  {
    id: 52,
    name: "MongoDB",
    color: "#9370db",
    textColor: "#FFFFFF",
    value: "mongodb",
  },
  {
    id: 53,
    name: "MySQL",
    color: "#9269dc",
    textColor: "#FFFFFF",
    value: "mysql",
  },
  {
    id: 54,
    name: "PostgreSQL",
    color: "#9162dc",
    textColor: "#FFFFFF",
    value: "postgresql",
  },
  {
    id: 55,
    name: "NoSQL",
    color: "#905bdd",
    textColor: "#FFFFFF",
    value: "nosql",
  },
  {
    id: 56,
    name: "Redis",
    color: "#8f54de",
    textColor: "#FFFFFF",
    value: "redis",
  },
  {
    id: 57,
    name: "Elasticsearch",
    color: "#8e4ddf",
    textColor: "#FFFFFF",
    value: "elasticsearch",
  },
  {
    id: 58,
    name: "Apache Kafka",
    color: "#8e47df",
    textColor: "#FFFFFF",
    value: "apache-kafka",
  },
  {
    id: 59,
    name: "Apache Hadoop",
    color: "#8d40e0",
    textColor: "#FFFFFF",
    value: "apache-hadoop",
  },
  {
    id: 60,
    name: "Apache Spark",
    color: "#8c39e1",
    textColor: "#FFFFFF",
    value: "apache-spark",
  },
  {
    id: 61,
    name: "RabbitMQ",
    color: "#8b32e1",
    textColor: "#FFFFFF",
    value: "rabbitmq",
  },
  {
    id: 62,
    name: "Cassandra",
    color: "#8a2be2",
    textColor: "#FFFFFF",
    value: "cassandra",
  },
  {
    id: 63,
    name: "R",
    color: "#daa520",
    textColor: "#000000",
    value: "r",
  },
  {
    id: 64,
    name: "NumPy",
    color: "#cf971e",
    textColor: "#000000",
    value: "numpy",
  },
  {
    id: 65,
    name: "Pandas",
    color: "#c38a1c",
    textColor: "#000000",
    value: "pandas",
  },
  {
    id: 66,
    name: "TensorFlow",
    color: "#b87c1a",
    textColor: "#000000",
    value: "tensorflow",
  },
  {
    id: 67,
    name: "PyTorch",
    color: "#ad6e19",
    textColor: "#FFFFFF",
    value: "pytorch",
  },
  {
    id: 68,
    name: "JAX",
    color: "#a26017",
    textColor: "#FFFFFF",
    value: "jax",
  },
  {
    id: 69,
    name: "Keras",
    color: "#965315",
    textColor: "#FFFFFF",
    value: "keras",
  },
  {
    id: 70,
    name: "OpenCV",
    color: "#8b4513",
    textColor: "#FFFFFF",
    value: "opencv",
  },
  {
    id: 71,
    name: "Docker",
    color: "#228b22",
    textColor: "#FFFFFF",
    value: "docker",
  },
  {
    id: 72,
    name: "Kubernetes",
    color: "#59a459",
    textColor: "#000000",
    value: "kubernetes",
  },
  {
    id: 73,
    name: "Nginx",
    color: "#8fbc8f",
    textColor: "#000000",
    value: "nginx",
  },
  {
    id: 74,
    name: "Arduino",
    color: "#e75480",
    textColor: "#FFFFFF",
    value: "arduino",
  },
  {
    id: 75,
    name: "ESP32/ESP8266",
    color: "#c83855",
    textColor: "#FFFFFF",
    value: "esp32/esp8266",
  },
  {
    id: 76,
    name: "IoT",
    color: "#aa1c2b",
    textColor: "#FFFFFF",
    value: "iot",
  },
  {
    id: 77,
    name: "Raspberry Pi",
    color: "#8b0000",
    textColor: "#FFFFFF",
    value: "raspberry-pi",
  },
  {
    id: 78,
    name: "Компютърни мрежи",
    color: "#1e90ff",
    textColor: "#FFFFFF",
    value: "computer-networks",
  },
  {
    id: 79,
    name: "Security",
    color: "#00ced1",
    textColor: "#000000",
    value: "security",
  },
  {
    id: 80,
    name: "Blockchain",
    color: "#ff6f61",
    textColor: "#000000",
    value: "blockchain",
  },
  {
    id: 81,
    name: "Web3",
    color: "#ffd700",
    textColor: "#000000",
    value: "web3",
  },
  {
    id: 82,
    name: "Blender",
    color: "#dda0dd",
    textColor: "#000000",
    value: "blender",
  },
  {
    id: 83,
    name: "2D Modeling",
    color: "#bb69d4",
    textColor: "#000000",
    value: "2d-modeling",
  },
  {
    id: 84,
    name: "3D Modeling",
    color: "#9932cc",
    textColor: "#FFFFFF",
    value: "3d-modeling",
  },
  {
    id: 85,
    name: "Machine Learning",
    color: "#191970",
    textColor: "#FFFFFF",
    value: "machine-learning",
  },
  {
    id: 86,
    name: "Deep Learning",
    color: "#222e7e",
    textColor: "#FFFFFF",
    value: "deep-learning",
  },
  {
    id: 87,
    name: "Web Development",
    color: "#2b438b",
    textColor: "#FFFFFF",
    value: "web-development",
  },
  {
    id: 88,
    name: "Mobile Development",
    color: "#345899",
    textColor: "#FFFFFF",
    value: "mobile-development",
  },
  {
    id: 89,
    name: "Embedded",
    color: "#3d6da6",
    textColor: "#FFFFFF",
    value: "embedded",
  },
  {
    id: 90,
    name: "Game Development",
    color: "#4682b4",
    textColor: "#FFFFFF",
    value: "game-development",
  },
];
