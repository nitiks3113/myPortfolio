import { motion } from "framer-motion";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";

export default function Projects() {

  const projects = [
    {
      title: "ByteBaazar",
      description:
        "A full stack e-commerce platform built using React, Java Spring Boot and MySQL. Includes product catalog, authentication, cart system and admin dashboard.",
      tech: ["React", "Spring Boot", "MySQL", "REST API"],
      image: photo1,
      github: "https://github.com/nitiks3113",
      live: "#",
    },
    {
      title: "Student Management System",
      description:
        "A Java based application to manage student records including admission, course enrollment, and result tracking with database integration.",
      tech: ["Java", "JDBC", "MySQL"],
      image: photo2,
      github: "https://github.com/nitiks3113/student_Management_System",
      live: "https://github.com/nitiks3113/student_Management_System",
    },
    {
      title: "Weather App",
      description:
        "A responsive weather application that fetches real-time weather data from external APIs and displays forecasts for different cities.",
      tech: ["JavaScript", "API", "CSS"],
      image: photo3,
      github: "https://github.com/nitiks3113/weather-app",
      live: "https://nitiks3113.github.io/weather-app/",
    },
  ];

  return (
    <section
      id="projects"
      className="w-full bg-black text-white py-24 px-6 md:px-20"
    >

      {/* Section Title */}

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-16 text-center"
      >
        Projects
      </motion.h2>

      {/* Project Grid */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {projects.map((project, index) => (

          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >

            {/* Project Image */}

            <div className="h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Project Content */}

            <div className="p-6">

              <h3 className="text-xl font-semibold mb-3">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-gray-800 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}

              <div className="flex gap-4">

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition"
                >
                  GitHub
                </a>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm border border-white rounded hover:bg-white hover:text-black transition"
                >
                  Live Demo
                </a>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}