import './scss/style.scss';
import { Target, TrendingUp, Users, Zap } from "lucide-react";

export function PhilosophySection() {
  const philosophyItems = [
    {
      icon: Target,
      title: "Индивидуальный подход",
      description: "Мы создаём решения под ваши уникальные бизнес-задачи, а не используем шаблоны"
    },
    {
      icon: TrendingUp,
      title: "Фокус на результате",
      description: "Каждый проект направлен на достижение конкретных бизнес-целей и KPI"
    },
    {
      icon: Users,
      title: "Партнёрство",
      description: "Мы становимся частью вашей команды и развиваемся вместе с вашим бизнесом"
    },
    {
      icon: Zap,
      title: "Инновации",
      description: "Используем передовые технологии для создания конкурентных преимуществ"
    }
  ];

  return (
    <section className="philosophy-section">
      <div className="philosophy-section__background-overlay" />
      
      <div className="container">
        <h2 className="glossy-lite text-silver-blue-dark h2">
          НАША ФИЛОСОФИЯ
        </h2>

        <div className="philosophy-section__grid">
          {philosophyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="philosophy-section__card"
              >
                <div className="philosophy-section__card-hover-effect" />
                
                <div className="philosophy-section__card-content">
                  <div className="philosophy-section__icon-wrapper">
                    <Icon className="philosophy-section__icon" />
                  </div>
                  
                  <h3 className="philosophy-section__card-title">{item.title}</h3>
                  <p className="philosophy-section__card-description">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}