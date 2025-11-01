import { useState, useRef, type MouseEvent } from "react";
import styles from "./Discussion.module.css";
import telegramImg from "../../assets/images/telegram.svg";
import whatsappImg from "../../assets/images/whatsap.svg";
import maxImg from "../../assets/images/max color.svg";
import { MoveUp } from "../../components/Motions";
import GradientHeadingLite from "../../components/GradientHeading/GradientHeading";

export function DiscussionLayout() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWhiteBackground, setShowWhiteBackground] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const discussionRef = useRef<HTMLDivElement>(null);

  const handleYesClick = () => {
    setIsAnimating(true);
    setShowWhiteBackground(true);

    if (contentRef.current) {
      contentRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      setIsAccepted(true);
      setIsAnimating(false);
    }, 1000);
  };

  const handleNoHover = (e: MouseEvent<HTMLButtonElement>) => {
    const button = noButtonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const buttonX = rect.left + rect.width / 2;
      const buttonY = rect.top + rect.height / 2;

      const deltaX = mouseX - buttonX;
      const deltaY = mouseY - buttonY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 150;

      if (distance < 80) {
        const angle = Math.atan2(deltaY, deltaX);
        const moveX = Math.cos(angle) * maxDistance;
        const moveY = Math.sin(angle) * maxDistance;

        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    }
  };

  const handleNoLeave = () => {
    if (noButtonRef.current) {
      noButtonRef.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    <div
      ref={discussionRef}
      className={`${styles.discussion} ${isAnimating ? styles["is-animating"] : ""} ${showWhiteBackground ? styles["white-background"] : ""}`}
    >
      <div className="container">
        {isAnimating && (
          <div className={styles["door-animation"]}>
            <div className={styles["door-left"]}></div>
            <div className={styles["door-right"]}></div>
          </div>
        )}

        <div className={styles["discussion-content"]}>
          {!isAccepted ? (
            <div
              ref={contentRef}
              className={styles["initial-content"]}
              style={{ transition: "opacity 0.5s ease" }}
            >
              <MoveUp>
                <GradientHeadingLite
                  track="viewport"
                  lampSize={0.38}
                  intensity={0.1}
                  blueBoost={1}
                  specular={0.1}
                  baseAngle={35}
                  haloScale={0.9}
                  className={styles["discussion-title"]}
                >
                  обсудим ваш проект?
                </GradientHeadingLite>
              </MoveUp>
              <div className={styles["buttons-container"]}>
                <MoveUp opacity={0} delays={0.5}>
                  <button
                    className={styles["yes-button"]}
                    onClick={handleYesClick}
                    disabled={isAnimating}
                  >
                    Да
                  </button>
                </MoveUp>
                <MoveUp opacity={0} delays={1.5}>
                  <button
                    ref={noButtonRef}
                    className={styles["no-button"]}
                    onMouseMove={handleNoHover}
                    onMouseLeave={handleNoLeave}
                    disabled={isAnimating}
                  >
                    Нет
                  </button>
                </MoveUp>
              </div>
            </div>
          ) : (
            <div className={styles["success-content"]}>
              <div className={styles["social-buttons-container"]}>
                <h3 className={styles["connect-title"]}>Связаться</h3>
                <div className={styles["social-buttons"]}>
                  <a 
                    href="https://t.me/KP888_Bot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles["social-button"]}
                  >
                    <img src={telegramImg} alt="Telegram" className={styles["social-icon"]} />
                  </a>
                  <a 
                    href="" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles["social-button"]}
                  >
                    <img src={whatsappImg} alt="WhatsApp" className={styles["social-icon"]} />
                  </a>
                  <a 
                    href="" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles["social-button"]}
                  >
                    <img src={maxImg} alt="Max" className={styles["social-icon"]} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}