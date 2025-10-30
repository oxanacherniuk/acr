import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import './css/style.css';
import TextEffect from '../../HoverText';

interface StockHeroProps {
  data: {
    visual: string;
    title: string;
    text: string;
    ctaButton: string;
    img?: string;
    imgWebp?: string;
    videoMp4?: string;
    videoWebm?: string;
  };
}

// Мемоизированный компонент для медиа
const MediaWithFallback = React.memo(({ 
  data 
}: { 
  data: StockHeroProps['data'] 
}) => {
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'fallback'>('fallback');
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Определяем тип медиа один раз при монтировании
  useEffect(() => {
    const hasVideo = data.videoMp4 || data.videoWebm;
    const hasImage = data.img || data.imgWebp;
    
    if (hasVideo) {
      setMediaType('video');
    } else if (hasImage) {
      setMediaType('image');
    } else {
      setMediaType('fallback');
    }
  }, []); // Пустой массив зависимостей - выполняется только при монтировании

  const handleVideoError = useCallback(() => {
    if (data.img || data.imgWebp) {
      setMediaType('image');
    } else {
      setMediaType('fallback');
    }
  }, [data.img, data.imgWebp]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setMediaType('fallback');
  }, []);

  // Используем useMemo для мемоизации JSX
  const mediaContent = useMemo(() => {
    switch (mediaType) {
      case 'video':
        return (
          <>
            <div className="media-type-badge">Видео</div>
            <video
              ref={videoRef}
              className="video-player"
              autoPlay
              muted
              loop
              pip="false"
              playsInline
              onError={handleVideoError}
              preload="metadata" // Добавляем preload для оптимизации
            >
              {data.videoWebm && <source src={data.videoWebm} type="video/webm" />}
              {data.videoMp4 && <source src={data.videoMp4} type="video/mp4" />}
            </video>
          </>
        );
      
      case 'image':
        if (imageError) return null;
        return (
          <>
            <div className="media-type-badge">Изображение</div>
            <picture>
              {data.imgWebp && <source srcSet={data.imgWebp} type="image/webp" />}
              <img
                src={data.img || data.visual}
                alt="Визуализация услуги"
                className="media-content"
                onError={handleImageError}
                loading="lazy"
                decoding="async" // Добавляем асинхронный декодинг
              />
            </picture>
          </>
        );
      
      default:
        return (
          <div className="fallback-image">
            <div className="fallback-content">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}></div>
                <div>{data.visual}</div>
              </div>
            </div>
          </div>
        );
    }
  }, [mediaType, imageError, data, handleVideoError, handleImageError]);

  return mediaContent;
});

// Основной компонент также мемоизируем
function StockHero({ data }: StockHeroProps) {
  // Мемоизируем данные чтобы избежать лишних ререндеров
  const memoizedData = useMemo(() => data, [
    data.visual, 
    data.title, 
    data.text, 
    data.ctaButton, 
    data.img, 
    data.imgWebp, 
    data.videoMp4, 
    data.videoWebm
  ]);

  return (
    <section className="StockHero">
      <div className="container">
        <div className="hero-grid">
          {/* Левая колонка - Контент */}
          <div className="content-column">
            <div className="text-content">
              <TextEffect text={data.title} className='subtitle h2'/>
              <div className="title-divider"></div>
            </div>
            
            <p className="description">
              {data.text}
            </p>

            <div className="cta-section">
              <button className="cta-button butt">
                {data.ctaButton}
              </button>
            </div>
          </div>

          {/* Правая колонка - Медиа */}
          <div className="media-column">
            <div className="media-container">
              <MediaWithFallback data={memoizedData} />
            </div>
            
            {/* Декоративный элемент */}
            <div className="decorative-element"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(StockHero);