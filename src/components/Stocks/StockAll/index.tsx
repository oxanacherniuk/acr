import './scss/style.scss';
import { stockData, type StockData } from '../StockData';
import { NavLink } from 'react-router-dom';
import { useRef, useState, type JSX } from 'react';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';

export default function StockAll() {
   const breadcrumbItems = [
    { label: 'Акции', href: '/stocks' },
  ];
  return (
    <div className="stock-all">
      {/* Hero Section */}
      <section className="stock-all__hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems}/>
          <h1 className="glossy-lite text-silver-blue-dark h2">
            АКЦИИ
          </h1>
        </div>
      </section>

      {/* Features Section */}
      <section className="stock-all__features">
        <div className="container">
          {stockData.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </section>

      {/* Footer Tagline */}
      <section className="stock-all__footer">
        <div className="stock-all__footer-container">
          <p className="stock-all__footer-text">
            Не упустите возможность захватить и получите больше!
          </p>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  feature: StockData;
}
// Отдельный компонент для карточки с видео
function FeatureCard({ feature }: FeatureCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const hasVideo = !!(feature.hero?.videoMp4 || feature.hero?.videoWebm);
  const imageSrc = feature.hero?.imgWebp || feature.hero?.img;

  const handleMouseEnter = (): void => {
    setIsHovered(true);
    if (videoRef.current && hasVideo && isVideoLoaded) {
      videoRef.current.play().catch((error: Error) => {
        console.log('Автовоспроизведение заблокировано:', error);
      });
    }
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
    if (videoRef.current && hasVideo) {
      videoRef.current.pause();
    }
  };

  const handleVideoLoadedData = (): void => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = (): void => {
    setIsVideoLoaded(false);
  };

  const renderMedia = (): JSX.Element => {
    if (hasVideo) {
      return (
        <div className="stock-all__media-container">
          {/* Видео всегда в DOM, но видно только когда загружено */}
          <video
            ref={videoRef}
            className={`stock-all__feature-video ${isVideoLoaded ? 'stock-all__feature-video--loaded' : ''}`}
            muted
            loop
            pip="false"
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoadedData}
            onError={handleVideoError}
          >
            {feature.hero.videoWebm && (
              <source src={feature.hero.videoWebm} type="video/webm" />
            )}
            {feature.hero.videoMp4 && (
              <source src={feature.hero.videoMp4} type="video/mp4" />
            )}
            {/* Фолбэк если видео не поддерживается */}
            Ваш браузер не поддерживает видео.
          </video>
          
          {/* Показываем изображение только пока видео не загрузилось */}
          {imageSrc && !isVideoLoaded && (
            <img 
              src={imageSrc} 
              alt={feature.title}
              className="stock-all__feature-image stock-all__feature-image--preloader"
            />
          )}
        </div>
      );
    }

    // Если видео нет, показываем только изображение
    if (imageSrc) {
      return (
        <img 
          src={imageSrc} 
          alt={feature.title}
          className="stock-all__feature-image"
        />
      );
    }

    return (
      <div className="stock-all__feature-placeholder">
        {feature.title.charAt(6)}
      </div>
    );
  };

  return (
    <NavLink 
      to={`/stock/${feature.url}`}
      className="stock-all__feature-card butt"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="stock-all__feature-content">
        <div className="stock-all__feature-icon-wrapper">
          <div className="stock-all__feature-icon-border">
            {renderMedia()}
          </div>
        </div>

        {/* Content */}
        <div className="stock-all__feature-text">
          <h3 
            dangerouslySetInnerHTML={{__html: feature.title}} 
            className="stock-all__feature-title"
          />
          <p className="stock-all__feature-description">
            {feature.subtitle}
          </p>
          <button className="stock-all__feature-button">
            {feature.hero.ctaButton}
          </button>
        </div>
      </div>
    </NavLink>
  );
}