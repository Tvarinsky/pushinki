import React, { useState } from "react";
import styles from "./Catalog.module.scss";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images: string[];
}

interface CatalogProps {
  products: Product[];
}

const Catalog: React.FC<CatalogProps> = ({ products }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  const handleImageHover = (
    productIndex: number,
    percentage: number,
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const containerRect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!containerRect) return;
  
    const totalImages = products[productIndex].images.length;
    const indexToShow = Math.floor((percentage / 100) * totalImages);
  
    const clampedIndex = Math.max(0, Math.min(indexToShow, totalImages - 1));
  
    setHoveredIndex(clampedIndex);
  };
  

  return (
    <div className={styles.catalog}>
      <h2 className={styles.title}>Наши пушинки</h2>
      <div className={styles.content}>
        {products.map((product, productIndex) => (
          <div key={product.id} className={styles.productItem}>
            <div className={styles.imageContainer}>
              {product.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={product.name}
                  className={hoveredIndex === imageIndex ? styles.active : ""}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const containerRect = e.currentTarget.parentElement?.getBoundingClientRect();
                    if (!containerRect) return;
                  
                    const percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;
                  
                    handleImageHover(productIndex, percentage, e);
                  }}               
                />
              ))}
              <div className={styles.overlay}>
                {Array.from({ length: product.images.length }, (_, index) => (
                  <div
                    key={index}
                    className={`${styles.overlayItem} ${
                      hoveredIndex === index ? styles.activeOverlay : ""
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            <h3>
              {product.name}{" "}
              <div className={styles.price}>{product.price} ₽</div>
            </h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
