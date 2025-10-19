import { useState } from "react";
import styles from "./Portfolio.module.css";
import { sites } from "./sites";
import GradientHeadingLite from "../../components/GradientHeading/GradientHeading";

export function PortfolioLayout() {
  const [showAll, setShowAll] = useState(false);

  const displayedSites = showAll ? sites : sites.slice(0, 3);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={styles["portfolio"]}>
      <div className="container">
        <GradientHeadingLite
          as="p"
          className={styles["portfolio-title"]}
          blueBoost={20}
          track="viewport"
          baseAngle={25}
        >
          выполненные проекты
        </GradientHeadingLite>
        <div className={styles["portfolio-box"]}>
          {displayedSites.map((site) => (
            <div key={site.id} className={styles["portfolio-card"]}>
              <div className={styles["portfolio-image-container"]}>
                <img
                  className={styles["portfolio-image"]}
                  src={site.image}
                  alt={`Сайт ${site.name}`}
                />
              </div>
              <p className={styles["portfolio-name"]}>
                Исполнитель: {site.name}
              </p>
            </div>
          ))}
        </div>
        {sites.length > 3 && (
          <div>
            <button
              className={styles["portfolio-button"]}
              onClick={toggleShowAll}
            >
              {showAll ? "свернуть все" : "показать больше"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
