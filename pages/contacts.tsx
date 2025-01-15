import React, { useState, useEffect } from "react";
import styles from "../src/app/page.module.scss";
import Button from "./Components/Button/button";
import Header from "./Components/Header/header";
import YouMightLike from "./Components/YouMightLike/YouMightLike";

export default function Contacts() {
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
          <h1>👋 Контакты</h1>
          <p>
            Мы всегда рады вашим вопросам, предложениям и отзывам.
            <br />
            Свяжитесь с нами удобным для вас способом, и мы с удовольствием
            поможем! 💖
          </p>
          <hr />
          <h2>Как с нами связаться?</h2>
          <ol>
            <li>
              Напишите нам по адресу support@пушинки.рф, и мы ответим вам в
              течение 24 часов
            </li><br />
            <li>
              Позвоните нам по номеру: +7 (123) 456-78-90
              <br />
              График работы: с 10:00 до 18:00 (по московскому времени), с
              понедельника по пятницу.
            </li><br />
            <li>Социальные сети
              <ul>
                <li>Instagram</li>
                <li>Telegram</li>
                <li>ВКонтакте</li>
              </ul>
            </li>
          </ol>
        </div>

        <YouMightLike products={products} />
      </div>
    </main>
  );
}
