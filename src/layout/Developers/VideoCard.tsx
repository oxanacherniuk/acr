import { useEffect, useRef, useState } from 'react';
import styles from './Developers.module.css';
import PortfolioArrow from '../../assets/icons/PortfolioArrow';

type VideoCardProps = {
  name: string;
  link: string;
  poster: string | undefined;
  mp4: string;
  webm: string | undefined;
  isDragging: boolean;
  isActive: boolean;
  isMobile: boolean;
};

export function VideoCard({ name, link, poster, mp4, webm, isDragging, isActive, isMobile }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isIntersecting, setIntersecting] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Управление воспроизведением - упрощенная логика
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const shouldPlay = isActive && isIntersecting && (isMobile || isHovered);

    if (shouldPlay) {
      el.muted = muted;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasPlayed(true);
          })
          .catch(() => {
            // Игнорируем ошибки автоплея
          });
      }
    } else {
      // Пауза только если видео уже играло
      if (hasPlayed) {
        el.pause();
      }
    }
  }, [isActive, isIntersecting, isHovered, isMobile, muted, hasPlayed]);

  // Intersection Observer
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5 } // увеличиваем порог для лучшей стабильности
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Сбрасываем hasPlayed при смене активности
  useEffect(() => {
    if (!isActive) {
      setHasPlayed(false);
    }
  }, [isActive]);

  // Обработчики ховера только для десктопа
  const handleMouseEnter = () => {
    if (isMobile || isDragging || !isActive) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
  };

  const toggleMute: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setMuted((m) => !m);
  };

  // Определяем классы
  const getCardClass = () => {
    return `${styles['developer-card']} ${isActive ? styles['active'] : ''}`;
  };

  const getVideoClass = () => {
    return `${styles['developer-video']} ${isActive ? styles['active-video'] : ''}`;
  };

  const getNameClass = () => {
    return `${styles['name']} ${isActive ? styles['active-name'] : ''}`;
  };

  const getButtonClass = () => {
    return `${styles['button-portfolio']} ${isActive ? styles['active-button'] : ''}`;
  };

  return (
    <div 
      className={getCardClass()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Для неактивных карточек используем div вместо ссылки */}
      {isActive ? (
        <a
          href={link}
          className={styles['card-link-layer']}
          onDragStart={(e) => e.preventDefault()}
        >
          <video
            ref={videoRef}
            className={getVideoClass()}
            playsInline
            muted={muted}
            preload="metadata"
            poster={poster}
            pip="false"
            controls={false}
            loop
            onDragStart={(e) => e.preventDefault()}
          >
            {webm && <source src={webm} type="video/webm" />}
            <source src={mp4} type="video/mp4" />
          </video>

          <div className={styles['card-bottom']}>
            <p className={getNameClass()}>{name}</p>
            <p className={getButtonClass()}>
              <span>перейти</span>
              <PortfolioArrow />
            </p>
          </div>
        </a>
      ) : (
        <div className={styles['card-link-layer']}>
          <img
            src={poster}
            className={getVideoClass()}
            alt={name}
            onDragStart={(e) => e.preventDefault()}
          />

          <div className={styles['card-bottom']}>
            <p className={getNameClass()}>{name}</p>
            <p className={getButtonClass()}>
              <span>перейти</span>
              <PortfolioArrow />
            </p>
          </div>
        </div>
      )}

      {/* Кнопка звука только для активной карточки */}
      {isActive && (
        <button
          type="button"
          className={`${styles['mute-btn']} ${muted ? styles['muted'] : styles['unmuted']}`}
          onClick={toggleMute}
          aria-label={muted ? 'Включить звук' : 'Выключить звук'}
        >
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
      )}
    </div>
  );
}