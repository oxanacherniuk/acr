import { useEffect, useRef, useState } from "react";
import './scss/style.scss';

export function TimelineSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const timelineData = [
    {
      year: "2010",
      number: "1",
      title: "Основание компании",
      description: "Фокус на веб-аналитике и контекстной рекламе"
    },
    {
      year: "2019",
      number: "2",
      title: "Расширение портфеля услуг",
      description: "Запуск направления по разработке сайтов. Первые комплексные клиенты"
    },
    {
      year: "2020-2022",
      number: "3",
      title: "Становление методологии",
      description: "Объединение аналитики, разработки и маркетинга в единый продукт. Формирование костяка команды"
    },
    {
      year: "2023-н.в.",
      number: "4",
      title: "Лидерство в отрасли",
      description: "Разработка и сопровождение успешных проектов. Мы — надёжный партнёр для среднего и крупного бизнеса"
    }
  ];

  return (
    <section ref={sectionRef} className="timeline-section">
      <div className="container">
        <h2 className="glossy-lite text-silver-blue-dark h2">
          ОТ ИДЕИ К ЛИДЕРСТВУ: КАК МЫ РОСЛИ
        </h2>

        <div className="timeline-section__content">
          {/* Vertical line */}
          <div className="timeline-section__line">
            <div
              className={`timeline-section__line-progress ${
                isVisible ? "timeline-section__line-progress--animated" : ""
              }`}
            />
          </div>

          {/* Timeline items */}
          <div className="timeline-section__items">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`timeline-section__item ${
                  index % 2 === 0 ? "timeline-section__item--left" : "timeline-section__item--right"
                } ${
                  isVisible
                    ? index % 2 === 0
                      ? "timeline-section__item--animate-left"
                      : "timeline-section__item--animate-right"
                    : ""
                }`}
                style={{
                  animationDelay: isVisible ? `${index * 0.3}s` : "0s"
                }}
              >
                {/* Content */}
                <div className={`timeline-section__content-wrapper ${
                  index % 2 === 0 ? "timeline-section__content-wrapper--left" : "timeline-section__content-wrapper--right"
                }`}>
                  <div className="timeline-section__year">{item.year}</div>
                  <h3 className="timeline-section__item-title">{item.title}</h3>
                  <p className="timeline-section__item-description">
                    {item.description}
                  </p>
                </div>

                {/* Number badge */}
                <div
                  className={`timeline-section__badge ${
                    isVisible ? "timeline-section__badge--animated" : ""
                  }`}
                  style={{
                    animationDelay: isVisible ? `${index * 0.3 + 0.2}s` : "0s"
                  }}
                >
                  <div className="timeline-section__badge-inner">
                    <span className="timeline-section__badge-number">{item.number}</span>
                  </div>
                  
                  {/* Connecting line animation */}
                  <div
                    className={`timeline-section__connector ${
                      index % 2 === 0
                        ? "timeline-section__connector--left"
                        : "timeline-section__connector--right"
                    } ${isVisible ? "timeline-section__connector--animated" : ""}`}
                    style={{
                      animationDelay: isVisible ? `${index * 0.3 + 0.4}s` : "0s"
                    }}
                  />
                </div>

                {/* Spacer for opposite side */}
                <div className="timeline-section__spacer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}