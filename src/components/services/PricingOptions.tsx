import { NavigationButton } from '../NavigationButton/NavigationButton';
import s from '../../styles/ServicePage.module.css';

interface PricingOption {
    name: string;
    price: string;
}

interface PricingOptionsProps {
    title?: string;
    options: PricingOption[];
    buttonText?: string;
    buttonLink?: string;
}

export function PricingOptions({ 
    title = "дополнительные опции",
    options,
    buttonText = "получить расчет",
    buttonLink = "https://t.me/KP888_Bot"
}: PricingOptionsProps) {
    return (
        <div className={s["additional-options"]} style={{ marginTop: "50px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "30px" }}>{title}</h3>
            <div className={s["additional-options-grid"]}>
                {options.map((option, index) => (
                    <div key={index} className={s["option-item"]}>
                        <div className={s["option-name"]}>{option.name}</div>
                        <div className={s["option-price"]}>{option.price}</div>
                    </div>
                ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <NavigationButton to={buttonLink} children={buttonText} />
            </div>
        </div>
    );
}