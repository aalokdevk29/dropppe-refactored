import React, { useEffect } from "react";
import styles from "../styles/shopApp.module.css";

export const HeaderConatiner = () => {
  useEffect(() => {
    document.title = "Droppe refactor app"

  }, [])
  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={['container', styles.headerImageWrapper].join(' ')}>
          <img src='./assets/droppe-logo.png' className={styles.headerImage}  alt="logo"/>
        </div>
      </div>
      <React.Fragment>
        <span
          className={['container', styles.main, styles.innerFragment].join(' ')}>
          <img src='./assets/img1.png' className={styles.showImg} alt="image1" />
          <img src='./assets/img2.png' className={styles.showImg} alt="image2"/>
        </span>
      </React.Fragment>
    </React.Fragment>
  );
}