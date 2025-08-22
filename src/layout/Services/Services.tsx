import styles from './Services.module.css';
import helpWeb from '../../assets/images/help-web.png';
import helpAutstaff from '../../assets/images/help-autst.png';
import helpAi from '../../assets/images/help-ai.png';
import helpMobile from '../../assets/images/help-mobile.png';
import helpDesign from '../../assets/images/help-design.png';

export function ServicesLayout() {
    return (
        <div className={styles['services']}>
            <div className='container'>
                <div className={styles['services-box']}>
                    <p className={styles['services-title']}>Мы можем вам помочь</p>
                    <div className={styles['top-row']}>
                        <div className={styles['card-big']}>
                            <p className={styles['card-title']}>РАЗРАБОТКА WEB ПРИЛОЖЕНИЙ</p>
                            <p className={styles['card-text']}>Разрабатываем веб-приложения c нуля или <br />подключаемся на любой стадии проекта</p>
                            <img className={styles['card-image1']} src={helpWeb} alt="" />
                        </div>
                        <div className={styles['card-big']}>
                            <p className={styles['card-title']}>B2B и Аутстаффинг</p>
                            <p className={styles['card-text']}>Выберите специалиста и сразу приступайте <br />к работе — а мы возьмем на себя все <br /> документы и HR-процессы.</p>
                            <img className={styles['card-image2']} src={helpAutstaff} />
                        </div>
                    </div>
                    <div className={styles['bottom-row']}>
                        <div className={styles['card-small']}>
                            <p className={styles['card-title']}>Внедрение <br />Искусственного <br />интелекта</p>
                            <img className={styles['card-image3']} src={helpAi} alt="" />
                        </div>
                        <div className={styles['card-small']}>
                            <p className={styles['card-title']}>Разработка<br />мобильных <br />приложений</p>
                            <img className={styles['card-image4']} src={helpMobile} alt="" />
                        </div>
                        <div className={styles['card-small']}>
                            <p className={styles['card-title']}>дизайн</p>
                            <img className={styles['card-image5']} src={helpDesign} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}