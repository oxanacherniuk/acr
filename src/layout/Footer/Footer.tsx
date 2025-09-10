import styles from './Footer.module.css';
import Logo from '../../assets/images/logo.svg';
import TelegramIcon from '../../assets/images/tg.svg';
import VkIcon from '../../assets/images/vk.svg';
import MaxIcon from '../../assets/images/max.svg';
import { useEffect, useRef, useState } from 'react';

export function FooterLayout() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (sectionRef.current) {
                        observer.unobserve(sectionRef.current);
                    }
                }
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div className={styles['footer']} ref={sectionRef}>
            <div className='container'>
                <div className={styles['footer-content']}>
                    <a href="/" className={`${styles['logo-link']} ${isVisible ? styles['animate-logo'] : ''}`}>
                        <img className={styles['logo-img']} src={Logo} alt="Логотип" />
                    </a>
                    
                    <div className={`${styles['footer-box']} ${isVisible ? styles['animate-content'] : ''}`}>
                        <div className={styles['footer-box__col']}>
                            <ul className={styles['col-address']}>
                                <li className={`${styles['address']} ${isVisible ? styles['animate-item-1'] : ''}`}>
                                    Россия, г. Ульяновск
                                </li>
                                <li className={`${styles['address']} ${isVisible ? styles['animate-item-2'] : ''}`}>
                                    Район Северный
                                </li>
                                <li className={`${styles['address']} ${isVisible ? styles['animate-item-3'] : ''}`}>
                                    Ул. Чайковского д.1
                                </li>
                            </ul>
                        </div>
                        
                        <div className={styles['footer-box__col']}>
                            <ul className={styles['footer-links']}>
                                <li className={`${styles['footer-link']} ${isVisible ? styles['animate-item-4'] : ''}`}>
                                    <a href="/amenties">Услуги</a>
                                </li>
                                <li className={`${styles['footer-link']} ${isVisible ? styles['animate-item-5'] : ''}`}>
                                    <a href="/developers">Разработчики</a>
                                </li>
                                <li className={`${styles['footer-link']} ${isVisible ? styles['animate-item-6'] : ''}`}>
                                    <a href="/soglasie-obrabotka-pers-dannih">Политика конфиденциальности</a>
                                </li>
                            </ul>
                        </div>
                        
                        <div className={styles['footer-box__col']}>
                            <div className={`${styles['footer-socials']} ${isVisible ? styles['animate-socials'] : ''}`}>
                                <a className={styles['footer-social']} href="">
                                    <img src={VkIcon} alt="" />
                                </a>
                                <a className={styles['footer-social']} href="">
                                    <img src={TelegramIcon} alt="" />
                                </a>
                                <a className={styles['footer-social']} href="">
                                    <img src={MaxIcon} alt="" />
                                </a>
                            </div>
                            <p className={`${styles['footer-subtext']} ${isVisible ? styles['animate-subtext'] : ''}`}>
                                ⓒ 2025 АЦР
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}