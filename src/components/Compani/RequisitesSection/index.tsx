import { Building2, FileText, CreditCard } from "lucide-react";
import './scss/style.scss';

export function RequisitesSection() {
  const requisites = [
    { label: "ООО", value: "ООО «Аналитический Центр Развитие»" },
    { label: "ИНН", value: "7325112704" },
    { label: "КПП", value: "732601001" },
    { label: "ОГРН", value: "1127325002573" },
    { label: "Р/С", value: "40702810129280002066" },
    { label: "БИК", value: "042202824" },
    { label: "Юридический адрес", value: "432063,РФ, Ульяновская обл., г.Ульяновск, Ул. Кирова, д. 6, кв. 397" },
    { label: "Почтовый адрес", value: "432063,РФ, Ульяновская обл., г.Ульяновск, Ул. Кирова, д. 6, кв. 397" },
    { label: "Банк", value: 'ФИЛИАЛ "НИЖЕГОРОДСКИЙ" АО "АЛЬФА-БАНК"' }
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