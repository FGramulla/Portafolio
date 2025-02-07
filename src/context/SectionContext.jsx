import React, { createContext, useState } from 'react';

export const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('presentation');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionContext.Provider value={{ activeSection, scrollToSection }}>
      {children}
    </SectionContext.Provider>
  );
};