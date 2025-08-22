import { NavigationButton } from '../../components/NavigationButton/NavigationButton';
import styles from './Banner.module.css';
import bannerImg from '../../assets/images/banner-image.png';

export function BannerLayout() {
    return (
        <div className={styles['banner']}>
            <div className='container'>
                <div className={styles['banner-box']}>
                    <div className={styles['left-col']}>
                        <h1>разработка</h1>
                        <h2>web/мобильных приложений</h2>
                        <p> С 2018 года помогаем бизнесу расти, предлагая услуги разработки программного обеспечения "под ключ"</p>
                        <NavigationButton to={'/'} size="medium" children={'оставить заявку'} />
                    </div>
                    <div className={styles['right-col']}>
                        <img src={bannerImg} alt="Ai" />
                    </div>
                </div>
            </div>
        </div>
    )
}