"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Technologies.module.css";
import { tools } from "./tools";
import GradientHeadingLite from "../../components/GradientHeading/GradientHeading";

export function TechnologiesLayout() {
  const [, setSlidesToShow] = useState(6);
  const sliderRef1 = useRef<HTMLDivElement>(null);
  const sliderRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(4);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(5);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(6);
      } else {
        setSlidesToShow(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const row1Tools = [...tools, ...tools, ...tools];
  const row2Tools = [...tools, ...tools, ...tools].reverse();

  return (
    <div className={styles.slider}>
      <div className="container">
        <GradientHeadingLite
          as="p"
          className="h2"
          blueBoost={1}
          baseAngle={45}
        >
          технологии
        </GradientHeadingLite>
      </div>

      <div className={styles["slider-row"]}>
        <div className={styles["slider-track"]} ref={sliderRef1}>
          <div className={`${styles["slider-inner"]} ${styles["slide-right"]}`}>
            {[...row1Tools, ...row1Tools].map((tool, index) => (
              <div
                key={`row1-${tool.id}-${index}`}
                className={styles["slider-item"]}
              >
                <img
                  className={styles["tool-image"]}
                  src={tool.img}
                  alt={tool.title}
                />
                <span className={styles["tool-name"]}>{tool.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles["slider-row"]}>
        <div className={styles["slider-track"]} ref={sliderRef2}>
          <div className={`${styles["slider-inner"]} ${styles["slide-left"]}`}>
            {[...row2Tools, ...row2Tools].map((tool, index) => (
              <div
                key={`row2-${tool.id}-${index}`}
                className={styles["slider-item"]}
              >
                <img
                  className={styles["tool-image"]}
                  src={tool.img}
                  alt={tool.title}
                />
                <span className={styles["tool-name"]}>{tool.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
