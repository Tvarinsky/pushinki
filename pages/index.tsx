import React, { useState, useEffect } from "react";
import styles from "../src/app/page.module.scss";
import Button from "./Components/Button/button";
import Header from "./Components/Header/header";
import Catalog from "./Components/Catalog/Catalog";

export default function Home() {
  const toys = [
    { name: "Цыплёнок", price: "900 ₽", videoSrc: "cypa.mov" },
    { name: "Медвежонок", price: "1.500 ₽", videoSrc: "bear.mov" },
  ];

  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("products.json");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [products]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setActiveIndex((prevIndex) => (prevIndex + 1) % toys.length);
  //   }, 15000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <main>
      <div className={styles.container}>
        <Header />
        <div className={styles.mainBanner}>
          <div className={styles.content}>
            <span className={styles.label}>Сделано с любовью ❤️</span>
            <h1>
              Милые вязаные игрушки <span>ручной работы</span>
            </h1>
            <Button className="main" size="large" type="primary">
              {"Выбрать игрушку"}
            </Button>
            <div className={styles.bannerImage}>
              <div className={styles.priceLink}>
                <h4>
                  <div>
                    {toys[activeIndex].name}{" "}
                    <div className={styles.price}>
                      {toys[activeIndex].price}
                    </div>
                  </div>
                  <Button className="" size="large" type="primary">
                    {"→"}
                  </Button>
                </h4>
              </div>
              <div className={styles.videoContainer}>
                <video
                  src={toys[activeIndex].videoSrc}
                  muted
                  autoPlay
                  loop
                ></video>
              </div>
            </div>
          </div>
        </div>
        <Catalog products={products} />
      </div>
    </main>
  );
}
