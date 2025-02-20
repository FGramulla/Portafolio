import React, { useEffect, useState, useRef } from "react";
import "../styles/Home.css";
import Button from "../components/Button";
import CardSkill from "../components/CardSkill.jsx";
import CardPage from "../components/CardPage.jsx";
import { Link } from "react-router-dom";
import { FaUser, FaTimes } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { IoMdRose } from "react-icons/io";
import FloatingChat from "../components/FloatingChat.jsx";

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isCurriculumVisible, setIsCurriculumVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typedSubText, setTypedSubText] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isIconUserModalVisible, setIsIconUserModalVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const fullText = "Franco Gramulla Bridarolli";
  const fullSubText = "Front-End   Junior";

  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const curriculumRef = useRef(null);
  const infoRef = useRef(null);


  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  function MobilePhoneModel({ mousePosition }) {
    const { scene } = useGLTF("/models/robot_head.glb");
    const modelRef = useRef();
  
    useEffect(() => {
      if (modelRef.current) {
        // Rotación inicial de 90 grados hacia la izquierda en el eje Y
        modelRef.current.rotation.y = -Math.PI / 2;
      }
    }, []);
  
    useEffect(() => {
      if (modelRef.current) {
        modelRef.current.rotation.y = -Math.PI / 2 + mousePosition.x * 0.3;
        modelRef.current.rotation.x = -mousePosition.y * 0.3;
        
      }
    }, [mousePosition]);
    
  
    return <primitive object={scene} ref={modelRef} position={[0, 0, 0]} scale={2} />;
  }
  
  // Detectar Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer para detectar si las secciones están visibles
  useEffect(() => {
    const observerOptions = { threshold: 0.3 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === skillsRef.current) {
          setIsSkillsVisible(entry.isIntersecting);
        }
        if (entry.target === projectsRef.current) {
          setIsProjectsVisible(entry.isIntersecting);
        }
        if (entry.target === infoRef.current) {
          setIsInfoVisible(entry.isIntersecting);
        }
        if (entry.target === curriculumRef.current) {
          setIsCurriculumVisible(entry.isIntersecting); // Actualiza la visibilidad del currículum
        }
      });
    }, observerOptions);

    if (skillsRef.current) observer.observe(skillsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    if (curriculumRef.current) observer.observe(curriculumRef.current); // Observa el currículum

    return () => {
      if (skillsRef.current) observer.unobserve(skillsRef.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
      if (infoRef.current) observer.unobserve(infoRef.current);
      if (curriculumRef.current) observer.unobserve(curriculumRef.current); // Deja de observar el currículum
    };
  }, []);

  // Efecto de máquina de escribir
  useEffect(() => {
    if (isInfoVisible && fullText && fullSubText) {
      setTypedText("");
      setTypedSubText("");

      let currentText = "";
      let currentSubText = "";

      const typingIntervalText = setInterval(() => {
        if (currentText.length < fullText.length) {
          currentText += fullText[currentText.length];
          setTypedText(currentText);
        } else {
          clearInterval(typingIntervalText);
        }
      }, 50);

      const typingIntervalSubText = setInterval(() => {
        if (currentSubText.length < fullSubText.length) {
          currentSubText += fullSubText[currentSubText.length];
          setTypedSubText(currentSubText);
        } else {
          clearInterval(typingIntervalSubText);
        }
      }, 200);

      return () => {
        clearInterval(typingIntervalText);
        clearInterval(typingIntervalSubText);
      };
    }
  }, [isInfoVisible, fullText, fullSubText]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const toggleIconUserModal = () => {
    setIsIconUserModalVisible(!isIconUserModalVisible);
  };

  return (
    <div className="home" onMouseMove={handleMouseMove}>
      <div
        className="container-1"
        style={{ transform: `translateY(${scrollPosition * -0.9}px)` }}
      >
        <h1>MI PORTAFOLIO</h1>
        <div className="animation"></div>
      </div>
      <div className="c-1">
        <div className="c-1-modelRobot">
          <Canvas
            style={{ width: "100%", height: "100%" }}
            camera={{ position: [0, 0, 5], fov: 50 }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1} />
            <MobilePhoneModel mousePosition={mousePosition} />
            <OrbitControls enableZoom={false} enableRotate={false} />

          </Canvas>
        </div>
      </div>
      <div
        className="container-2"
        style={{ transform: `translateY(${scrollPosition * 0}px)` }}
        id="presentation"
      >
        <div className="container-2-img" onClick={toggleIconUserModal}>
          <FaUser />
          <span className="tooltip">ClickMe</span>
        </div>
        <div ref={infoRef} className="container-2-info">
          <h1>{typedText}</h1>
          <h4>
            {typedSubText.split("").map((char, index) => (
              <span
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  color: hoveredIndex === index ? "skyblue" : "transparent",
                  backgroundImage:
                    hoveredIndex === index
                      ? "none"
                      : "linear-gradient(330deg,rgb(252, 232, 52),rgb(250, 66, 66))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  transition: "color 0.2s ease, background 0.2s ease",
                  display: "inline-block",
                  padding: "0 2px",
                }}
              >
                {char}
              </span>
            ))}
          </h4>
          <p>
            Bienvenido a mi portafolio. Soy un desarrollador front-end junior
            que estudió{" "}
            <Link
              to="https://www.digitalhouse.com/ar/landing/membresiactd-ar?utm_source=Google&utm_medium=paidsearch&utm_campaign=AlwaysOn&utm_content=membresia-search_membresia-none-kws_todas-productapp-membresia-ar&gad_source=1&gclid=Cj0KCQiAkoe9BhDYARIsAH85cDP1U53LQ0j8eJgE39SeIbdtyHs5Azy22rwxMXBvtZLfGXwLfC5tEJUaArf9EALw_wcB"
              className="link"
              id="cetified-tech-developer"
            >
              Certified Tech Developer
            </Link>{" "}
            en{" "}
            <Link
              to="https://www.digitalhouse.com/ar"
              className="link"
              id="digital-house"
            >
              Digital House
            </Link>
            . Apasionado por crear experiencias visuales atractivas y
            funcionales. Con experiencia en{" "}
            <b style={{ color: "crimson" }}>HTML</b>,{" "}
            <b style={{ color: "skyblue" }}>CSS</b>,{" "}
            <b style={{ color: "yellow" }}>JavaScript</b> y frameworks como{" "}
            <b style={{ color: "blue" }}>React</b>, me esfuerzo por construir
            aplicaciones rápidas y eficientes, siempre buscando soluciones
            innovadoras.
          </p>
          <p className="text"></p>
          <Button
            text="Contáctame"
            onClick={() => console.log("Botón clickeado")}
          />
        </div>
      </div>

      <div className="container-3" id="about-me">
        <div
          ref={curriculumRef}
          className={`curriculum ${isCurriculumVisible ? "visible" : ""}`}
        >
          <h1>About Me</h1>

          {/* Contenedor de dos columnas */}
          <div className="grid-container">
            {/* Columna izquierda */}
            <div className="left-column">
              {/* Sección de Información Personal */}
              <section>
                <h2>FRANCO GRAMULLA BRIDAROLLI</h2>
                <p>
                  <strong>Availability:</strong> FULL TIME
                </p>
                <p>
                  <strong>Date of Birth:</strong> 10/17/2003
                </p>
                <p>
                  <strong>Marital Status:</strong> No Children / Single
                </p>
                <p>
                  <strong>Driver's License:</strong> Motorcycle
                </p>
                <p>
                  <strong>Location:</strong> Rio Cuarto, Córdoba, Argentina
                </p>
              </section>

              {/* Sección de Contacto */}
              <section>
                <h2>CONTACT INFORMATION</h2>
                <p>
                  <strong style={{ color: "aqua" }}>LinkedIn:</strong> Franco
                  Gramulla Bridarolli
                </p>
                <p>
                  <strong style={{ color: "crimson" }}>Email:</strong>{" "}
                  fgramulla@gmail.com
                </p>
              </section>

              {/* Sección de Idiomas */}
              <section>
                <h2>LANGUAGE</h2>
                <p>
                  <img
                    src="/img/espana-flag.png"
                    alt="Spanish Flag"
                    width="20"
                  />
                  <strong> Spanish:</strong> Native
                </p>
                <p>
                  <img
                    src="/img/estados-unidos-flag.png"
                    alt="British Flag"
                    width="20"
                  />
                  <strong> English:</strong> Teens 5 B1 (Plus)
                </p>
              </section>

              {/* Sección de Resumen (SUMMARY) */}
              <section>
                <h2>SUMMARY</h2>
                <p>
                  I consider myself a proactive, efficient person, capable of
                  learning and coping with any obstacle. My jobs gave me a lot
                  of experience and knowledge in administration and management
                  of computer systems.
                </p>
              </section>
            </div>

            {/* Columna derecha */}
            <div className="right-column">
              {/* Sección de Educación */}
              <section>
                <h2>EDUCATION</h2>
                <p>
                  <strong>Coder House:</strong> Ux/UI Designer |{" "}
                  <b style={{ color: "skyblue" }}>In Progress</b>
                </p>
                <p>
                  <strong>Digital House:</strong> Certified Tech Developer |
                  <b style={{ color: "skyblue" }}>2023</b>
                </p>
                <p>
                  <strong>National Technological University:</strong> English
                  Course (Teens 5 B1 (Plus)) |{" "}
                  <b style={{ color: "skyblue" }}>2021</b>
                </p>
                <p>
                  <strong>Institute “La Consolata”:</strong> Bachelor of Natural
                  Sciences | <b style={{ color: "skyblue" }}>2021</b>
                </p>
              </section>

              {/* Sección de Experiencia Laboral */}
              <section>
                <h2>WORK EXPERIENCE</h2>
                <p>
                  <strong>Jr Front-End Developer | AseAgro</strong>
                </p>
                <p>
                  Rio Cuarto, Cordoba | June - August{" "}
                  <b style={{ color: "skyblue" }}>2023</b>
                </p>
                <ul>
                  <li>Front-End Developer</li>
                  <li>Website Update</li>
                  <li>Data Organizer</li>
                  <li>Weekly Activities Management</li>
                </ul>
              </section>

              {/* Sección de Habilidades Principales */}
              <section>
                <h2>MAIN SKILLS</h2>
                <ul>
                  <li>Excellent communication skills.</li>
                  <li>Task organization.</li>
                  <li>Optimal team and independent performance.</li>
                  <li>
                    Ability to follow instructions and deliver quality results.
                  </li>
                  <li>Ability to constantly learn.</li>
                  <li>Front-End specialty.</li>
                  <li>Responsible and punctual.</li>
                </ul>
              </section>
            </div>
          </div>
          <Button
            text="Mi Curriculum"
            target="_blank"
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1cWZxjE1kVwJpamBaZK5T3Anin9b646fF/view?usp=sharing",
                "_blank"
              )
            }
          />
        </div>
      </div>
      <div className="container-4">
        <div
          ref={skillsRef}
          className={`skills-section ${isSkillsVisible ? "visible" : ""}`}
          id="skills"
        >
          <h1>Mis Habilidades</h1>
          <CardSkill />
        </div>

        <div
          ref={projectsRef}
          className={`proyects-section ${isProjectsVisible ? "visible" : ""}`}
          id="projects"
        >
          <h1>Mis Proyectos</h1>
          <CardPage />
        </div>
      </div>

      {/* Globo flotante */}
      <FloatingChat />

      {isIconUserModalVisible && (
        <div className="icon-user-modal-overlay">
          <div className="icon-user-modal">
            <h1>Gracias por clickerme, toma una rosa</h1>
            <button onClick={toggleIconUserModal}>
              <IoMdRose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
