import { ArrowRight } from "lucide-react";
import "./scss/style.scss";
import GradientHeadingLite from "../../GradientHeading/GradientHeading";

interface StockFinalCtaProps {
  data: {
    title: string;
    text: string;
    button: string;
  };
}

export default function StockFinalCta({ data }: StockFinalCtaProps) {
  return (
    <section id="StockFinalCta" className="StockFinalCta">
      <div className="top-decorative-line"></div>

      <div className="container">
        <div className="cta-grid">
          {/* Левая часть - Визуальный элемент */}
          <div className="visual-section">
            <div className="visual-element">24/7</div>
          </div>

          {/* Правая часть - Контент */}
          <div className="content-section">
            <div className="vertical-separator"></div>

            <div className="content-wrapper">
              <div className="text-content">
                <GradientHeadingLite
                  as="h2"
                  theme="onDark"
                  track="element"
                  className="h2"
                >
                  {data.title}
                </GradientHeadingLite>

                <div className="title-divider"></div>

                <p className="subtitle">{data.text}</p>
              </div>

              <div className="actions-section">
                <a href="tel:+79656966565" className="cta-button butt">
                  {data.button}
                  <ArrowRight className="button-icon" />
                </a>

                <div className="additional-info">
                  <p className="info-text">Бесплатная консультация</p>
                  <p className="info-text">Без обязательств</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
