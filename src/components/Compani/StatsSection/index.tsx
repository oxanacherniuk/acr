import './css/style.css';

export function StatsSection() {
  const stats = [
    {
      value: "1.5х",
      label: "Увеличение конверсии в среднем"
    },
    {
      value: "99%",
      label: "Довольных клиентов"
    },
    {
      value: "1 год",
      label: "Средняя длительность партнёрства"
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-section__background-overlay" />
      
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
              <div className="stats-section__card-glow" />
              
              <div className="stats-section__card-content">
                <div className="stats-section__value">
                  {stat.value}
                </div>
                <p className="stats-section__label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}