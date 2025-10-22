import { ChevronRight, Calendar, Tag, ArrowRight } from 'lucide-react';

import './css/style.css';
import { stockData } from '../StockData';

export default function StockAll() {
  const promotions = stockData.filter(item => item.promotion);

  return (
    <section className="StockAll">
      <div className="container">
        {/* Хлебные крошки */}
        <div className="breadcrumbs">
          <span className="breadcrumb-item">Главная</span>
          <ChevronRight className="breadcrumb-separator" />
          <span className="breadcrumb-current">Все акции</span>
        </div>

        {/* Заголовок */}
        <div className="header">
          <div className="header-content">
            <div className="header-main">
              <h1 className="main-title">Все акции</h1>
              <div className="title-divider"></div>
            </div>
            <div className="header-description">
              <p className="description-text">
                Специальные предложения для автоматизации вашего бизнеса
              </p>
            </div>
          </div>
        </div>

        {/* Сетка акций */}
        <div className="promotions-grid">
          {promotions.map((promo) => (
            <div 
              key={promo.id}
              className="promotion-card"
            >
              {/* Верхняя граница при наведении */}
              <div className="card-top-border"></div>
              
              {/* Бейдж акции */}
              {promo.promotion?.badge && (
                <div className="promotion-badge">
                  {promo.promotion.badge}
                </div>
              )}
              
              <div className="card-content">
                {/* Скидка */}
                <div className="discount">
                  {promo.promotion?.discount}
                </div>
                
                {/* Заголовок */}
                <h3 className="promotion-title">
                  {promo.title}
                </h3>
                
                {/* Описание */}
                <p className="promotion-description">
                  {promo.promotion?.description}
                </p>
              </div>

              {/* Мета-информация */}
              <div className="card-meta">
                <div className="meta-item">
                  <Calendar className="meta-icon" />
                  <span>До {promo.promotion?.validUntil}</span>
                </div>
                
                <div className="meta-item">
                  <Tag className="meta-icon" />
                  <span>{promo.promotion?.conditions}</span>
                </div>
                
                {/* Кнопка действия */}
                <div className="action-button">
                  Подробнее
                  <ArrowRight className="button-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Нижний CTA */}
        <div className="bottom-cta">
          <div className="cta-content">
            <h3 className="cta-title">
              Не нашли подходящую акцию?
            </h3>
            <p className="cta-description">
              Свяжитесь с нами для индивидуального предложения
            </p>
            <div className="cta-button">
              <button className="button">
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}