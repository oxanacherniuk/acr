import { Search, Lightbulb, Code, Rocket, BarChart } from "lucide-react";
import './css/style.css';

export function ProcessSection() {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Анализ и аудит",
      description: "Изучаем ваш бизнес, целевую аудиторию, конкурентов. Проводим глубокий анализ текущих показателей"
    },
    {
      icon: Lightbulb,
      number: "02",
      title: "Стратегия",
      description: "Разрабатываем концепцию и техническое задание. Планируем архитектуру и функциональность"
    },
    {
      icon: Code,
      number: "03",
      title: "Разработка",
      description: "Создаём дизайн и реализуем функционал. Регулярно показываем промежуточные результаты"
    },
    {
      icon: Rocket,
      number: "04",
      title: "Запуск",
      description: "Тестируем, исправляем ошибки, оптимизируем производительность и запускаем проект"
    },
    {
      icon: BarChart,
      number: "05",
      title: "Поддержка и развитие",
      description: "Анализируем метрики, собираем обратную связь и непрерывно улучшаем результаты"
    }
  ];

  return (
    <section className="process-section">
      <div className="container">
        <div className="process-section__header">
          <h2 className="glossy-lite text-silver-blue-dark h2">
            НАШ ПРОЦЕСС — ЭТО ЧЁТКОСТЬ И ПРЕДСКАЗУЕМОСТЬ РЕЗУЛЬТАТА
          </h2>
          <p className="process-section__subtitle">
            Мы работаем по проверенной методологии, которая позволяет нам гарантировать качество и сроки
          </p>
        </div>

        <div className="process-section__grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`process-section__card ${
                  index === steps.length - 1 ? "process-section__card--full-width" : ""
                }`}
              >
                <div className="process-section__card-glow" />
                
                <div className="process-section__card-content">
                  <div className="process-section__card-header">
                    <div className="process-section__icon-wrapper">
                      <Icon className="process-section__icon" />
                    </div>
                    <div className="process-section__number">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="process-section__card-title">{step.title}</h3>
                  <p className="process-section__card-description">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}