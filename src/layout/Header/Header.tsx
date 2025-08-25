import { useState } from 'react';
import styles from './Header.module.css';
import logo from '../../assets/images/logo.svg';
import { LanguageButton } from '../../components/LanguageButton/LanguageButton';
import { NavigationButton } from '../../components/NavigationButton/NavigationButton';

export function HeaderLayout() {
    const [currentLanguage, setCurrentLanguage] = useState('ru');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLanguageChange = (newLanguage: string) => {
        setCurrentLanguage(newLanguage);
        console.log('Language changed to:', newLanguage);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles['header']}>
            <div className='container'>
                <div className={styles['header-box']}>
                    <a href="/" className={styles['logo']}>
                        <img className={styles['logo-img']} src={logo} alt="Логотип АЦР" />
                    </a>
                    
                    <button 
                        className={`${styles['burger']} ${isMenuOpen ? styles['burger-active'] : ''}`}
                        onClick={toggleMenu}
                        aria-label="Открыть меню"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={styles['nav']}>
                        <ul className={styles['nav-list']}>
                            <li>
                                <a href="/amenties" className={styles['nav-link']}>Услуги</a>
                            </li>
                            <li>
                                <a href="" className={styles['nav-link']}>Аутстаффинг</a>
                            </li>
                            <li>
                                <a href="" className={styles['nav-link']}>Разработчики</a>
                            </li>
                        </ul>
                    </nav>

                    <div className={styles['buttons']}>
                        <LanguageButton 
                            currentLanguage={currentLanguage}
                            onLanguageChange={handleLanguageChange}
                        />
                        <NavigationButton to="/contact" size="small">
                            Связаться
                        </NavigationButton>
                    </div>
                </div>

                <div className={`${styles['mobile-menu']} ${isMenuOpen ? styles['mobile-menu-active'] : ''}`}>
                    <nav className={styles['mobile-nav']}>
                        <ul className={styles['mobile-nav-list']}>
                            <li>
                                <a href="" className={styles['mobile-nav-link']}>Услуги</a>
                            </li>
                            <li>
                                <a href="" className={styles['mobile-nav-link']}>Аутстаффинг</a>
                            </li>
                            <li>
                                <a href="" className={styles['mobile-nav-link']}>Разработчики</a>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles['mobile-buttons']}>
                        <LanguageButton 
                            currentLanguage={currentLanguage}
                            onLanguageChange={handleLanguageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}