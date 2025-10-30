import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent } from "react";
import "./css/style.css";
// import GradientHeadingLite from "../../GradientHeading/GradientHeading";

interface StockFeaturesProps {
  data: {
    title: string;
    items: {
      icon: ForwardRefExoticComponent<LucideProps>;
      text: string;
    }[];
  };
}

export default function StockFeatures({ data }: StockFeaturesProps) {
  return (
    <section className="StockFeatures">
      <div className="top-decorative-line"></div>

      <div className="container">
        <div className="features-grid">
          {/* Левая часть - Заголовок */}
          <div className="header-section">
            <div className="header-content">
              <h2 className="glossy-lite text-silver-blue-dark h2">
                Как это работает?
              </h2>
              <div className="title-divider"></div>
            </div>

            <h3 className="subtitle">{data.title}</h3>

            {/* <p className="description">Ваш бот может:</p> */}
          </div>

          {/* Правая часть - Список возможностей */}
          <div className="features-section">
            <div className="vertical-decorative-line"></div>

            <div className="features-list">
              {data.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="feature-item">
                    <div className="feature-content">
                      <div className="icon-container">
                        <Icon className="feature-icon" />
                      </div>

                      <div className="text-content">
                        <p className="feature-text">{item.text}</p>
                      </div>
                    </div>

                    {index < data.items.length - 1 && (
                      <div className="feature-separator"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
