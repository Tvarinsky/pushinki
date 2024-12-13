import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useCart } from "../../Context/CartContext";
import styles from "./Cart.module.scss";
import Checkout from "../Checkout/Checkout";
import Button from "../Button/button";

interface OverlayProps {
  isOpen: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const moveIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const moveOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  cursor: pointer;
`;

interface CartContainerProps {
  isOpen: boolean;
}

const CartContainer = styled.div<CartContainerProps>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-350px")};
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  width: 300px;
  height: 100%;
  padding: 20px;
  background: white;
  z-index: 11;
  animation: ${({ isOpen }) => (isOpen ? moveIn : moveOut)} 0.3s ease-in-out,
    ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.3s ease-in-out;
`;

const Cart = () => {
  const { cartState, isCartOpen, setCartOpen, dispatch } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCartOpen(false);
  };

  const calculateTotalCost = () => {
    return cartState.items.reduce(
      (total, item) => total + item.price * (item.quantity || 0),
      0
    );
  };

  const removeCartItem = (itemId: number) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id: itemId,
      },
    });
  };

  const handleQuantityChange = (itemId: number, change: number) => {
    // @ts-ignore
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: itemId,
        quantity: Math.max(
          // @ts-ignore
          cartState.items.find((item) => item.id === itemId)?.quantity + 1 || 0,
          1
        ),
      },
    });
  };

  const handleQuantityChangeMinus = (itemId: number, change: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: itemId,
        quantity: Math.max(
          // @ts-ignore
          cartState.items.find((item) => item.id === itemId)?.quantity - 1 || 0,
          1
        ),
      },
    });

    if (cartState.items.find((item) => item.id === itemId)?.quantity === 1) {
      removeCartItem(itemId);
    }
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setShowCheckout(true);
  };

  return (
    <>
      <Overlay onClick={handleOverlayClick} isOpen={isCartOpen} />
      <CartContainer
        id="cart-container"
        className={styles.cartContainer}
        isOpen={isCartOpen}
      >
        <h2 className={styles.title}>Корзина</h2>
        <div className={styles.items}>
          {!cartState.items.length && (
            <>
              <h2 className={styles.sadCart}>😢</h2>
              <p className={styles.emptyCart}>Кажется тут совсем пусто</p>
              <Button onClick={() => setCartOpen(false)} className={styles.cartBtn} size="large" type="primary">
                {"Продолжить покупки"}
              </Button>
            </>
          )}
          {cartState.items.map((item) => (
            <div className={styles.item} key={item.id}>
              <div className={styles.leftCart}>
                <img src={item.image} alt="" />
              </div>
              <div className={styles.rightCart}>
                <h4>
                  {item.name} <span>{item.price} ₽</span>
                </h4>
                <span className={styles.quantityL}>Количество</span>
                <div className={styles.quantity}>
                  <button
                    onClick={() =>
                      handleQuantityChangeMinus(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!!cartState.items.length && (
          <div className={styles.total}>
            <p>
              Общая стоимость: <b>{calculateTotalCost()} ₽</b>
            </p>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Оформить заказ
            </button>
          </div>
        )}
      </CartContainer>
      {showCheckout && <Checkout />}
    </>
  );
};

export default Cart;
