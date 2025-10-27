import { useEffect, useRef, useState, useCallback, type JSX } from 'react';
import styles from './Developers.module.css';
import Pavel from '../../assets/images/pavel.jpg';
import Oksana from '../../assets/images/oksana.jpg';
import Maxim from '../../assets/images/maksim.jpg';
import Irina from '../../assets/images/irina.jpg';
import Platon from '../../assets/images/platon.jpg';
import Elena from '../../assets/images/elena.jpg';
import Lev from '../../assets/images/lev.jpg';
import Eva from '../../assets/images/eva.png';
import { NavigationButtonWhite } from '../../components/NavigationButtonWhite/NavigationButtonWhite';
import { MoveLeft, MoveUp } from '../../components/Motions';
import { VideoCard } from './VideoCard';
import evaMp4 from '../../assets/video/eva.mp4';
import evaWebm from '../../assets/video/eva.webm';
import paMp4 from '../../assets/video/pa.mp4';
import paWebm from '../../assets/video/pa.webm';
import platonMp4 from '../../assets/video/platon.mp4';
import platonWebm from '../../assets/video/platon.webm';
import oxMp4 from '../../assets/video/ox2.mp4';
import oxWebm from '../../assets/video/ox2.webm';
import maxMp4 from '../../assets/video/max.mp4';
import maxWebm from '../../assets/video/max.webm';
import iraMp4 from '../../assets/video/ira.mp4';
import iraWebm from '../../assets/video/ira.webm';
import elenaMp4 from '../../assets/video/elena.mp4';
import elenaWebm from '../../assets/video/elena.webm';
import levaMp4 from '../../assets/video/leva.mp4';
import levaWebm from '../../assets/video/leva.webm';
import GradientHeading from '../../components/GradientHeading/GradientHeading';

interface Developer {
  id: number;
  name: string;
  link: string;
  mp4: string;
  webm?: string;
  poster?: string;
}


export function DevelopersLayout(): JSX.Element {
    const [, setIsVisible] = useState<boolean>(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Определяем мобильное устройство
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const developers: Developer[] = [
        { id: 1, name: 'Ева', link: '/developer/ai', mp4: evaMp4, webm: evaWebm, poster: Eva },
        { id: 2, name: 'Павел', mp4: paMp4, webm: paWebm, poster: Pavel, link: '/developer/pavel' },
        { id: 3, name: 'Платон', mp4: platonMp4, webm: platonWebm, poster: Platon, link: '/developer/platon' },
        { id: 4, name: 'Оксана', mp4: oxMp4, webm: oxWebm, poster: Oksana, link: '/developer/oksana' },
        { id: 5, name: 'Максим', mp4: maxMp4, webm: maxWebm, poster: Maxim, link: '/developer/maksim' },
        { id: 6, name: 'Ирина', mp4: iraMp4, webm: iraWebm, poster: Irina, link: '/developer/irina' },
        { id: 7, name: 'Елена', mp4: elenaMp4, webm: elenaWebm, poster: Elena, link: '/developer/elena' },
        { id: 8, name: 'Лев', mp4: levaMp4, webm: levaWebm, poster: Lev, link: '/developer/lev' },
    ];
// Функция для получения видимых карточек
    const getVisibleCards = useCallback(() => {
        const total = developers.length;
        const visibleIndices = [];
        
        for (let i = -2; i <= 2; i++) {
            let index = activeIndex + i;
            
            if (index < 0) {
                index = total + index;
            } else if (index >= total) {
                index = index % total;
            }
            
            visibleIndices.push({
                index,
                position: i,
                data: developers[index]
            });
        }
        
        return visibleIndices;
    }, [activeIndex, developers]);

    const handleCardClick = useCallback((index: number, position: number, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (position === 0) {
            // Если карточка уже активна - переход по ссылке
            window.location.href = developers[index].link;
        } else {
            // Если не активна - делаем активной
            setActiveIndex(index);
        }
    }, [developers]);

    const handleNext = useCallback(() => {
        setActiveIndex(prev => (prev + 1) % developers.length);
    }, [developers.length]);

    const handlePrev = useCallback(() => {
        setActiveIndex(prev => (prev - 1 + developers.length) % developers.length);
    }, [developers.length]);

    // Свайп
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return;
        
        const endX = e.pageX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
        
        setIsDragging(false);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 30) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
        
        setIsDragging(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const visibleCards = getVisibleCards();

    return (
        <div className={styles['developers']} ref={sectionRef}>
            <div className='container'>
                <MoveLeft>
                    <GradientHeading as='h2' theme="onDark" track="element" className={styles["developers-title"]}>
                        команда
                    </GradientHeading>
                </MoveLeft>
            </div>

            <div className={styles['container-dev']}>
                {/* Кнопки навигации */}
                <button 
                    className={styles['nav-button']} 
                    onClick={handlePrev}
                    aria-label="Предыдущий"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                <button 
                    className={styles['nav-button']} 
                    onClick={handleNext}
                    aria-label="Следующий"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <div 
                    className={styles['circular-carousel']}
                    ref={carouselRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={() => setIsDragging(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className={styles['carousel-container']}>
                        {visibleCards.map(({ index, position, data }) => (
                            <div 
                                key={`${data.id}-${position}`}
                                className={`${styles['card-wrapper']} ${styles[`position-${position}`]}`}
                                onClick={(e) => handleCardClick(index, position, e)}
                            >
                                <VideoCard
                                    name={data.name}
                                    link={data.link}
                                    poster={data.poster}
                                    mp4={data.mp4}
                                    webm={data.webm}
                                    isDragging={isDragging}
                                    isActive={position === 0}
                                    isMobile={isMobile}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Индикаторы */}
                <div className={styles['indicators']}>
                    {developers.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles['indicator']} ${index === activeIndex ? styles['active'] : ''}`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Перейти к ${developers[index].name}`}
                        />
                    ))}
                </div>

                <MoveUp>
                    <div className={styles['show-more']}>
                        <NavigationButtonWhite to={'/developers'}>показать больше</NavigationButtonWhite>
                    </div>
                </MoveUp>
            </div>
        </div>
    );
}