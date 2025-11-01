import s from "../../styles/ServicePage.module.css";
import { NavigationButton } from "../NavigationButton/NavigationButton";

export interface OptionItem {
  name: string;
  price: string;
}

export interface AdditionalOptions {
  title: string;
  items: OptionItem[];
}

export interface InfoSectionProps {
  title: string;
  description: string;
  priceNotes?: string[];
  price: string;
  buttonLink: string;
  buttonText: string;
  additionalOptions?: AdditionalOptions;
}

export function InfoSection({
  title,
  description,
  priceNotes,
  price,
  buttonLink,
  buttonText,
  additionalOptions
}: InfoSectionProps) {
  return (
    <div className={s['info-section']}>
      <h3 className="glossy-lite text-silver-blue-dark h2">{title}</h3>
      <p className={s['info-section__text']}>{description}</p>
      
      <div className={s['price-block']}>
        {priceNotes && priceNotes.map((note, index) => (
          <p key={index} className={s['price-note']}>
            {note}
          </p>
        ))}
        
        <div className={s['price-inner']}>
          <span className={s['main-price']}>{price}</span>
          <NavigationButton to={buttonLink}>{buttonText}</NavigationButton>
        </div>

        {additionalOptions && (
          <div className={s['additional-options']}>
            <h3 className="h3">{additionalOptions.title}</h3>
            <div className={s['additional-options-grid']}>
              {additionalOptions.items.map((option, index) => (
                <div key={index} className={s['option-item']}>
                  <div className={s['option-name']}>{option.name}</div>
                  <div className={s['option-price']}>{option.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}