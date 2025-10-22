import s from "../../styles/ServicePage.module.css";
import { NavigationButton } from "../NavigationButton/NavigationButton";



interface ServiceHeroProps {
  title: string;
  description: string;
  buttonLink: string;
  buttonText: string;
}

export default function ServiceHero({ 
  title, 
  description, 
  buttonLink, 
  buttonText 
}: ServiceHeroProps) {
  return (
    <div className={s['hero-block']}>
      <div className={s['hero-content']}>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
        <p>{description}</p>
        <NavigationButton to={buttonLink}>{buttonText}</NavigationButton>
      </div>
    </div>
  );
}