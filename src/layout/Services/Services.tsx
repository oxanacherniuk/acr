import styles from "./Services.module.css";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { websiteTypes } from "./variables";
import { MoveLeft, MoveUp } from "../../components/Motions";
import GradientHeading from "../../components/GradientHeading/GradientHeading";

export function ServicesLayout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState<"websites" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPopupOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  const handleWebAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPopup("websites");
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentPopup(null);
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleWebsiteTypeClick = (link: string) => {
    navigate(link);
    setIsPopupOpen(false);
    setCurrentPopup(null);
  };

  const renderPopupContent = () => {
    switch (currentPopup) {
      case "websites":
        return (
          <>
            <div className={styles["website-types"]}>
              {websiteTypes.map((type, index) => (
                <div
                  key={index}
                  className={styles["website-type-item"]}
                  onClick={() => handleWebsiteTypeClick(type.link)}
                >
                  <div className={styles["website-type-content"]}>
                    <div className={styles["website-type-info"]}>
                      <div className={styles["website-type-header"]}>
                        <h4 className={styles["website-type-title"]}>
                          {type.title}
                        </h4>
                        <span className={styles["website-type-price"]}>
                          {type.price}
                        </span>
                      </div>
                      <p className={styles["website-type-description"]}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <div className={styles["website-type-link"]}>Подробнее →</div>
                </div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles["services"]} ref={sectionRef}>
      <div className="container">
        <div className={styles["services-box"]}>
          <MoveLeft>
             <GradientHeading
  baseAngle={35}
  safeMargin={0.11}
  track="viewport"
  >
   услуги
  </GradientHeading>
           
          </MoveLeft>
          <MoveUp>
            <a
              href="#"
              className={styles["service-link"]}
              onClick={handleWebAppClick}
            >
              <div className={styles["service-item"]}>
                <div className={styles["service-header"]}>
                  <span className={styles["service-subtitle"]}>Услуга</span>
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <h3 className={styles["service-name"]}>РАЗРАБОТКА САЙТОВ</h3>
                <div className={styles["service-content"]}>
                  <div className={styles["service-line"]}></div>
                  <p className={styles["service-description"]}>
                    Разрабатываем веб-приложения c нуля или подключаемся на
                    любой стадии проекта
                  </p>
                </div>
              </div>
            </a>
          </MoveUp>

          <MoveUp>
            <Link to="/services/chat-bots" className={styles["service-link"]}>
              <div className={styles["service-item"]}>
                <div className={styles["service-header"]}>
                  <span className={styles["service-subtitle"]}>Услуга</span>
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <h3 className={styles["service-name"]}>УМНЫЕ ЧАТ-БОТЫ</h3>
                <div className={styles["service-content"]}>
                  <div className={styles["service-line"]}></div>
                  <p className={styles["service-description"]}>
                    Автоматизируем продажи и поддержку 24/7 с помощью
                    интеллектуальных ботов
                  </p>
                </div>
              </div>
            </Link>
          </MoveUp>
          <MoveUp>
            <Link to="/services/ai" className={styles["service-link"]}>
              <div className={styles["service-item"]}>
                <div className={styles["service-header"]}>
                  <span className={styles["service-subtitle"]}>Услуга</span>
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <h3 className={styles["service-name"]}>ВНЕДРЕНИЕ ИИ</h3>
                <div className={styles["service-content"]}>
                  <div className={styles["service-line"]}></div>
                  <p className={styles["service-description"]}>
                    Интегрируем AI-решения для оптимизации процессов и повышения
                    эффективности бизнеса
                  </p>
                </div>
              </div>
            </Link>
          </MoveUp>

          <MoveUp>
            <Link to="/services/mobile-app" className={styles["service-link"]}>
              <div className={styles["service-item"]}>
                <div className={styles["service-header"]}>
                  <span className={styles["service-subtitle"]}>Услуга</span>
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <h3 className={styles["service-name"]}>
                  РАЗРАБОТКА МОБИЛЬНЫХ ПРИЛОЖЕНИЙ
                </h3>
                <div className={styles["service-content"]}>
                  <div className={styles["service-line"]}></div>
                  <p className={styles["service-description"]}>
                    Создаем нативные и кроссплатформенные мобильные приложения
                    для iOS и Android
                  </p>
                </div>
              </div>
            </Link>
          </MoveUp>

          <MoveUp>
            <Link to="/services/design" className={styles["service-link"]}>
              <div className={styles["service-item"]}>
                <div className={styles["service-header"]}>
                  <span className={styles["service-subtitle"]}>Услуга</span>
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <h3 className={styles["service-name"]}>ДИЗАЙН</h3>
                <div className={styles["service-content"]}>
                  <div className={styles["service-line"]}></div>
                  <p className={styles["service-description"]}>
                    Разрабатываем современный и функциональный дизайн для
                    цифровых продуктов и брендов
                  </p>
                </div>
              </div>
            </Link>
          </MoveUp>

          <MoveUp>
            <Link to="/services/marketing" className={styles["service-link"]}>
              <div className={styles["service-item"]}>
                <div className={styles["service-header"]}>
                  <span className={styles["service-subtitle"]}>Услуга</span>
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <h3 className={styles["service-name"]}>DIGITAL-МАРКЕТИНГ</h3>
                <div className={styles["service-content"]}>
                  <div className={styles["service-line"]}></div>
                  <p className={styles["service-description"]}>
                    Привлекаем целевую аудиторию бизнеса, увеличиваем конверсию
                    и повышаем узнаваемость бренда
                  </p>
                </div>
              </div>
            </Link>
          </MoveUp>
        </div>
      </div>
      {isPopupOpen && (
        <div
          className={`${styles["popup-overlay"]} ${isPopupOpen ? styles["popup-overlay-active"] : ""}`}
          onClick={handleClosePopup}
        >
          <div className={styles["popup-content"]} onClick={handlePopupClick}>
            <button
              className={styles["popup-close"]}
              onClick={handleClosePopup}
            >
              ×
            </button>
            <div className={styles["popup-scroll-container"]}>
              {renderPopupContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
