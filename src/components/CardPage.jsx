import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/CardPage.css";
import products from '../data/products.js'; // Asegúrate de que la ruta es correcta

function CardPage() {
  return (
    <div className="card-container">
      {/* Iteramos sobre los productos para renderizarlos */}
      {products.map((product) => (
        <div className="card" key={product.id}>
          <Link to={`/detail/${product.id}`} className="card-link">
            <div className="card-image-container">
              {/* Mostrar solo la primera imagen */}
              <img 
                src={product.images[0]} 
                className="card-image" 
              />
              <div className="card-overlay">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-subtitle">ver mas</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CardPage;
