import styles from './Developers.module.css';
import Pavel from '../../assets/images/pavel.png';
import II from '../../assets/images/ai.png';
import Oksana from '../../assets/images/oksana.png';
import { NavigationButton } from '../../components/NavigationButton/NavigationButton';
import LeftHand from '../../assets/images/left-hand.png';
import RightHand from '../../assets/images/right-hand.png';
import PortfolioArrow from '../../assets/icons/PortfolioArrow';

export function DevelopersLayout() {
    return (
        <div className={styles['developers']}>
            <img className={styles['left-hand']} src={LeftHand} alt="" />
            <img className={styles['right-hand']} src={RightHand} alt="" />
            <div className='container'>
                <p className={styles['developers-title']}>наши разработчики</p>
                <div className={styles['developers-box']}>
                    <div className={styles['developer-card']}>
                        <img className={styles['developer-photo']} src={Pavel} alt="" />
                        <div className={styles['card-bottom']}>
                            <p className={styles['name']}>павел</p>
                            <a className={styles['button-potfolio']} href=""><span>в портфолио</span> <PortfolioArrow /></a>
                        </div>
                    </div>
                    <div className={styles['developer-card']}>
                        <img className={styles['developer-photo']} src={II} alt="" />
                        <div className={styles['card-bottom']}>
                            <p className={styles['name']}>ии</p>
                            <a className={styles['button-potfolio']} href=""><span>в портфолио</span> <PortfolioArrow /></a>
                        </div>
                    </div>
                    <div className={styles['developer-card']}>
                        <img className={styles['developer-photo']} src={Oksana} alt="" />
                        <div className={styles['card-bottom']}>
                            <p className={styles['name']}>оксана</p>
                            <a className={styles['button-potfolio']} href=""><span>в портфолио</span> <PortfolioArrow /></a>
                        </div>
                    </div>
                </div>
                <div className={styles['show-more']}>
                    <NavigationButton to={'/'} children={'показать больше'} />
                </div>
            </div>
        </div>
    );
};