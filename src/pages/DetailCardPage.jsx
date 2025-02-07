import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import products from '../data/products';
import Button from '../components/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import FloatingChat from '../components/FloatingChat';
import '../styles/DetailCardPage.css';

function DetailCardPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Busca el producto en la lista de productos usando el ID
  useEffect(() => {
    const foundProduct = products.find((item) => item.id === Number(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="not-found"
      >
        Producto no encontrado
      </motion.div>
    );
  }

  const handleButtonClick = () => {
    window.open(product.link, "_blank", "noopener,noreferrer");
  };

  // Navegación del carrusel
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
      className="detail-card"
    >
      <div className="carousel-container">
        <motion.button 
          className="carousel-button left-button" 
          onClick={goToPreviousImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft />
        </motion.button>

        <div className="carousel-slide">
          {product.images && product.images.length > 0 ? (
            <motion.div
              key={currentImageIndex}
              className="image-slide"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - ${currentImageIndex}`}
                className="product-image"
              />
            </motion.div>
          ) : (
            <p>No hay imágenes disponibles</p>
          )}
        </div>

        <motion.button 
          className="carousel-button right-button" 
          onClick={goToNextImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowRight />
        </motion.button>
      </div>

      <motion.div 
        className="product-details" 
        style={{ boxShadow: product.boxShadow }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <Button text="Link" onClick={handleButtonClick} />
      </motion.div>
      <FloatingChat/>
    </motion.div>
  );
}

export default DetailCardPage;

