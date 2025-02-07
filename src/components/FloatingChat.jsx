import React, { useState } from 'react';
import { IoCloseCircleOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion'; // Importa motion y AnimatePresence
import Button from '../components/Button';
import '../styles/FloatingChat.css';

function FloatingChat() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animación para el modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Estado inicial (invisible)
    visible: { opacity: 1, scale: 1 }, // Estado final (visible)
  };

  return (
    <>
      {/* Globo flotante */}
      <div className="floating-bubble" onClick={() => setIsModalOpen(true)}>
        <IoChatbubbleEllipsesOutline />
      </div>

      {/* Modal con animación */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            onClick={() => setIsModalOpen(false)}
            initial={{ opacity: 0 }} // Estado inicial del overlay
            animate={{ opacity: 1 }} // Estado final del overlay
            exit={{ opacity: 0 }} // Animación al cerrar
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants} // Variantes de animación
              initial="hidden" // Estado inicial
              animate="visible" // Estado final
              exit="hidden" // Animación al cerrar
            >
              <h2>Contacto</h2>
              <p>Enviame un mensaje</p>
              <a href="mailto:tuemail@gmail.com">
                <Button text="Enviar Correo" />
              </a>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                <IoCloseCircleOutline />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingChat;