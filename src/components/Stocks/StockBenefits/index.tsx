interface StockBenefitsProps {
  data: {
    postscript?: string | undefined;
    items: {
      icon: ForwardRefExoticComponent<LucideProps>;
      title: string;
      text: string;
    }[];
  };
}

import type { ForwardRefExoticComponent } from "react";
import GradientHeadingLite from "../../GradientHeading/GradientHeading";
import "./css/style.css";
import type { LucideProps } from "lucide-react";

export default function StockBenefits({ data }: StockBenefitsProps) {
  return (
    <section className="SBenefits">
      <div className="container">
        <div className="section-header">
          <div className="vertical-divider"></div>
          <div className="header-content">
            <GradientHeadingLite
              as="h2"
              theme="onDark"
              track="element"
              className="h2"
            >
              Ключевые выгоды
            </GradientHeadingLite>

            {data.postscript && (
              <p className="section-subtitle">{data.postscript}</p>
            )}
          </div>
        </div>

        <div className="benefits-grid">
          {data.items.map((benefit, index) => {
            const isEven = index % 2 === 0;
            const itemClass = `benefit-item ${isEven ? "even-item" : "odd-item"}`;
            const Icon = benefit.icon;
            return (
              <div key={index} className={itemClass}>
                {!isEven && <div className="vertical-separator"></div>}

                <div className="benefit-content">
                  <div className="benefit-number">{index + 1}</div>

                  <div className="benefit-main">
                    <Icon className="benefit-icon" />
                    <div className="benefit-text">
                      <h3 className="h3 tBlue">{benefit.title}</h3>
                      <p className="benefit-description">{benefit.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
