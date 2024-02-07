import React, { useState } from "react";
import styles from "./ProductCard.module.scss";
import Button from "../Button/button";
import { useCart } from "../../Context/CartContext";

interface ProductCardProps {
  product: any;
  onClose: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { dispatch, setCartOpen, cartState } = useCart();

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);

    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };

    console.log("New Item:", newItem);

    dispatch({ type: "ADD_ITEM", payload: newItem });

    console.log("Cart State after adding:", cartState);

    setCartOpen(true);

    onClose();
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
        <span className={styles.label}>⚖️ Вес игрушки: {product.weight}</span>
        <span className={styles.label}>📐 Размер: {product.size}</span>

        <Button
          className="main"
          size="large"
          type="primary"
          onClick={handleAddToCart}
        >
          {`Добавить в корзину за ${product.price} ₽`}
        </Button>
        <Button className={styles.wishlistButton} size="large" type="secondary">
          <img src="icons/wishlist.svg" alt="" />
        </Button>

        <span className={styles.small}>
          По желанию заказчика цвета игрушки могут быть изменены*
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
