import { Link } from 'react-router-dom';
import styles from './BigDevelopers.module.css';
import LeftHand from '../../assets/images/left-hand.png';
import RightHand from '../../assets/images/right-hand.png';
import { developers } from './developers';
import PortfolioArrow from '../../assets/icons/PortfolioArrow';

export function BigDevelopersLayout() {
    return (
        <div className={styles['developers']}>
            <img className={styles['left-hand']} src={LeftHand} alt="" />
            <img className={styles['right-hand']} src={RightHand} alt="" />
            <div className={styles['container-dev']}>
                <p className={styles['developers-title']}>наши разработчики</p>
                <div className={styles['developers-box']}>
                    {developers.map((developer) => (
                        <div key={developer.id} className={styles['developer-card']}>
                            <img 
                                className={styles['developer-photo']} 
                                src={developer.photo} 
                                alt={developer.firstName} 
                            />
                            <div className={styles['card-bottom']}>
                                <p className={styles['name']}>{developer.firstName.toLowerCase()}</p>
                                <Link 
                                    className={styles['button-potfolio']} 
                                    to={`/developer/${developer.id}`}
                                >
                                    <span>в портфолио</span> <PortfolioArrow />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};