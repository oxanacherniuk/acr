import { Container } from "../ui/Container";
import s from "../../styles/ServicePage.module.css";
import { useEffect, useMemo, useState } from "react";
import TextEffect from "../HoverText";

type VideoSources = {
  webm?: string;
  mp4?: string;
  poster?: string;
  autoPlay?: boolean; // по умолчанию true (с muted)
  loop?: boolean;     // по умолчанию true
  muted?: boolean;    // по умолчанию true (для автоплея в браузерах)
  controls?: boolean; // по умолчанию false
  ariaLabel?: string; // альтернативный текст для ассистивных технологий
};

type ImageSources = {
  webp?: string;      // WebP изображение
  fallback: string;   // Fallback изображение (png/jpg)
  alt: string;
};

type Props = {
  title: string;
  subtitle: string;
  image: ImageSources; // теперь передаем объект с изображениями
  video?: VideoSources;  // опционально передаем источники видео
};

export function ServiceBanner({ title, subtitle, image, video }: Props) {
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);

  // Проверяем поддержку WebP
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      if (canvas.getContext && canvas.getContext('2d')) {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      return false;
    };

    setSupportsWebP(checkWebPSupport());
  }, []);

  // Проверяем поддержку видео форматов
  useEffect(() => {
    if (!video) return;

    const el = document.createElement("video");
    const canPlay = (type: string) =>
      typeof el.canPlayType === "function" && !!el.canPlayType(type);

    const supportsWebM = video.webm && canPlay('video/webm; codecs="vp9,vorbis"');
    const supportsMp4  = video.mp4  && canPlay('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

    // Если браузер сообщает, что может воспроизвести хотя бы один формат — покажем видео
    setCanPlayVideo(Boolean(supportsWebM || supportsMp4));
  }, [video]);

  const videoProps = useMemo(() => {
    return {
      autoPlay: video?.autoPlay ?? true,
      loop: video?.loop ?? true,
      muted: video?.muted ?? true,
      controls: video?.controls ?? false,
      playsInline: true,
      poster: video?.poster,
      // Чтобы сохранить внешний вид как у img
      style: { width: "auto", height: "100%" as const },
      // Доступность
      "aria-label": video?.ariaLabel ?? title,
      title: video?.ariaLabel ?? title,
    };
  }, [video, title]);

  // Определяем какое изображение использовать
  const imageSrc = useMemo(() => {
    // Если есть WebP и браузер поддерживает - используем WebP
    if (image.webp && supportsWebP) {
      return image.webp;
    }
    // Иначе используем fallback
    return image.fallback;
  }, [image.webp, image.fallback, supportsWebP]);

  return (
    <Container>
      <div className={s["service-header"]}>
        <div className={s["service-header-content"]}>
          <TextEffect text={title} className={s["service-title"]}/>
          <p className={s["service-subtitle"]}>{subtitle}</p>
        </div>

        <div className={s["service-image"]}>
          {video && canPlayVideo ? (
            <video pip='false' className={s["service-header-video"]} {...videoProps}>
              {/* Порядок источников важен: сначала WebM, затем MP4; браузер сам выберет поддерживаемый */}
              {video.webm && <source src={video.webm} type="video/webm" />}
              {video.mp4  && <source src={video.mp4}  type="video/mp4"  />}
              {/* Фолбэк внутри <video> на случай очень старых браузеров */}
              <img 
                src={imageSrc} 
                alt={image.alt} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </video>
          ) : (
            <picture>
              {/* Если есть WebP и браузер поддерживает - показываем WebP */}
              {image.webp && supportsWebP && (
                <source srcSet={image.webp} type="image/webp" />
              )}
              {/* Fallback изображение */}
              <source srcSet={image.fallback} type={getImageMimeType(image.fallback)} />
              <img
                className={s["service-header-img"]}
                src={image.fallback}
                alt={image.alt}
                style={{ height: "100%"}}
                loading="eager"
              />
            </picture>
          )}
        </div>
      </div>
    </Container>
  );
}

// Вспомогательная функция для определения MIME типа по расширению файла
function getImageMimeType(src: string): string {
  const extension = src.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/jpeg';
  }
}