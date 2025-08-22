import { useState } from 'react';
import styles from './Reviews.module.css';
import { reviews } from './review';
import LeftArrow from '../../assets/images/arrow-left.png';
import RightArrow from '../../assets/images/arrow-right.png';

export function ReviewsLayout() {
    const [currentGroup, setCurrentGroup] = useState(0);
    const slidesToShow = 4;
    const totalSlides = reviews.length;
    const totalGroups = Math.ceil(totalSlides / slidesToShow);

    const nextSlide = () => {
        setCurrentGroup(prev => (prev >= totalGroups - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentGroup(prev => (prev === 0 ? totalGroups - 1 : prev - 1));
    };

    const goToSlide = (groupIndex: number) => {
        setCurrentGroup(groupIndex);
    };

    // Вычисляем смещение для трека
    const trackOffset = -currentGroup * (277 + 30) * slidesToShow;

    return (
        <div className={styles['reviews']}>
            <div className='container'>
                <p className={styles['reviews-title']}>Что о нас говорят</p>
                
                <div className={styles['reviews-container']}>
                    <div 
                        className={styles['reviews-track']}
                        style={{ 
                            transform: `translateX(${trackOffset}px)`,
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        {reviews.map((review) => (
                            <div key={review.id} className={styles['review-card']}>
                                <div className={styles['review-top']}>
                                    <img 
                                        className={styles['review-photo']} 
                                        src={review.photo} 
                                        alt={review.name} 
                                    />
                                    <p className={styles['review-name']}>{review.name}</p>
                                </div>
                                <div className={styles['review-content']}>
                                    <p className={styles['review-text']}>{review.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles['reviews-dots']}>
                    {Array.from({ length: totalGroups }).map((_, index) => (
                        <button
                            key={index}
                            className={`${styles['dot']} ${
                                currentGroup === index ? styles['dot-active'] : ''
                            }`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
            
            <div className={styles['reviews-box']}>
                <div className={styles['reviews-buttons']}>
                    <button 
                        className={styles['reviews-button__left']}
                        onClick={prevSlide}
                    >
                        <img src={LeftArrow} alt="Назад" />
                    </button>
                    <button 
                        className={styles['reviews-button__right']}
                        onClick={nextSlide}
                    >
                        <img src={RightArrow} alt="Вперед" />
                    </button>
                </div>
            </div>
        </div>
    );
}