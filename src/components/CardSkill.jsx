import React from 'react';
import { FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaDatabase, FaGitAlt, FaGithub  } from 'react-icons/fa'; // Importar íconos
import '../styles/CardSkill.css'; // Importa estilos específicos para las tarjetas

const skills = [
  {
    id: 1,
    name: "JavaScript",
    icon: <FaJsSquare />,
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", // Enlace para JS
  },
  {
    id: 2,
    name: "React",
    icon: <FaReact />,
    link: "https://reactjs.org/", // Enlace para React
  },
  {
    id: 3,
    name: "HTML",
    icon: <FaHtml5 />,
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML", // Enlace para HTML
  },
  {
    id: 4,
    name: "CSS",
    icon: <FaCss3Alt />,
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS", // Enlace para CSS
  },
  {
    id: 5,
    name: "SQL",
    icon: <FaDatabase />,
    link: "https://www.w3schools.com/sql/", // Enlace para SQL
  },
  {
    id: 6,
    name: "Git",
    icon: <FaGitAlt />,
    link: "https://git-scm.com/", // Enlace para Git
  },
  {
    id: 7,
    name: "GitHub",
    icon: <FaGithub />,
    link: "https://github.com/", // Enlace para Git
  },
];

function CardSkill() {
  return (
    <div className="skills-container">
      {skills.map((skill) => (
        <a
          key={skill.id}
          href={skill.link}
          target="_blank"
          rel="noopener noreferrer"
          className="skill-card"
        >
          <div className="skill-icon">{skill.icon}</div>
          <h3 className="skill-name">{skill.name}</h3>
        </a>
      ))}
    </div>
  );
}

export default CardSkill;