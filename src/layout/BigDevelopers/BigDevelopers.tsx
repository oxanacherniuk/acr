import { Link } from 'react-router-dom';
import styles from './BigDevelopers.module.css';
import { developers } from './developers';
import PortfolioArrow from '../../assets/icons/PortfolioArrow';
import { HeaderLayout } from '../Header/Header';

export function BigDevelopersLayout() {
    return (
        <div>
            <HeaderLayout />
            <div className={styles['developers-page']}>
                <div className='container'>
                    <div className={styles['developers-header']}>
                        <h1 className={styles['developers-title']}>наша команда</h1>
                        <div className={styles['title-decoration']}></div>
                    </div>
                    
                    <div className={styles['developers-grid']}>
                        {developers.map((developer) => (
                            <div key={developer.id} className={styles['developer-card']}>
                                <div className={styles['photo-container']}>
                                    <img 
                                        className={styles['developer-photo']} 
                                        src={developer.photo} 
                                        alt={developer.firstName} 
                                    />
                                    <div className={styles['photo-overlay']}></div>
                                </div>
                                <div className={styles['card-content']}>
                                    <h3 className={styles['name']}>{developer.firstName.toLowerCase()}</h3>
                                    <p className={styles['position']}>{developer.position}</p>
                                    <Link 
                                        className={styles['portfolio-button']} 
                                        to={`/developer/${developer.id}`}
                                    >
                                        <span>в портфолио</span>
                                        <PortfolioArrow />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};