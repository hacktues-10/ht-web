export function convertToTechnology(text: string) {
  const selectedNames = text.split(",");
  const selectedTechnologies = selectedNames.map((selectedName) => {
    selectedName = selectedName.trim();
    const technology = technologies.find((tech) => tech.name === selectedName);
    return technology;
  });
  return selectedTechnologies;
}

export function convertToPaginatedTechnologies(text: string) {
  const selectedTechnologies = convertToTechnology(text);
  if (selectedTechnologies.length > 3) {
    const threeTechnologies = selectedTechnologies.slice(0, 3);
    threeTechnologies.push({
      id: 93,
      name: `+${selectedTechnologies.length - 3} more`,
      color: "#696969",
    });
    return threeTechnologies;
  }
  return selectedTechnologies;
}

export const technologies = [
  { id: 1, name: "Python", color: "#FF5733" },
  { id: 2, name: "JavaScript", color: "#FFC300" },
  { id: 3, name: "Java", color: "#C70039" },
  { id: 4, name: "C", color: "#900C3F" },
  { id: 5, name: "C++", color: "#DAF7A6" },
  { id: 6, name: "C#", color: "#FF5733" },
  { id: 7, name: "Ruby", color: "#FFC300" },
  { id: 8, name: "PHP", color: "#C70039" },
  { id: 9, name: "Swift", color: "#900C3F" },
  { id: 10, name: "Kotlin", color: "#DAF7A6" },
  { id: 11, name: "Go (Golang)", color: "#FF5733" },
  { id: 12, name: "Rust", color: "#FFC300" },
  { id: 13, name: "TypeScript", color: "#C70039" },
  { id: 14, name: "HTML", color: "#900C3F" },
  { id: 15, name: "CSS", color: "#DAF7A6" },
  { id: 16, name: "Node.js", color: "#FF5733" },
  { id: 17, name: "React", color: "#FFC300" },
  { id: 18, name: "Angular", color: "#C70039" },
  { id: 19, name: "Vue.js", color: "#900C3F" },
  { id: 20, name: "Django", color: "#DAF7A6" },
  { id: 21, name: "Flask", color: "#FF5733" },
  { id: 22, name: "Spring Framework", color: "#FFC300" },
  { id: 23, name: "Ruby on Rails", color: "#C70039" },
  { id: 24, name: "ASP.NET", color: "#900C3F" },
  { id: 25, name: "Xamarin", color: "#DAF7A6" },
  { id: 26, name: "Electron", color: "#FF5733" },
  { id: 27, name: "Unity", color: "#FFC300" },
  { id: 28, name: "Unreal Engine", color: "#C70039" },
  { id: 29, name: "NumPy", color: "#900C3F" },
  { id: 30, name: "TensorFlow", color: "#DAF7A6" },
  { id: 31, name: "PyTorch", color: "#FF5733" },
  { id: 32, name: "Keras", color: "#FFC300" },
  { id: 33, name: "OpenCV", color: "#C70039" },
  { id: 34, name: "Docker", color: "#900C3F" },
  { id: 35, name: "Kubernetes", color: "#DAF7A6" },
  { id: 36, name: "Jenkins", color: "#FF5733" },
  { id: 37, name: "Bitbucket", color: "#FFC300" },
  { id: 38, name: "Subversion (SVN)", color: "#C70039" },
  { id: 39, name: "MongoDB", color: "#900C3F" },
  { id: 40, name: "MySQL", color: "#DAF7A6" },
  { id: 41, name: "PostgreSQL", color: "#FF5733" },
  { id: 42, name: "Redis", color: "#FFC300" },
  { id: 43, name: "Elasticsearch", color: "#C70039" },
  { id: 44, name: "Apache Kafka", color: "#900C3F" },
  { id: 45, name: "Apache Hadoop", color: "#DAF7A6" },
  { id: 46, name: "Apache Spark", color: "#FF5733" },
  { id: 47, name: "Cassandra", color: "#FFC300" },
  { id: 48, name: "Microsoft Azure", color: "#C70039" },
  { id: 49, name: "Amazon Web Services (AWS)", color: "#900C3F" },
  { id: 50, name: "Google Cloud Platform (GCP)", color: "#DAF7A6" },
  { id: 51, name: "Firebase", color: "#FF5733" },
  { id: 52, name: "NextJS", color: "#FFC300" },
  { id: 53, name: "NoSQL", color: "#C70039" },
  { id: 54, name: "ML - Machine Learning", color: "#900C3F" },
  { id: 55, name: "DL - Deep Learning", color: "#DAF7A6" },
  { id: 56, name: "Arduino", color: "#FF5733" },
  { id: 57, name: "ESP32/ESP8266", color: "#FFC300" },
  { id: 58, name: "IoT", color: "#C70039" },
  { id: 59, name: "Git", color: "#900C3F" },
  { id: 60, name: "Security", color: "#DAF7A6" },
  { id: 61, name: "Web Development", color: "#FF5733" },
  { id: 62, name: "Компютърни мрежи", color: "#FFC300" },
  { id: 63, name: "Bash", color: "#C70039" },
  { id: 64, name: "Flutter", color: "#900C3F" },
  { id: 65, name: "React Native", color: "#DAF7A6" },
  { id: 66, name: "Jetpack Compose", color: "#FF5733" },
  { id: 67, name: "Blockchain", color: "#FFC300" },
  { id: 68, name: "Web3", color: "#C70039" },
  { id: 69, name: "Solidity", color: "#900C3F" },
  { id: 70, name: "IBM Cloud", color: "#DAF7A6" },
  { id: 71, name: "RaspberryPi", color: "#FF5733" },
  { id: 72, name: "2D Modeling", color: "#FFC300" },
  { id: 73, name: "3D Modeling", color: "#C70039" },
  { id: 74, name: "Nginx", color: "#900C3F" },
  { id: 75, name: "Blender", color: "#DAF7A6" },
  { id: 76, name: "Adobe Photoshop", color: "#FF5733" },
  { id: 77, name: "Adobe Illustrator", color: "#FFC300" },
  { id: 78, name: "Adobe After Effects", color: "#C70039" },
  { id: 79, name: "Adobe Premiere Pro", color: "#900C3F" },
  { id: 80, name: "Adobe Animate", color: "#DAF7A6" },
  { id: 81, name: "Dart", color: "#FF5733" },
  { id: 82, name: "Mobile Development", color: "#FFC300" },
  { id: 83, name: "Embedded", color: "#C70039" },
  { id: 84, name: "Assembly", color: "#900C3F" },
  { id: 85, name: "Babel", color: "#DAF7A6" },
  { id: 86, name: "Bootstrap", color: "#FF5733" },
  { id: 87, name: "Svelte", color: "#FFC300" },
  { id: 88, name: "Vim", color: "#C70039" },
  { id: 89, name: "Vercel", color: "#900C3F" },
  { id: 90, name: "Vite", color: "#DAF7A6" },
  { id: 91, name: "WordPress", color: "#FF5733" },
  { id: 92, name: "Jax", color: "#FFC300" },
];
