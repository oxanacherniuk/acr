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
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [activeIndex, setActiveIndex] = useState(2); // Центральный элемент по умолчанию

    const developers: Developer[] = [

        { id: 2, name: 'Павел', mp4: paMp4, webm: paWebm, poster: Pavel, link: '/developer/pavel' },
        { id: 3, name: 'Платон', mp4: platonMp4, webm: platonWebm, poster: Platon, link: '/developer/platon' },
                { id: 1, name: 'Ева', link: '/developer/ai', mp4: evaMp4, webm: evaWebm, poster: Eva },
        { id: 4, name: 'Оксана', mp4: oxMp4, webm: oxWebm, poster: Oksana, link: '/developer/oksana' },
        { id: 5, name: 'Максим', mp4: maxMp4, webm: maxWebm, poster: Maxim, link: '/developer/maksim' },
        { id: 6, name: 'Ирина', mp4: iraMp4, webm: iraWebm, poster: Irina, link: '/developer/irina' },
        { id: 7, name: 'Елена', mp4: elenaMp4, webm: elenaWebm, poster: Elena, link: '/developer/elena' },
        { id: 8, name: 'Лев', mp4: levaMp4, webm: levaWebm, poster: Lev, link: '/developer/lev' },
    ];

    // Функция для определения класса карточки в зависимости от позиции
    const getCardClass = useCallback((index: number): string => {
        const diff = Math.abs(index - activeIndex);
        
        if (diff === 0) {
            return styles['active-card']; // Центральный активный
        } else if (diff === 1) {
            return styles['adjacent-card']; // Соседние (слева и справа)
        } else {
            return styles['distant-card']; // Остальные
        }
    }, [activeIndex]);

    const handleCardClick = useCallback((index: number) => {
        setActiveIndex(index);
        // Прокручиваем к выбранному элементу
        if (carouselRef.current) {
            const cardWidth = 320 + 30; // width + gap
            const scrollPosition = index * cardWidth - (carouselRef.current.clientWidth / 2 - cardWidth / 2);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    const updateScrollbar = useCallback(() => {
        if (carouselRef.current && scrollbarRef.current) {
            const carousel = carouselRef.current;
            const scrollbar = scrollbarRef.current;
            
            const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
            const scrollLeft = carousel.scrollLeft;
            
            if (scrollWidth > 0) {
                const thumbPosition = (scrollLeft / scrollWidth) * 100;
                const thumbWidth = (carousel.clientWidth / carousel.scrollWidth) * 100;
                
                scrollbar.style.setProperty('--thumb-position', `${thumbPosition}%`);
                scrollbar.style.setProperty('--thumb-width', `${thumbWidth}%`);
            }
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
        
        if (carouselRef.current) {
            carouselRef.current.style.cursor = 'grabbing';
        }
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            if (carouselRef.current) {
                carouselRef.current.style.cursor = 'grab';
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (carouselRef.current) {
            carouselRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !carouselRef.current) return;
        e.preventDefault();
        const x = e.pageX - (carouselRef.current.offsetLeft || 0);
        const walk = (x - startX) * 2;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    // Обновляем активный индекс при скролле
    useEffect(() => {
        const handleScroll = () => {
            if (!carouselRef.current) return;
            
            const scrollLeft = carouselRef.current.scrollLeft;
            const cardWidth = 320 + 30; // width + gap
            const centerPosition = scrollLeft + carouselRef.current.clientWidth / 2;
            
            const newActiveIndex = Math.round(centerPosition / cardWidth);
            if (newActiveIndex >= 0 && newActiveIndex < developers.length && newActiveIndex !== activeIndex) {
                setActiveIndex(newActiveIndex);
            }
        };

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (carousel) {
                carousel.removeEventListener('scroll', handleScroll);
            }
        };
    }, [activeIndex, developers.length]);

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

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', updateScrollbar);
            carousel.style.cursor = 'grab';
            updateScrollbar();

            window.addEventListener('resize', updateScrollbar);
        }

        const handleScrollbarClick = (e: MouseEvent) => {
            if (scrollbarRef.current && carouselRef.current) {
                const scrollbar = scrollbarRef.current;
                const rect = scrollbar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                
                const scrollWidth = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
                carouselRef.current.scrollTo({
                    left: percentage * scrollWidth,
                    behavior: 'smooth'
                });
            }
        };

        if (scrollbarRef.current) {
            scrollbarRef.current.addEventListener('click', handleScrollbarClick);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            if (carousel) {
                carousel.removeEventListener('scroll', updateScrollbar);
            }
            window.removeEventListener('resize', updateScrollbar);
            if (scrollbarRef.current) {
                scrollbarRef.current.removeEventListener('click', handleScrollbarClick);
            }
        };
    }, [updateScrollbar]);

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
                <div
                    className={styles['developers-carousel']}
                    ref={carouselRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    <div className={styles['carousel-inner']}>
                        {developers.map((dev, index) => (
                            <div 
                                key={dev.id} 
                                className={`${styles['developer-card-wrapper']} ${getCardClass(index)}`}
                                onClick={() => handleCardClick(index)}
                            >
                                <MoveUp opacity={0} delays={dev.id * 0.1}>
                                    <VideoCard
                                        name={dev.name}
                                        link={dev.link}
                                        poster={dev.poster}
                                        mp4={dev.mp4}
                                        webm={dev.webm}
                                        isDragging={isDragging}
                                        isActive={index === activeIndex}
                                    />
                                </MoveUp>
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={scrollbarRef} className={styles['custom-scrollbar']} />

                <MoveUp>
                    <div className={styles['show-more']}>
                        <NavigationButtonWhite to={'/developers'}>показать больше</NavigationButtonWhite>
                    </div>
                </MoveUp>
            </div>
        </div>
    );
}