import React, { useState } from "react";
import styles from "./ProductCard.module.scss";
import Button from "../Button/button";
import { useCart } from "../../../Context/CartContext";

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

  if (!product || !product.images || product.images.length === 0) {
    return (
      <div className={styles.productCard}>
        <p>Продукт недоступен или данные отсутствуют.</p>
        <button onClick={onClose} className={styles.close}>
          Закрыть
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product || !product.name || !product.price) {
      console.error(
        "Невозможно добавить продукт в корзину: данные отсутствуют."
      );
      return;
    }

    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };

    dispatch({ type: "ADD_ITEM", payload: newItem });
    setCartOpen(true);
    onClose();
  };

  const handleShare = () => {
    const productUrl = `${window.location.origin}?product=${product.url}`;
    const shareData = {
      title: product.name,
      text: `Посмотри, какая классная игрушка - ${product.name}!`,
      url: productUrl,
    };

    if (navigator.share) {
      // На мобильных устройствах используем Web Share API
      navigator
        .share(shareData)
        .catch((error) =>
          console.error("Ошибка при попытке поделиться:", error)
        );
    } else {
      // На ПК копируем ссылку с текстом
      navigator.clipboard.writeText(`${shareData.text}\n${productUrl}`);
      alert("Ссылка на продукт скопирована в буфер обмена!");
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productCarousel}>
        <div className={styles.productMainImage}>
          {product.images[activeImageIndex] ? (
            <img
              src={product.images[activeImageIndex]}
              alt={product.name || "Изображение"}
            />
          ) : (
            <p>Изображение отсутствует</p>
          )}
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
                alt={product.name || "Миниатюра"}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
        </div>
      </div>
      <div className={styles.rightSide}>
        <button className={styles.close} onClick={onClose}>
          ❌
        </button>
        <h3
          className="sharedContainer"
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          {product.name}
          <Button
            size="large"
            type="primary"
            onClick={handleShare}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="18"
              height="18"
              x="0"
              y="0"
              viewBox="0 0 16 16"
              style={{position: "relative", top: "3px"}}
            >
              <g>
                <path
                  d="M2.41 9.91a3.049 3.049 0 0 0 3.045 3.045h6.429l-1.692 1.691a.5.5 0 1 0 .707.707l2.545-2.544a.501.501 0 0 0 0-.708l-2.545-2.545a.5.5 0 0 0-.707.707l1.692 1.692h-6.43A2.048 2.048 0 0 1 3.41 9.909V7.364a.5.5 0 0 0-1 0zM5.808.646a.5.5 0 0 0-.707 0L2.556 3.192a.501.501 0 0 0 0 .709l2.545 2.544a.5.5 0 0 0 .707-.707L4.116 4.045h6.43a2.048 2.048 0 0 1 2.045 2.046v2.545a.5.5 0 0 0 1 0V6.091a3.049 3.049 0 0 0-3.046-3.046H4.116l1.692-1.691a.5.5 0 0 0 0-.707z"
                  fill="#ffffff"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>{" "}
            Поделиться
          </Button>
        </h3>
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
