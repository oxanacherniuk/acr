import styles from "./Footer.module.css";
import { useEffect, useRef, useState } from "react";
import logoWebm from "../../assets/video/logo.webm";
import logoMp4 from "../../assets/video/logo.mp4";
// Расширение типов для pip (как у тебя)
declare module "react" {
  interface VideoHTMLAttributes<T> extends HTMLAttributes<T> {
    pip?: string | boolean;
  }
}

export function FooterLayout() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isReversingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  // 1.0 = как вперёд в реальном времени, можно 0.8..1.2
  const reverseSpeedRef = useRef(1.5);
  // Порог FPS для шага назад (сколько секунд отнимать за кадр)

  // IntersectionObserver — как у тебя
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Функция запуска обратного «проигрывания»
  const startReverse = () => {
    const video = videoRef.current;
    if (!video || isReversingRef.current) return;

    isReversingRef.current = true;
    video.pause();
    lastTsRef.current = performance.now();

    const step = () => {
      if (!isReversingRef.current || !video) return;

      const now = performance.now();
      const dt = (now - lastTsRef.current) / 1000; // сек
      lastTsRef.current = now;

      // на сколько секунд отматываем за этот «кадр»
      const delta = dt * reverseSpeedRef.current;
      const target = Math.max(0, video.currentTime - delta);

      // делаем один seek и ЖДЁМ 'seeked' прежде чем продолжить
      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);

        if (!isReversingRef.current) return;

        if (target <= 0.0005) {
          // мягко врубить вперёд
          isReversingRef.current = false;
          rafIdRef.current = null;
          // microtask, чтобы дать декодеру выдохнуть
          setTimeout(() => video.play().catch(() => {}), 0);
          return;
        }

        rafIdRef.current = requestAnimationFrame(step);
      };

      video.addEventListener("seeked", onSeeked, { once: true });

      // fastSeek даёт более стабильные прыжки между ближайшими ключевыми кадрами
      if (typeof (video as any).fastSeek === "function") {
        (video as any).fastSeek(target);
      } else {
        video.currentTime = target;
      }
    };

    step();
  };
  // Безопасная остановка rAF (на всякий случай)
  const stopReverse = () => {
    isReversingRef.current = false;
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  // подписки
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onEnded = () => startReverse();
    const onPlay = () => stopReverse(); // если кто-то нажал play вручную

    v.addEventListener("ended", onEnded);
    v.addEventListener("play", onPlay);

    return () => {
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("play", onPlay);
      stopReverse();
    };
  }, []);

  return (
    <div className={styles["footer"]} ref={sectionRef}>
      <div className="container">
        <div className={styles["footer-content"]}>
          <a
            href="/"
            className={`${styles["logo-link"]} ${isVisible ? styles["animate-logo"] : ""}`}
          >
            <video
              ref={videoRef}
              className={styles["logo-img"]}
              autoPlay
              muted
              loop={false} // важный момент — цикл делаем сами
              pip={"false"}
              playsInline
              preload="auto"
            >
              {/* Важно: укажи реально разные файлы по форматам */}
              <source src={logoWebm} type="video/webm" />
              <source src={logoMp4} type="video/mp4" />
            </video>
          </a>

          <div
            className={`${styles["footer-box"]} ${isVisible ? styles["animate-content"] : ""}`}
          >
            <div className={styles["footer-box__col"]}>
              <ul className={styles["col-address"]}>
                <li
                  className={`${styles["address"]} ${isVisible ? styles["animate-item-1"] : ""}`}
                >
                  Россия, г. Ульяновск
                </li>
                <li
                  className={`${styles["address"]} ${isVisible ? styles["animate-item-2"] : ""}`}
                >
                  Район Северный
                </li>
                <li
                  className={`${styles["address"]} ${isVisible ? styles["animate-item-3"] : ""}`}
                >
                  Ул. Чайковского д.1
                </li>
              </ul>
            </div>

            <div className={styles["footer-box__col"]}>
              <ul className={styles["footer-links"]}>
                <li
                  className={`${styles["footer-link"]} ${isVisible ? styles["animate-item-4"] : ""}`}
                >
                  <a href="/services">Услуги</a>
                </li>
                <li
                  className={`${styles["footer-link"]} ${isVisible ? styles["animate-item-5"] : ""}`}
                >
                  <a href="/developers">Разработчики</a>
                </li>
                <li
                  className={`${styles["footer-link"]} ${isVisible ? styles["animate-item-6"] : ""}`}
                >
                  <a href="/soglasie-obrabotka-pers-dannih">
                    Политика конфиденциальности
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles["footer-box__col"]}>
              <p
                className={`${styles["footer-subtext"]} ${isVisible ? styles["animate-subtext"] : ""}`}
              >
                ⓒ 2025 АЦР
              </p>
              <p
                className={`${styles["footer-link"]} ${isVisible ? styles["animate-subtext"] : ""}`}
              >
                <a href="/contact">Контакты</a>
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
