import s from "../../styles/ServicePage.module.css";
import {  MoveUp } from "../Motions";
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
    <MoveUp>
<div className={s['hero-block']}>
      <div className={s['hero-content']}>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
        <p>{description}</p>
        <a className={s['hero-but'] + " butt"} href={buttonLink}>{buttonText}</a>
      </div>
    </div>

    </MoveUp>
    
  );
}