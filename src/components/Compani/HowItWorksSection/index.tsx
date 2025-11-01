import { ImageIcon, Snowflake, Palette, Gift } from "lucide-react";
import './scss/style.scss';

export function HowItWorksSection() {
  const steps = [
    {
      icon: ImageIcon,
      title: "Разработка тематического баннера/слайдера",
      description: "Создаём уникальный визуальный контент, который привлекает внимание и передаёт настроение вашего бренда"
    },
    {
      icon: Snowflake,
      title: "Интеграция лёгких новогодних эффектов",
      description: "Добавляем элементы праздничного оформления: падающий снег, гирлянды и другие тематические детали"
    },
    {
      icon: Palette,
      title: "Изменение цветовой схемы и иконок на праздничные",
      description: "Адаптируем палитру вашего сайта под сезон, создавая атмосферу праздника без потери узнаваемости бренда"
    },
    {
      icon: Gift,
      title: "Оформление карточек товаров для новогодних предложений",
      description: "Разрабатываем специальные элементы для представления праздничных акций и специальных предложений"
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        <h2 className="glossy-lite text-silver-blue-dark h2">
          КАК ЭТО РАБОТАЕТ?
        </h2>
        
        <p className="how-it-works-section__subtitle">
          Элементы праздничного преображения
        </p>

        <div className="how-it-works-section__content">
          <div className="how-it-works-section__grid">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`how-it-works-section__card ${
                    isEven ? 'how-it-works-section__card--even' : 'how-it-works-section__card--odd'
                  }`}
                >
                  {/* Декоративный элемент сзади */}
                  <div className="how-it-works-section__card-decoration" />
                  
                  <div className="how-it-works-section__card-glow" />
                  
                  <div className="how-it-works-section__card-content">
                    <div className="how-it-works-section__card-body">
                      <div className="how-it-works-section__icon-wrapper">
                        <Icon className="how-it-works-section__icon" />
                      </div>
                      
                      <div className="how-it-works-section__text-content">
                        <div className="how-it-works-section__step-number">Шаг {index + 1}</div>
                        <h3 className="how-it-works-section__card-title">{step.title}</h3>
                        <p className="how-it-works-section__card-description">{step.description}</p>
                      </div>
                    </div>

                    {/* Декоративная линия внизу */}
                    <div className="how-it-works-section__card-line" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}