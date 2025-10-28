// components/services/IncludedFeatures.tsx
import s from '../../styles/ServicePage.module.css';

interface IncludedFeaturesProps {
    title?: string;
    features: string[];
}

export function IncludedFeatures({ 
    title = "Базовая комплектация включает:",
    features 
}: IncludedFeaturesProps) {
    return (
        <>
            <p>{title}</p>
            <div className={s["punct-panel"]} style={{ marginTop: "30px" }}>
                <ul className={s["puncts"]}>
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}