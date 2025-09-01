import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SectionContext } from "../context/SectionContext.jsx";
import "../styles/Header.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDarkMode } from "../context/DarkModeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const [isSectionsMenuVisible, setIsSectionsMenuVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú lateral
  const sectionsRef = useRef(null);
  const { scrollToSection } = useContext(SectionContext);
  const { darkMode, toggleDarkMode } = useDarkMode(); // Usar el contexto

  const toggleSectionsMenu = () => {
    setIsSectionsMenuVisible(!isSectionsMenuVisible);
  };

  const handleSectionClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsSectionsMenuVisible(false); // Cierra el menú después de hacer clic
    setIsMenuOpen(false); // Cierra el menú lateral después de hacer clic
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Abre o cierra el menú lateral
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sectionsRef.current && !sectionsRef.current.contains(event.target)) {
        setIsSectionsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="hamburguer-menu" onClick={toggleMenu}>
        <GiHamburgerMenu />
      </div>

      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <button
          className="close-side-header-button"
          onClick={() => toggleMenu(false)}
        >
          <IoCloseCircleOutline />
        </button>
        <ul className="side-menu-list">
          <li className="side-menu-item">
            <Link
              to="https://github.com/FGramulla"
              target="_blank"
              rel="noopener noreferrer"
              className="side-menu-link"
            >
              Github
            </Link>
          </li>
          <li className="side-menu-item">
            <Link
              to="https://www.linkedin.com/in/franco-gramulla-bridarolli-802a20243/"
              target="_blank"
              rel="noopener noreferrer"
              className="side-menu-link"
            >
              LinkedIn
            </Link>
          </li>
          <li className="side-menu-item">
            <Link
              to="https://www.instagram.com/franngramulla/"
              target="_blank"
              rel="noopener noreferrer"
              className="side-menu-link"
            >
              Instagram
            </Link>
          </li>
          <li
            className="side-menu-item"
            onClick={() => handleSectionClick("presentation")}
          >
            <span className="side-menu-link">Presentation</span>
          </li>
          <li
            className="side-menu-item"
            onClick={() => handleSectionClick("about-me")}
          >
            <span className="side-menu-link">About Me</span>
          </li>
          <li
            className="side-menu-item"
            onClick={() => handleSectionClick("skills")}
          >
            <span className="side-menu-link">Skills And Projects</span>
          </li>
        </ul>
      </div>

      <div className="header-left">
        <h1 className="header-title">
          <Link to="/" rel="noopener noreferrer" className="header-link">
            My Portfolio
          </Link>
        </h1>
        <div className="moon-container">
          <button
            className={`dark-mode-toggle ${darkMode ? "active" : ""}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? (
                            <FaSun
                            style={{ color: "white", background: "black" }}
                            className="sun"
                          />
            ) : (
              <FaMoon
              style={{ color: "black", background: "white" }}
              className="moon"
            />
            )}
          </button>
        </div>
      </div>
      <div className="header-right">
        <ul className="header-nav">
          <li className="header-nav-item">
            <Link
              to="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="header-link"
            >
              Github
            </Link>
          </li>
          <li className="header-nav-item">
            <Link
              to="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="header-link"
            >
              LinkedIn
            </Link>
          </li>
          <li className="header-nav-item">
            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="header-link"
            >
              Instagram
            </Link>
          </li>
          <li
            className={`sections-container ${
              isSectionsMenuVisible ? "active" : ""
            }`}
            onClick={toggleSectionsMenu}
            ref={sectionsRef}
          >
            <span className="sections-trigger header-nav-item">Sections</span>
            <div className="sections-dropdown">
              <ul className="sections-menu">
                <li
                  className="sections-menu-item"
                  onClick={() => handleSectionClick("presentation")}
                >
                  <span className="sections-link">Presentation</span>
                </li>
                <li
                  className="sections-menu-item"
                  onClick={() => handleSectionClick("about-me")}
                >
                  <span className="sections-link">About Me</span>
                </li>
                <li
                  className="sections-menu-item"
                  onClick={() => handleSectionClick("skills")}
                >
                  <span className="sections-link">Skills</span>
                </li>
                <li
                  className="sections-menu-item"
                  onClick={() => handleSectionClick("projects")}
                >
                  <span className="sections-link">Projects</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
