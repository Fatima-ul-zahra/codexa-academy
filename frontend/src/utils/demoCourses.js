const demoCourses = [
  {
    _id: "demo-1",
    name: "Full Stack Web Development",
    slug: "full-stack-web-development",
    shortDescription:
      "Learn modern frontend and backend development and build complete web applications.",
    description:
      "A practical full-stack development program covering frontend development, backend APIs, databases, authentication, and deployment.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    fee: "PKR 25,000",
    duration: "3 Months",
    level: "Intermediate",
    category: "Web Development",
    featured: true,
    learningOutcomes: [
      "Build responsive websites",
      "Develop React applications",
      "Create REST APIs",
      "Work with MongoDB",
      "Build complete full-stack projects",
    ],
    syllabus: [
      {
        title: "Frontend Development",
        topics: [
          "HTML & CSS",
          "JavaScript",
          "Responsive Design",
          "React",
        ],
      },
      {
        title: "Backend Development",
        topics: [
          "Node.js",
          "Express.js",
          "REST APIs",
          "MongoDB",
        ],
      },
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    prerequisites: [
      "Basic computer knowledge",
      "Basic understanding of web browsing",
    ],
    certificate: false,
  },

  {
    _id: "demo-2",
    name: "Python Programming",
    slug: "python-programming",
    shortDescription:
      "Build a strong programming foundation with Python through practical exercises and projects.",
    description:
      "A practical Python program designed to help students understand programming fundamentals and develop useful applications.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    fee: "PKR 18,000",
    duration: "2 Months",
    level: "Beginner",
    category: "Programming",
    featured: true,
    learningOutcomes: [
      "Understand programming fundamentals",
      "Write Python programs",
      "Work with functions and modules",
      "Handle files and data",
      "Build practical Python projects",
    ],
    syllabus: [
      {
        title: "Python Fundamentals",
        topics: [
          "Variables",
          "Data Types",
          "Conditions",
          "Loops",
          "Functions",
        ],
      },
      {
        title: "Practical Python",
        topics: [
          "Files",
          "Modules",
          "Error Handling",
          "Projects",
        ],
      },
    ],
    technologies: ["Python", "VS Code"],
    prerequisites: ["Basic computer knowledge"],
    certificate: false,
  },

  {
    _id: "demo-3",
    name: "Digital Skills & IT Essentials",
    slug: "digital-skills-it-essentials",
    shortDescription:
      "Develop essential digital and computer skills for study, work, and everyday technology use.",
    description:
      "A beginner-friendly technology program covering essential computer, productivity, internet, and digital skills.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    fee: "PKR 12,000",
    duration: "6 Weeks",
    level: "Beginner",
    category: "IT Essentials",
    featured: false,
    learningOutcomes: [
      "Use computers confidently",
      "Work with productivity tools",
      "Understand internet fundamentals",
      "Manage digital files",
      "Improve everyday digital productivity",
    ],
    syllabus: [
      {
        title: "Computer Fundamentals",
        topics: [
          "Computer Basics",
          "Operating Systems",
          "Files & Folders",
        ],
      },
      {
        title: "Digital Productivity",
        topics: [
          "Documents",
          "Spreadsheets",
          "Presentations",
          "Internet Skills",
        ],
      },
    ],
    technologies: ["Windows", "Microsoft Office", "Internet Tools"],
    prerequisites: [],
    certificate: false,
  },
];

export default demoCourses;