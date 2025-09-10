import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import logoIcon from '../../assets/images/logo-icon.svg';
import TelegramIcon from '../../assets/images/tg.svg';
import VkIcon from '../../assets/images/vk.svg';
import MaxIcon from '../../assets/images/max.svg';

export function HeaderLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`${styles['header']} ${isScrolled ? styles['scrolled'] : ''} ${isMenuOpen ? styles['menu-open'] : ''}`}>
                <div className='container'>
                    <div className={styles['header-box']}>
                        <a href="/" className={styles['logo']}>
                            <img 
                                className={styles['logo-img']} 
                                src={logoIcon} 
                                alt="Логотип АЦР" 
                            />
                        </a>
                        
                        <div className={`${styles['divider']} ${isScrolled ? styles['divider-hidden'] : ''}`}></div>

                        <button 
                            className={`${styles['burger']} ${isMenuOpen ? styles['burger-active'] : ''} ${isScrolled ? styles['burger-scrolled'] : ''}`}
                            onClick={toggleMenu}
                            aria-label="Открыть меню"
                        >
                            <span className={styles['burger-line']}></span>
                            <span className={styles['burger-line']}></span>
                        </button>
                    </div>
                </div>
            </header>

            <div className={`${styles['menu-overlay']} ${isMenuOpen ? styles['menu-overlay-active'] : ''}`}>
                <div className={styles['menu-content']}>
                    <nav className={styles['fullscreen-nav']}>
                        <ul className={styles['fullscreen-nav-list']}>
                            <li>
                                <a href="/" className={styles['fullscreen-nav-link']}>Главная</a>
                            </li>
                            <li>
                                <a href="/developers" className={styles['fullscreen-nav-link']}>Команда</a>
                            </li>
                            <li>
                                <a href="/services" className={styles['fullscreen-nav-link']}>Услуги</a>
                            </li>
                            <li>
                                <a href="/company" className={styles['fullscreen-nav-link']}>О компании</a>
                            </li>
                        </ul>
                    </nav>
                    
                    <div className={styles['menu-social-buttons']}>
                        <a className={styles['social-button']} href="#">
                            <img src={TelegramIcon} alt="telegram" />
                        </a>
                        <a className={styles['social-button']} href="#">
                            <img src={VkIcon} alt="vkontakte" />
                        </a>
                        <a className={styles['social-button']} href="#">
                            <img src={MaxIcon} alt="max" />
                        </a>
                    </div>

                    <div className={styles['contact-info']}>
                        <div className={styles['contact-column']}>
                            <p className={styles['contact-item']}>+7 (905) 349-14-49</p>
                            <p className={styles['contact-item']}>acr@mail.ru</p>
                        </div>
                        <div className={styles['contact-column']}>
                            <p className={styles['contact-item']}>г. Ульяновск, ул. Чайковского, д. 1</p>
                            <p className={styles['contact-item']}>Пн-Пт: 9:00-18:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}