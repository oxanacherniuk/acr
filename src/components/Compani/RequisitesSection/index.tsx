import { Building2, FileText, CreditCard } from "lucide-react";
import './scss/style.scss';

export function RequisitesSection() {
  const requisites = [
    { label: "ООО", value: "«Аналитический Центр Развития»" },
    { label: "ИНН", value: "7700123456" },
    { label: "КПП", value: "770001001" },
    { label: "ОГРН", value: "1234567890123" },
    { label: "Р/С", value: "40702810900000012345" },
    { label: "БИК", value: "044525225" },
    { label: "Юридический адрес", value: "123456, г. Москва, ул. Примерная, д. 1, офис 100" },
    { label: "Банк", value: "ПАО «Сбербанк России»" }
  ];

  return (
    <section className="requisites-section">
      <div className="container">
        <h2 className="glossy-lite text-silver-blue-dark h2">
          РЕКВИЗИТЫ КОМПАНИИ
        </h2>

        <div className="requisites-section__content">
          <div className="requisites-section__features">
            <div className="requisites-section__feature-card">
              <Building2 className="requisites-section__feature-icon" />
              <h3 className="requisites-section__feature-title">Официально</h3>
              <p className="requisites-section__feature-description">Зарегистрированная компания</p>
            </div>
            
            <div className="requisites-section__feature-card">
              <FileText className="requisites-section__feature-icon" />
              <h3 className="requisites-section__feature-title">Прозрачно</h3>
              <p className="requisites-section__feature-description">Полный пакет документов</p>
            </div>
            
            <div className="requisites-section__feature-card">
              <CreditCard className="requisites-section__feature-icon" />
              <h3 className="requisites-section__feature-title">Надёжно</h3>
              <p className="requisites-section__feature-description">Безопасные расчёты</p>
            </div>
          </div>

          <div className="requisites-section__details">
            <div className="requisites-section__details-grid">
              {requisites.map((item, index) => (
                <div key={index} className="requisites-section__detail-item">
                  <span className="requisites-section__detail-label">{item.label}:</span>
                  <span className="requisites-section__detail-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}