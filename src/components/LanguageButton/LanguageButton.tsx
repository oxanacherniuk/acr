import GlobeIcon from '../../assets/icons/GlobeIcon';
import styles from './LanguageButton.module.css';

interface LanguageButtonProps {
    currentLanguage: string;
    onLanguageChange: (lang: string) => void;
}

export const LanguageButton: React.FC<LanguageButtonProps> = ({
    currentLanguage,
    onLanguageChange,
}) => {
    const handleClick = () => {
        const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
        onLanguageChange(newLanguage);
    };

    return (
        <button 
            className={styles.languageButton}
            onClick={handleClick}
            aria-label="Change language"
        >
            <span className={styles.icon}>
                <GlobeIcon />
            </span>
            <span className={styles.text}>
                {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1).toLowerCase()}
            </span>
        </button>
    );
};