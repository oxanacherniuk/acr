import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './BigDevelopers.module.css';
import { developers } from './developers';
import PortfolioArrow from '../../assets/icons/PortfolioArrow';
import { HeaderLayout } from '../Header/Header';

export function BigDevelopersLayout() {
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const toggleCard = (id: string) => {
        setActiveCard(activeCard === id ? null : id);
    };

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
                            <div 
                                key={developer.id} 
                                className={`${styles['material-card']} ${styles['dark-grey']} ${
                                    activeCard === developer.id ? styles['mc-active'] : ''
                                }`}
                            >
                                <h2>
                                    <span>{developer.firstName.toLowerCase()}</span>
                                    <strong>
                                        <i className={styles['fa-star']}></i>
                                        {developer.position}
                                    </strong>
                                </h2>
                                <div className={styles['mc-content']}>
                                    <div className={styles['img-container']}>
                                        <img 
                                            className={styles['developer-photo']} 
                                            src={developer.photo} 
                                            alt={developer.firstName} 
                                        />
                                    </div>
                                    <div className={styles['mc-description']}>
                                        {developer.description}
                                    </div>
                                </div>
                                <a 
                                    className={styles['mc-btn-action']}
                                    onClick={() => toggleCard(developer.id)}
                                >
                                    <i className={activeCard === developer.id ? styles['fa-arrow-left'] : styles['fa-bars']}></i>
                                </a>
                                <div className={styles['mc-footer']}>
                                    <h4>В портфолио</h4>
                                    <Link 
                                        className={styles['portfolio-button']} 
                                        to={`/developer/${developer.id}`}
                                    >
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