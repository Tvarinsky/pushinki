// ProductCard.tsx

import React, { useState } from "react";
import styles from "./ProductCard.module.scss";
import Button from "../Button/button";

interface ProductCardProps {
  product: any;
  onClose: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productCarousel}>
        <div className={styles.productMainImage}>
          <img src={product.images[activeImageIndex]} alt="" />
        </div>
        <div className={styles.productCarouselImg}>
          {product.images.length > 1 &&
            product.images.map((item: string, index: number) => (
              <img
                key={index}
                className={`${styles.imagesCarousel} ${
                  activeImageIndex === index ? styles.activeThumbnail : ""
                }`}
                src={item}
                alt=""
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
        </div>
      </div>
      <div className={styles.rightSide}>
        <button className={styles.close} onClick={onClose}>
          ❌
        </button>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <hr style={{ border: "1px solid #eee" }} />

        <p>
          <b>Особенности</b>
        </p>
        <span className={styles.label}>🤲 Ручная работа</span>
        <span className={styles.label}>🌿 Гипоалергенно</span>
        <span className={styles.label}>🎁 Подарочная упаковка</span>

        <p>
          <b>Размеры</b>
        </p>
        <span className={styles.label}>📏 Высота: 20 см</span>
        <span className={styles.label}>📐 Ширина: 15 см</span>

        <Button className="main" size="large" type="primary">
          {`Добавить в корзину за ${product.price} ₽`}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
