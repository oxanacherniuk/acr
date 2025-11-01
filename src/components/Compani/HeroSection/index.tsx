import './css/style.css';
import CompanyPhoto from "../../../assets/images/ofis/companyTop.jpg";


export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section__background-overlay" />
      
      <div className="container">
        <div className="hero-section__grid">
          {/* Left side - Image */}
          

          {/* Right side - Text */}
          <div className="hero-section__content">
            <h1 className="glossy-lite text-silver-blue-dark h2">
              РАЗРАБАТЫВАЕМ ЦИФРОВЫЕ ПРОДУКТЫ <br/> ДЛЯ РОСТА ВАШЕГО БИЗНЕСА 
            </h1>
          </div>
          <div className="hero-section__image-wrapper">
            <div className="hero-section__image-gradient" />
            <img
              src={CompanyPhoto}
              alt="Автоматизация бизнеса"
              className="hero-section__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}