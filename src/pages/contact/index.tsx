import { FooterLayout } from "../../layout/Footer/Footer";
import { HeaderLayout } from "../../layout/Header/Header";
import styles from "../CompanyPage.module.css";

import "./css/style.css";
export default function Contact() {
  return (
    <>
      <div>
        <HeaderLayout />
        <section className="contact">
          <div className="container">
            <div
              className={`${styles["contacts-sectio"]  }  ${styles["visible"]}`}
            >
              <h3 className={styles["section-title"]}>контакты</h3>
              <div className={styles["contacts-grid"]}>
                <div className={styles["contact-item"]}>
                  <div className={styles["contact-info"]}>
                    <h4>Email</h4>
                    <p>acr-agency@yandex.ru</p>
                  </div>
                </div>
                <div className={styles["contact-item"]}>
                  <div className={styles["contact-info"]}>
                    <h4>Телефон</h4>
                    <p>+7 (905) 349-14-49</p>
                  </div>
                </div>
                <div className={styles["contact-item"]}>
                  <div className={styles["contact-info"]}>
                    <h4>Время работы</h4>
                    <p>Пн-Пт: 9:00 - 18:00</p>
                  </div>
                </div>
                <div className={styles["contact-item"]}>
                  <div className={styles["contact-info"]}>
                    <h4>Адрес</h4>
                    <p>г. Ульяновск, ул. Чайковского, д. 1</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${styles["map-section"]} ${styles["visible"] }`}
            >
              <h3 className={styles["section-title"]}>мы находимся</h3>
              <div className={styles["map-container"]}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A148b4d8d414a5d6710d30e4ed0cd3105f6c07ae2a085ef7f991f8776be183475&amp;source=constructor"
                  className={styles["map"]}
                  title="Карта расположения компании"
                  loading="lazy"
                  width="100%"
                  height="400"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        <FooterLayout />
      </div>
    </>
  );
}
