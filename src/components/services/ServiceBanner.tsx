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

type Props = {
  title: string;
  subtitle: string;
  imageSrc: string;      // fallback на случай отсутствия/неподдержки видео
  imageAlt: string;
  video?: VideoSources;  // опционально передаем источники видео
};

export function ServiceBanner({ title, subtitle, imageSrc, imageAlt, video }: Props) {
  // const { display, index } = useTypingTitle(title);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  // Проверяем поддержку хотя бы одного из заявленных форматов
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

  return (
    <Container>
      <div className={s["service-header"]}>
        <div className={s["service-header-content"]}>
          <TextEffect text={title} className={s["service-title"]}/>

          {/* <h1 className={s["service-title"]}>
            {display}{index < title.length && <span>|</span>}
          </h1> */}
          <p className={s["service-subtitle"]}>{subtitle}</p>
        </div>

        <div className={s["service-image"]}>
          {video && canPlayVideo ? (
            <video pip='false' className={s["service-header-video"]} {...videoProps}>
              {/* Порядок источников важен: сначала WebM, затем MP4; браузер сам выберет поддерживаемый */}
              {video.webm && <source src={video.webm} type="video/webm" />}
              {video.mp4  && <source src={video.mp4}  type="video/mp4"  />}
              {/* Фолбэк внутри <video> на случай очень старых браузеров */}
              <img src={imageSrc} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </video>
          ) : (
            <img
              src={imageSrc}
              alt={imageAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="eager"
            />
          )}
        </div>
      </div>
    </Container>
  );
}
