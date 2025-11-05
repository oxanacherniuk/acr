import styles from "./Services.module.css";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { websiteTypes } from "./variables";
import { MoveLeft, MoveUp } from "../../components/Motions";
import GradientHeadingLite from "../../components/GradientHeading/GradientHeading";
import TextEffect from "../../components/HoverText";

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
                  onClick={() => handleWebsiteTypeClick(type.link)}
                  className={styles["service-link"] + " " + styles["website-type-item"]}
                >
                  <div className={styles["service-item"]}>
                    <div className={styles["service-header"]}>
                      <MoveLeft delays={0.5}>
                        <div className={styles["service-arrow"]}>→</div>
                      </MoveLeft>
                    </div>
                    <TextEffect
                      text={type.title}
                      className={styles["service-name"]}
                    />

                    <div className={styles["service-line"]}></div>
                    <div className={styles["service-content"]}>
                      <p className={styles["service-description"]}>
                        {type.description}
                      </p>
                    </div>
                  </div>
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
            <GradientHeadingLite
              as="h2"
              theme="onDark"
              track="element"
              className={"h2"}
            >
              услуги
            </GradientHeadingLite>
          </MoveLeft>

          <MoveUp>
            <a
              href="#"
              className={styles["service-link"]}
              onClick={handleWebAppClick}
            >
              <div className={styles["service-item"]}>
                <div className={styles["service-header"]}>
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <TextEffect
                  text="РАЗРАБОТКА САЙТОВ"
                  className={styles["service-name"]}
                />
                <div className={styles["service-line"]}></div>
                <div className={styles["service-content"]}>
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
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <TextEffect
                  text="УМНЫЕ ЧАТ-БОТЫ"
                  className={styles["service-name"]}
                />

                <div className={styles["service-line"]}></div>
                <div className={styles["service-content"]}>
                  <p className={styles["service-description"]}>
                    Автоматизируем продажи и поддержку 24/7 с помощью
                    интеллектуальных ботов
                  </p>
                </div>
              </div>
            </Link>
          </MoveUp>
          {/* <MoveUp>
            <Link to="/services/ai" className={styles["service-link"]}>
              <div className={styles["service-item"]}>
                <div className={styles["service-header"]}>
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <TextEffect text="ВНЕДРЕНИЕ ИИ" className={styles["service-name"]}/>
                <div className={styles["service-line"]}></div>
                <div className={styles["service-content"]}>
                  <p className={styles["service-description"]}>
                    Интегрируем AI-решения для оптимизации процессов и повышения
                    эффективности бизнеса
                  </p>
                </div>
              </div>
            </Link>
          </MoveUp> */}

          <MoveUp>
            <Link to="/services/mobile-app" className={styles["service-link"]}>
              <div className={styles["service-item"]}>
                <div className={styles["service-header"]}>
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <TextEffect
                  text="РАЗРАБОТКА МОБИЛЬНЫХ ПРИЛОЖЕНИЙ"
                  className={styles["service-name"]}
                />

                <div className={styles["service-line"]}></div>
                <div className={styles["service-content"]}>
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
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <TextEffect text="ДИЗАЙН" className={styles["service-name"]} />

                <div className={styles["service-line"]}></div>
                <div className={styles["service-content"]}>
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
                  <MoveLeft delays={0.5}>
                    <div className={styles["service-arrow"]}>→</div>
                  </MoveLeft>
                </div>
                <TextEffect
                  text="DIGITAL- МАРКЕТИНГ"
                  className={styles["service-name"]}
                />
                <div className={styles["service-line"]}></div>
                <div className={styles["service-content"]}>
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
        >
          <div className={styles["popup-content"]} onClick={handleClosePopup}>
            <button
              className={styles["popup-close"]}
              onClick={handleClosePopup}
            >
              ×
            </button>
            <div
              onClick={handlePopupClick}
              className={styles["popup-scroll-container"]}
            >
              {renderPopupContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
