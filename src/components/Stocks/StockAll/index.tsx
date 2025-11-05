import './scss/style.scss';
import { stockData } from '../StockData';
import { NavLink } from 'react-router-dom';

export default function StockAll() {
  

  return (
    <div className="stock-all">
      {/* Hero Section */}
      <section className="stock-all__hero">
        <div className="container">
          <h1 className="glossy-lite text-silver-blue-dark h2">
            АКЦИИ
          </h1>
         
        </div>
      </section>

      {/* Features Section */}
      <section className="stock-all__features">
        <div className="container">
          {stockData.map((feature, index) => {
            const imageSrc = feature.hero?.imgWebp || feature.hero?.img;
            return (
              <div
                key={index}
                className="stock-all__feature-card"
              >
                <div className="stock-all__feature-content">
                  <div className="stock-all__feature-icon-wrapper">
                    <div className="stock-all__feature-icon-border">
                      {imageSrc ? (
                        <img 
                          src={imageSrc} 
                          alt={feature.title}
                          className="stock-all__feature-image"
                        />
                      ) : (
                        <div className="stock-all__feature-placeholder">
                          {feature.title.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="stock-all__feature-text">
                    <h3 className="stock-all__feature-title">
                      {feature.title}
                    </h3>
                    <p className="stock-all__feature-description">
                      {feature.subtitle}
                    </p>
                    <NavLink to={`/stock/${feature.url}`}
                      className="butt"
                    >
                      Узнать больше
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Tagline */}
      <section className="stock-all__footer">
        <div className="stock-all__footer-container">
          <p className="stock-all__footer-text">
            Не упустите возможность захватить и получите больше!
          </p>
        </div>
      </section>
    </div>
  );
}