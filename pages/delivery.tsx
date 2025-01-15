import React, { useState, useEffect } from "react";
import styles from "../src/app/page.module.scss";
import Button from "./Components/Button/button";
import Header from "./Components/Header/header";
import YouMightLike from "./Components/YouMightLike/YouMightLike";

export default function Delivery() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("products.json");
        const data = await response.json();
        setProducts(data.sort(() => 0.5 - Math.random()).splice(11));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className={styles.container}>
        <Header />
        <div className={styles.contactPage}>
          <h1>🚚 Доставка</h1>
          <p>
            Мы заботимся о том, чтобы вы получили любимые "Пушинки" быстро,
            удобно и безопасно.
            <br />
            Для этого мы сотрудничаем с компанией СДЭК, которая обеспечивает
            надежную доставку по всей территории России.
          </p>
          <hr />
          <h3>Условия доставки</h3>
          <ol>
            <li>Курьерская доставка</li>
            <ul>
              <li>Ваш заказ будет доставлен прямо до двери</li>
              <li>
                Стоимость рассчитывается по тарифам компании СДЭК в зависимости
                от региона и веса посылки
              </li>
            </ul><br />

            <li>Самовывоз из пункта выдачи</li>
            <ul>
              <li>
                Заберите свой заказ в удобное для вас время из ближайшего пункта
                выдачи СДЭК
              </li>
            </ul>
          </ol>
          <h2 style={{ marginTop: "50px" }}>⭐ Бесплатная доставка</h2>
          <p>
            Мы предлагаем бесплатную доставку по всей территории России при
            <br />
            заказе на сумму от 5 000 рублей. Это отличный повод порадовать себя
            <br />
            или близких большим количеством наших игрушек!
          </p>
          <hr />
          <h2>❔ Возникли вопросы?</h2>
          <p>
            Если у вас остались вопросы по доставке, свяжитесь с нами через:
          </p>
          <p>
            Электронную почту: support@пушинки.рф
          </p>
          <p>Телефон: +7 (123) 456-78-90</p>
          <p>
            Мы всегда рады помочь! Ваши "Пушинки" уже готовы отправиться в путь,
            чтобы подарить вам радость и уют! 🌟
          </p>
        </div>

        <YouMightLike products={products} />
      </div>
    </main>
  );
}
