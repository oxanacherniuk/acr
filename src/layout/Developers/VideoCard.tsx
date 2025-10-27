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
  isActive: boolean; // добавляем пропс активности
};

export function VideoCard({ name, link, poster, mp4, webm, isDragging, isActive }: VideoCardProps) {
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
    v.muted = muted;
    v.play().catch(() => {});
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
    e.preventDefault();
    setMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
    if (videoRef.current && !muted) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Определяем классы в зависимости от активности
  const getCardClass = () => {
    return `${styles['developer-card']} ${isActive ? styles['active'] : ''}`;
  };

  const getVideoClass = () => {
    return `${styles['developer-video']} ${isActive ? styles['active-video'] : ''}`;
  };

  const getNameClass = () => {
    return `${styles['name']} ${isActive ? styles['active-name'] : ''}`;
  };

  return (
    <div className={getCardClass()}>
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
          className={getVideoClass()}
          playsInline
          muted={muted}
          preload="metadata"
          poster={poster}
          pip="false"
          controls={false}
          onDragStart={(e) => e.preventDefault()}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>

        <div className={styles['card-bottom']}>
          <p className={getNameClass()}>{name}</p>
          <p className={styles['button-portfolio']}>
            <span>перейти</span>
            <PortfolioArrow />
          </p>
        </div>
      </a>

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
    </div>
  );
}