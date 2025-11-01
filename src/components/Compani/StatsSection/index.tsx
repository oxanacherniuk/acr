import './scss/style.scss';

export function StatsSection() {
  const stats = [
    {
      value: "1.5х",
      label: "Увеличение конверсии в среднем",
      icon: "↑"
    },
    {
      value: "99%",
      label: "Довольных клиентов",
      icon: "★"
    },
    {
      value: "1 год",
      label: "Средняя длительность партнёрства",
      icon: "∞"
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-section__background-overlay" />
      
      {/* Декоративные элементы */}
      <div className="stats-section__decorative-circle" />
      
      <div className="container">
        <h2 className="glossy-lite text-silver-blue-dark h2">
          МЫ ГОРДИМСЯ ЧТО ПОМОГЛИ НАШИМ КЛИЕНТАМ РАСТИ
        </h2>

        <div className="stats-section__grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stats-section__card"
            >
              {/* Светящийся фон при наведении */}
              <div className="stats-section__card-glow" />
              
              <div className="stats-section__card-content">
                {/* Иконка сверху */}
                <div className="stats-section__card-icon">
                  {stat.icon}
                </div>
                
                {/* Значение */}
                <div className="stats-section__card-value">
                  {stat.value}
                </div>
                
                {/* Разделитель */}
                <div className="stats-section__card-divider" />
                
                {/* Описание */}
                <p className="stats-section__card-label">{stat.label}</p>

              
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительный текст */}
        <div className="stats-section__footer">
          <p className="stats-section__footer-text">
            Каждый проект для нас — это возможность создать что-то действительно ценное и увидеть, как растёт бизнес наших партнёров
          </p>
        </div>
      </div>
    </section>
  );
}