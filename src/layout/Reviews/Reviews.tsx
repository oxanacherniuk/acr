import { useState, useRef, useEffect } from 'react';
import styles from './Reviews.module.css';
import { reviews } from './review';
import { ReviewFormPopup } from '../../components/ReviewFormPopup/ReviewFormPopup';
import GradientHeadingLite from '../../components/GradientHeading/GradientHeading';

export function ReviewsLayout() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [mouseStart, setMouseStart] = useState(0);
    const [mouseEnd, setMouseEnd] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev >= reviews.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50; 

        if (distance > minSwipeDistance) {
            nextSlide();
        } else if (distance < -minSwipeDistance) {
            prevSlide();
        }
        
        setTouchStart(0);
        setTouchEnd(0);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setMouseStart(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setMouseEnd(e.clientX);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        
        const distance = mouseStart - mouseEnd;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            nextSlide();
        } else if (distance < -minSwipeDistance) {
            prevSlide();
        }
        
        setIsDragging(false);
        setMouseStart(0);
        setMouseEnd(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            setMouseStart(0);
            setMouseEnd(0);
        }
    };

    const handleOpenFormPopup = () => {
        setIsFormPopupOpen(true);
    };

    const handleCloseFormPopup = () => {
        setIsFormPopupOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const currentReview = reviews[currentIndex];

    return (
        <div className={styles['reviews']}>
            <div className='container'>
                <GradientHeadingLite as='p' className={styles['reviews-title']}  blueBoost={1} baseAngle={45}>
отзывы
                </GradientHeadingLite>
                
                <div className={styles['review-container']}>
                    <div 
                        className={styles['review-card']}
                        ref={reviewRef}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    >
                        <div className={styles['review-top']}>
                            <img 
                                className={styles['review-photo']} 
                                src={currentReview.photo} 
                                alt={currentReview.name} 
                            />
                            <div className={styles['review-info']}>
                                <p className={styles['review-name']}>{currentReview.name}</p>
                                <p className={styles['review-position']}></p>
                            </div>
                        </div>
                        
                        <div className={styles['review-content']}>
                            <p className={styles['review-text']}>"{currentReview.text}"</p>
                        </div>

                        <div className={styles['swipe-indicator']}>
                            <span>← Свайпните →</span>
                        </div>
                        
                        <div className={styles['review-navigation']}>
                            <div className={styles['navigation-buttons']}>
                                <button 
                                    className={styles['nav-button']}
                                    onClick={prevSlide}
                                    aria-label="Предыдущий отзыв"
                                >
                                    <div className={styles['button-circle']}>
                                        <span className={styles['arrow']}>←</span>
                                    </div>
                                </button>
                                
                                <button 
                                    className={styles['nav-button']}
                                    onClick={nextSlide}
                                    aria-label="Следующий отзыв"
                                >
                                    <div className={styles['button-circle']}>
                                        <span className={styles['arrow']}>→</span>
                                    </div>
                                </button>
                            </div>
                            
                            <div className={styles['review-counter']}>
                                {String(currentIndex + 1).padStart(2, '0')}/{String(reviews.length).padStart(2, '0')}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['add-review-button-container']}>
                    <button 
                        className={styles['add-review-button']}
                        onClick={handleOpenFormPopup}
                    >
                        оставить отзыв
                    </button>
                </div>
            </div>

            <ReviewFormPopup 
                isOpen={isFormPopupOpen}
                onClose={handleCloseFormPopup}
            />
        </div>
    );
}