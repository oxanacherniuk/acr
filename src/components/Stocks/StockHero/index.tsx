import { useState, useRef, useEffect } from 'react';
import './css/style.css';

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

// Улучшенный компонент для медиа с поддержкой видео и webp
function MediaWithFallback({ 
  data 
}: { 
  data: StockHeroProps['data'] 
}) {
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'fallback'>('fallback');
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Определяем тип медиа на основе доступных файлов
    if (data.videoMp4 || data.videoWebm) {
      setMediaType('video');
    } else if (data.img || data.imgWebp) {
      setMediaType('image');
    } else {
      setMediaType('fallback');
    }
  }, [data]);

  const handleVideoError = () => {
    // Если видео не загружается, пробуем изображение
    if (data.img || data.imgWebp) {
      setMediaType('image');
    } else {
      setMediaType('fallback');
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setMediaType('fallback');
  };

  if (mediaType === 'video') {
    return (
      <>
        <div className="media-type-badge">Видео</div>
        <video
          ref={videoRef}
          className="video-player"
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
        >
          {data.videoWebm && <source src={data.videoWebm} type="video/webm" />}
          {data.videoMp4 && <source src={data.videoMp4} type="video/mp4" />}
        </video>
      </>
    );
  }

  if (mediaType === 'image' && !imageError) {
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
          />
        </picture>
      </>
    );
  }

  return (
    <div className="fallback-image">
      <div className="fallback-content">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
          <div>{data.visual}</div>
        </div>
      </div>
    </div>
  );
}

export default function StockHero({ data }: StockHeroProps) {
  return (
    <section className="StockHero">
      <div className="container">
        <div className="hero-grid">
          {/* Левая колонка - Контент */}
          <div className="content-column">
            <div className="text-content">
              <h1 className="main-title">
                {data.title}
              </h1>
              
              <div className="title-divider"></div>
              
              <h2 className="subtitle">
                Ваш бизнес работает 24/7 с умным чат-ботом
              </h2>
            </div>
            
            <p className="description">
              {data.text}
            </p>

            <div className="cta-section">
              <button className="cta-button">
                {data.ctaButton}
              </button>
            </div>
          </div>

          {/* Правая колонка - Медиа */}
          <div className="media-column">
            <div className="media-container">
              <MediaWithFallback data={data} />
            </div>
            
            {/* Декоративный элемент */}
            <div className="decorative-element"></div>
          </div>
        </div>
      </div>
    </section>
  );
}