import s from "../../styles/ServicePage.module.css";
import { NavigationButton } from "../NavigationButton/NavigationButton";

export interface InfoSectionProps {
  title: string;
  description: string;
  priceNotes?: string[] ;
  price: string;
  buttonLink: string;
  buttonText: string;
}

export function InfoSection({
  title,
  description,
  priceNotes,
  price,
  buttonLink,
  buttonText
}: InfoSectionProps) {
  return (
    <div className={s['info-section']}>
      <h3>{title}</h3>
      <p className={s['price-note']}>{description}</p>
      
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
      </div>
    </div>
  );
}