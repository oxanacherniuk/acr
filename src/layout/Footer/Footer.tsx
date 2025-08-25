import styles from './Footer.module.css';
import Logo from '../../assets/images/logo.svg';
import TelegramIcon from '../../assets/icons/Telegram';
import VkIcon from '../../assets/icons/VK';
import WhatsapIcon from '../../assets/icons/Whatsap';

export function FooterLayout() {
    return (
        <div className={styles['footer']}>
            <div className='container'>
                <a href=""><img className={styles['logo-img']} src={Logo} alt="Логотип" /></a>
                <div className={styles['footer-box']}>
                    <div className={styles['footer-box__col']}>
                        <ul className={styles['col-address']}>
                            <li className={styles['address']}>Россия, г. Ульяновск</li>
                            <li className={styles['address']}>Район Северный</li>
                            <li className={styles['address']}>Ул. Чайковского д.1</li>
                        </ul>
                    </div>
                    <div className={styles['footer-box__col']}>
                        <ul className={styles['footer-links']}>
                            <li className={styles['footer-link']}><a href="">Услуги</a></li>
                            <li className={styles['footer-link']}><a href="">Аустаффинг</a></li>
                            <li className={styles['footer-link']}><a href="">Политика конфиденциальности</a></li>
                        </ul>
                    </div>
                    <div className={styles['footer-box__col']}>
                        <div className={styles['footer-socials']}>
                            <a className={styles['footer-social']} href=""><TelegramIcon /></a>
                            <a className={styles['footer-social']} href=""><VkIcon /></a>
                            <a className={styles['footer-social']} href=""><WhatsapIcon /></a>
                        </div>
                        <p className={styles['footer-subtext']}>ⓒ 2025 АЦР</p>
                    </div>
                </div>
            </div>
        </div>
    )
}