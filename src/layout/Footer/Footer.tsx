import { useEffect, useRef } from "react";
import "./css/style.css";
import videoMp4 from "../../assets/video/logo.mp4";
import videoWebm from "../../assets/video/logo.webm";
// Расширение типов для pip
declare module "react" {
  interface VideoHTMLAttributes<T> extends HTMLAttributes<T> {
    pip?: string | boolean;
  }
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentYear = new Date().getFullYear();

  const isReversingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  const reverseSpeedRef = useRef(1.5);

  const links = {
    services: [
      { name: "Лендинг", href: "/services/landings" },
      { name: "Корпаративный сайт", href: "/services/corporate" },
      { name: "Интернет магазины", href: "/services/ecommerce" },
      { name: "Умные чат-боты ", href: "/services/chat-bots" },
      { name: "Разработка моб. приложений", href: "/services/mobile-app" },
      { name: "Дизайн", href: "/services/design" },
      { name: "DIGITAL - маркетинг", href: "/services/marketing" },
    ],
    company: [
      { name: "О компании", href: "/company" },
      { name: "Наша команда", href: "/developers" },
      { name: "Акции", href: "/stocks" },
      { name: "Контакты", href: "/contact" },
    ],
    legal: [
      { name: "Политика конфиденциальности", href: "/soglasie-obrabotka-pers-dannih" },
      { name: "Пользовательское соглашение", href: "#" },
    ],
  };

  // const socialLinks = [
  //   { icon: Facebook, href: "#", label: "Facebook" },
  //   { icon: Instagram, href: "#", label: "Instagram" },
  //   { icon: Linkedin, href: "#", label: "LinkedIn" },
  //   { icon: Twitter, href: "#", label: "Twitter" },
  // ];

  // // IntersectionObserver
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setIsVisible(true);
  //         if (sectionRef.current) observer.unobserve(sectionRef.current);
  //       }
  //     },
  //     { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
  //   );

  //   if (sectionRef.current) observer.observe(sectionRef.current);
  //   return () => observer.disconnect();
  // }, []);

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
      const dt = (now - lastTsRef.current) / 1000;
      lastTsRef.current = now;

      const delta = dt * reverseSpeedRef.current;
      const target = Math.max(0, video.currentTime - delta);

      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);

        if (!isReversingRef.current) return;

        if (target <= 0.0005) {
          isReversingRef.current = false;
          rafIdRef.current = null;
          setTimeout(() => video.play().catch(() => {}), 0);
          return;
        }

        rafIdRef.current = requestAnimationFrame(step);
      };

      video.addEventListener("seeked", onSeeked, { once: true });

      if (typeof (video as any).fastSeek === "function") {
        (video as any).fastSeek(target);
      } else {
        video.currentTime = target;
      }
    };

    step();
  };

  const stopReverse = () => {
    isReversingRef.current = false;
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onEnded = () => startReverse();
    const onPlay = () => stopReverse();

    v.addEventListener("ended", onEnded);
    v.addEventListener("play", onPlay);

    return () => {
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("play", onPlay);
      stopReverse();
    };
  }, []);

  return (
    <footer className="footer" ref={sectionRef}>
      <div className="footer__background">
        <div className="footer__container">
          <div className="footer__content">
            {/* Logo Section with Video */}
            <div className="footer__logo-section">
              <a href="/" className={`footer__logo-link`}>
                <video
                  ref={videoRef}
                  className="footer__logo-video"
                  autoPlay
                  muted
                  loop={false}
                  pip={"false"}
                  playsInline
                  preload="auto"
                >
                  {/* Замените на ваши реальные пути к видео */}
                  <source src={videoMp4} type="video/webm" />
                  <source src={videoWebm} type="video/mp4" />
                  {/* Fallback текст если видео не загрузится */}
                  Аналитический Центр Развития
                </video>
              </a>
            </div>

            {/* Main Footer Content */}
            <div className="footer__main-content">
              <div className="footer__grid">
                {/* Company Info */}
                <div className="footer__company-info">
                  <div className="footer__company-name">
                    Аналитический Центр Развития
                  </div>
                  <p className="footer__company-description">
                    Мы развиваем бизнес с помощью digital-инструментов
                  </p>
                  {/* <div className="footer__social-links">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          aria-label={social.label}
                          className="footer__social-link"
                        >
                          <Icon className="footer__social-icon" />
                        </a>
                      );
                    })}
                  </div> */}
                </div>

                {/* Services */}
                <div className="footer__section">
                  <h3 className="footer__section-title">Услуги</h3>
                  <ul className="footer__links">
                    {links.services.map((link, index) => (
                      <li key={index} className="footer__link-item">
                        <a href={link.href} className="footer__link">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div className="footer__section">
                  <h3 className="footer__section-title">Компания</h3>
                  <ul className="footer__links">
                    {links.company.map((link, index) => (
                      <li key={index} className="footer__link-item">
                        <a href={link.href} className="footer__link">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="footer__section">
                  <h3 className="footer__section-title">Контакты</h3>
                  <ul className="footer__contact-info">
                    <li className="footer__contact-item">
                      <a
                        href="tel:+79656966565"
                        className="footer__contact-link"
                      >
                        +7 (965) 696-65-65
                      </a>
                    </li>
                    <li className="footer__contact-item">
                      <a
                        href="mailto:acr-agency@yandex.ru"
                        className="footer__contact-link"
                      >
                        acr-agency@yandex.ru
                      </a>
                    </li>
                    <li className="footer__contact-item">
                      <a
                        className="footer__contact-link"
                        href="https://yandex.ru/maps/195/ulyanovsk/?ll=48.370973%2C54.333762&mode=whatshere&whatshere%5Bpoint%5D=48.370999%2C54.333752&whatshere%5Bzoom%5D=17&z=17"
                      >
                        Россия, г. Ульяновск, Район Северный, Ул. Чайковского
                        д.1
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer__bottom">
              <div className="footer__bottom-content">
                <p className="footer__copyright">
                  © {currentYear} Аналитический Центр Развития. Все права
                  защищены.
                </p>
                <div className="footer__legal-links">
                  {links.legal.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="footer__legal-link"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
