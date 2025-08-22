import styles from './ContactForm.module.css';
import FormImg from '../../assets/images/form-banner.png';
import UserIcon from '../../assets/images/user.svg';
import EmailIcon from '../../assets/images/email.svg';
import PhoneIcon from '../../assets/images/phone.svg';

export function ContactLayout() {
    return (
        <div className={styles['contact']}>
            <div className='container'>
                <p className={styles['contact-title']}>связаться с нами</p>
                <div className={styles['contact-box']}>
                    <form className={styles['contact-form']} action="">
                        <div className={styles['input-group']}>
                            <img src={UserIcon} alt="Имя" className={styles['input-icon']} />
                            <input 
                                placeholder='Введите свое имя' 
                                className={styles['contact-input']} 
                                type="text" 
                            />
                        </div>
                        
                        <div className={styles['input-group']}>
                            <img src={EmailIcon} alt="Email" className={styles['input-icon']} />
                            <input 
                                placeholder='Введите email' 
                                className={styles['contact-input']} 
                                type="email" 
                            />
                        </div>
                        
                        <div className={styles['input-group']}>
                            <img src={PhoneIcon} alt="Телефон" className={styles['input-icon']} />
                            <input 
                                placeholder='Введите номер телефона' 
                                className={styles['contact-input']} 
                                type="tel" 
                            />
                        </div>
                        
                        <button className={styles['contact-button']}>оставить заявку</button>
                        <p className={styles['contact-text']}>Отправляя заявку, вы соглашаетесь с Политикой обработки персональных данных И Правилами пользования сайта</p>
                    </form>
                    <img className={styles['contact-banner']} src={FormImg} alt="Ai" />
                </div>
            </div>
        </div>
    )
}