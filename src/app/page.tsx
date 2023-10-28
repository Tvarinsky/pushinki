import React, { useState, useEffect } from 'react';
import Button from "../Components/Button/button";
import Header from "../Components/Header/header";
import styles from "./page.module.scss";

export default function Home() {
  const toys = [
    { name: 'Цыплёнок', price: '1.000 ₽', videoSrc: 'cypa.mov' },
    { name: 'Медвежонок', price: '1.500 ₽', videoSrc: 'bear.mov' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % toys.length);
    }, 15000);  // 15 секунд в миллисекундах

    return () => clearInterval(intervalId);
  }, []);

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
                    {toys[activeIndex].name} <div className={styles.price}>{toys[activeIndex].price}</div>
                  </div>
                  <Button className="" size="large" type="primary">
                    {"→"}
                  </Button>
                </h4>
              </div>
              <div className={styles.videoContainer}>
                <video src={toys[activeIndex].videoSrc} muted autoPlay loop></video>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.catalog}>
          <div className={styles.content}></div>
        </div>
      </div>
    </main>
  );
}
