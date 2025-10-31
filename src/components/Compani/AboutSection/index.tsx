import './css/style.css';



export function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-section__background-overlay" />
      
      <div className="container">
        <div className="about-section__content">
          <div className="about-section__header">
            <h2 className="glossy-lite text-silver-blue-dark h2">
              Аналитический Центр <span className="about-section__title-accent">Развития</span>
            </h2>
          </div>

          <div className="about-section__text-blocks">
            <div className="about-section__text-block">
              <p className="about-section__text">
                «Аналитический центр развития» — это команда экспертов по цифровым технологиям, которые на основе глубокого анализа строят эффективные онлайн-решения, приносящие нашим клиентам прибыль и устойчивый рост.
              </p>
            </div>

            <div className="about-section__text-block">
              <p className="about-section__text">
                С 2010 года мы помогаем компаниям различных масштабов реализовывать их digital-стратегии. От стартапов до крупных корпораций - мы находим индивидуальный подход к каждому клиенту.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}