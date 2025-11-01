import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import "./scss/style.scss";
import TextEffect from "../../HoverText";

interface StockHeroProps {
  title: string;
  data: {
    visual: string;
    title: string;
    text: string;
    ctaButton: string;
    img?: string | undefined;
    imgWebp?: string | undefined;
    videoMp4?: string | undefined;
    videoWebm?: string | undefined;
  };
}

// Обновляем интерфейс для MediaWithFallback
interface MediaWithFallbackProps {
  data: StockHeroProps["data"];
  title: string; // Добавляем title
}

// Мемоизированный компонент для медиа
const MediaWithFallback = React.memo(
  ({ data }: MediaWithFallbackProps) => {
    const [mediaType, setMediaType] = useState<"video" | "image" | "fallback">(
      "fallback",
    );
    const [imageError, setImageError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Определяем тип медиа один раз при монтировании
    useEffect(() => {
      const hasVideo = data.videoMp4 || data.videoWebm;
      const hasImage = data.img || data.imgWebp;

      if (hasVideo) {
        setMediaType("video");
      } else if (hasImage) {
        setMediaType("image");
      } else {
        setMediaType("fallback");
      }
    }, []); // Пустой массив зависимостей - выполняется только при монтировании

    const handleVideoError = useCallback(() => {
      if (data.img || data.imgWebp) {
        setMediaType("image");
      } else {
        setMediaType("fallback");
      }
    }, [data.img, data.imgWebp]);

    const handleImageError = useCallback(() => {
      setImageError(true);
      setMediaType("fallback");
    }, []);

    // Используем useMemo для мемоизации JSX
    const mediaContent = useMemo(() => {
      switch (mediaType) {
        case "video":
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
                {/* {data.videoWebm && (
                  <source src={data.videoWebm} type="video/webm" />
                )} */}
                {data.videoMp4 && (
                  <source src={data.videoMp4} type="video/mp4" />
                )}
              </video>
            </>
          );

        case "image":
          if (imageError) return null;
          return (
            <>
              <div className="media-type-badge">Изображение</div>
              <picture>
                {data.imgWebp && (
                  <source srcSet={data.imgWebp} type="image/webp" />
                )}
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
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}></div>
                  <div>{data.visual}</div>
                </div>
              </div>
            </div>
          );
      }
    }, [mediaType, imageError, data, handleVideoError, handleImageError]);

    return mediaContent;
  },
);

// Основной компонент также мемоизируем
function StockHero({ data, title }: StockHeroProps) {
  // Мемоизируем данные чтобы избежать лишних ререндеров
  const memoizedData = useMemo(
    () => data,
    [
      data.visual,
      data.title,
      data.text,
      data.ctaButton,
      data.img,
      data.imgWebp,
      data.videoMp4,
      data.videoWebm,
    ],
  );

  return (
    <section className="StockHero">
      <div className="container">
        <div className="hero-grid">
          {/* Левая колонка - Контент */}
          <div className="content-column">
            <div className="text-content">
              <TextEffect text={title} className="subtitle h2" />
              <div className="title-divider"></div>
            </div>
            <p className="description">{data.title}</p>
            <p className="description">{data.text}</p>

            <div className="cta-section">
              <a href="#StockFinalCta" className="cta-button butt">{data.ctaButton}</a>
            </div>
          </div>

          {/* Правая колонка - Медиа */}
          <div className="media-column">
            <div className="media-container">
              <MediaWithFallback data={memoizedData} title={title} />
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