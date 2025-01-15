import React, { useState } from "react";
import styles from "./YouMightLike.module.scss";
import ProductCard from "../ProductCard/ProductCard";

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

const YouMightLike: React.FC<CatalogProps> = ({ products }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    } else {
      console.warn(`Продукт с ID ${productId} не найден.`);
    }
  };

  const closeProductCard = () => {
    setSelectedProduct(null);
  };

  const handleImageHover = (
    productIndex: number,
    percentage: number,
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const product = products[productIndex];
    if (!product || !product.images || product.images.length === 0) return;

    const containerRect =
      e.currentTarget.parentElement?.getBoundingClientRect();
    if (!containerRect) return;

    const totalImages = product.images.length;
    const indexToShow = Math.floor((percentage / 100) * totalImages);

    const clampedIndex = Math.max(0, Math.min(indexToShow, totalImages - 1));

    const images = e.currentTarget.parentElement?.getElementsByTagName("img");
    if (images) {
      Array.from(images).forEach((img, i) => {
        img.classList.remove(styles.active);
        if (i !== clampedIndex) {
          img.style.display = "none";
        }
      });

      images[clampedIndex].classList.add(styles.active);
      images[clampedIndex].style.display = "block";
    }

    setHoveredIndex(clampedIndex);
  };

  return (
    <div id="catalogBlock" className={styles.catalog}>
      <h2 className={styles.title}>Вам может понравиться</h2>
      <div className={styles.content}>
        {products?.length > 0 ? (
          products.map((product, productIndex) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className={styles.productItem}
            >
              <div className={styles.imageContainer}>
                {product.images?.map((image, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={image}
                    alt={product.name || "Изображение"}
                    onMouseMove={(e) => {
                      const containerRect =
                        e.currentTarget.parentElement?.getBoundingClientRect();
                      if (!containerRect) return;

                      const percentage =
                        ((e.clientX - containerRect.left) /
                          containerRect.width) *
                        100;

                      handleImageHover(productIndex, percentage, e);
                    }}
                  />
                ))}
                <div className={styles.overlay}>
                  {Array.from(
                    { length: product.images?.length || 0 },
                    (_, index) => (
                      <div
                        key={index}
                        className={`${styles.overlayItem} ${
                          hoveredIndex === index ? styles.activeOverlay : ""
                        }`}
                      ></div>
                    )
                  )}
                </div>
                <div className={styles.hoverIcon}>
                  <span className={styles.arrow}></span>
                </div>
              </div>
              <h3>
                {product.name}{" "}
                <div className={styles.price}>{product.price} ₽</div>
              </h3>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>Нет товаров для отображения</p>
        )}
      </div>

      {selectedProduct && (
        <>
          <div
            onClick={closeProductCard}
            className={`${styles.modalOverlay} ${styles.visible}`}
          ></div>

          <div
            className={`${styles.modal} ${styles.visible}`}
            onClick={closeProductCard}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <ProductCard
                product={selectedProduct}
                onClose={closeProductCard}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default YouMightLike;
