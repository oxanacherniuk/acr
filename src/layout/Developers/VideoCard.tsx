import { useEffect, useRef, useState } from 'react';
import styles from './Developers.module.css';
import PortfolioArrow from '../../assets/icons/PortfolioArrow';

type VideoCardProps = {
  name: string;
  link: string;
  poster?: string;                  // опционально
  mp4: string;
  webm?: string;
  isDragging: boolean;              // чтобы не автоплейть во время drag
};

export function VideoCard({ name, link, poster, mp4, webm, isDragging }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isIntersecting, setIntersecting] = useState(true);

  // Пауза, когда карточка вне экрана
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (!entry.isIntersecting) {
          el.pause();
          el.currentTime = 0;
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const safePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    // на iOS/Android играет только muted без user-gesture
    v.muted = muted;
    v.play().catch(() => {/* игнорим ошибки автоплея */});
  };

  const handleMouseEnter = () => {
    if (isDragging) return;
    safePlay();
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const handleTouchStart = () => {
    // на мобилках делаем toggle play/pause
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) safePlay();
    else {
      v.pause();
      v.currentTime = 0;
    }
  };

  const toggleMute: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault(); // чтобы не сработал переход по ссылке
    setMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
    // если звук включили — надо «сдёрнуть» play по gesture, чтобы браузер разрешил звук
    if (videoRef.current && !muted) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Если карточка вне экрана — не пытаемся играть
  useEffect(() => {
    if (!isIntersecting) return;
    // ничего не делаем — ховер сам управляет
  }, [isIntersecting]);

  return (
    <div className={styles['developer-card']}>
      {/* Ссылка — основной кликабельный слой */}
      <a
        href={link}
        className={styles['card-link-layer']}
        onDragStart={(e) => e.preventDefault()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
      >
        <video
          ref={videoRef}
          className={styles['developer-video']}
          playsInline
          muted={muted}
          preload="metadata"
          poster={poster}
          pip="false"
          // чтобы браузер не показывал свои контролы
          controls={false}
          // «без кликов по видео» — вся интеракция через ссылку/кнопку
          onDragStart={(e) => e.preventDefault()}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>

        <div className={styles['card-bottom']}>
          <p className={styles['name']}>{name}</p>
          <p className={styles['button-portfolio']}>
            <span>перейти</span>
            <PortfolioArrow />
          </p>
        </div>
      </a>

      {/* Кнопка звука — отдельным слоем СВЕРХУ, вне <a>, чтобы клик не вёл по ссылке */}
      <button
        type="button"
        className={`${styles['mute-btn']} ${muted ? styles['muted'] : styles['unmuted']}`}
        onClick={toggleMute}
        aria-label={muted ? 'Включить звук' : 'Выключить звук'}
      >
        {/* простые SVG-иконки */}
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 10v4h4l5 5V5L9 10H5z" fill="currentColor" opacity="0.7" />
            <path d="M16 8l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 10v4h4l5 5V5L9 10H5z" fill="currentColor" />
            <path d="M19 12a3 3 0 0 0-3-3m3 7a7 7 0 0 0-7-7" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        )}
      </button>
    </div>
  );
}
