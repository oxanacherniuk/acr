import { useEffect, useRef, useState, useCallback, type JSX } from 'react';
import styles from './Developers.module.css';
import Pavel from '../../assets/images/pavel.jpg';
import Oksana from '../../assets/images/oksana.jpg';
import Maxim from '../../assets/images/maksim.jpg';
import Irina from '../../assets/images/irina.jpg';
import Platon from '../../assets/images/platon.jpg';
import Elena from '../../assets/images/elena.jpg';
import Lev from '../../assets/images/lev.jpg';
import AI from '../../assets/images/eva.jpg';
import PortfolioArrow from '../../assets/icons/PortfolioArrow';
import { NavigationButtonWhite } from '../../components/NavigationButtonWhite/NavigationButtonWhite';

interface Developer {
    id: number;
    name: string;
    photo: string;
    link: string;
}

export function DevelopersLayout(): JSX.Element {
    const [, setIsVisible] = useState<boolean>(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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
        setIsDragging(true);
        setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !carouselRef.current) return;
        e.preventDefault();
        const x = e.pageX - (carouselRef.current.offsetLeft || 0);
        const walk = (x - startX) * 2;
        carouselRef.current.scrollLeft = scrollLeft - walk;
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

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', updateScrollbar);
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

    const developers: Developer[] = [
        { id: 1, name: 'Ева', photo: AI, link: '/developer/ai' },
        { id: 2, name: 'Павел', photo: Pavel, link: '/developer/pavel' },
        { id: 3, name: 'Платон', photo: Platon, link: '/developer/platon' },
        { id: 4, name: 'Оксана', photo: Oksana, link: '/developer/oksana' },
        { id: 5, name: 'Максим', photo: Maxim, link: '/developer/maksim' },
        { id: 6, name: 'Ирина', photo: Irina, link: '/developer/irina' },
        { id: 7, name: 'Елена', photo: Elena, link: '/developer/elena' },
        { id: 8, name: 'Лев', photo: Lev, link: '/developer/lev' },
    ];

    return (
        <div className={styles['developers']} ref={sectionRef}>
            <div className='container'>
                <p className={styles['developers-title']}>команда</p>
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
                        {developers.map((developer) => (
                            <div key={developer.id} className={styles['developer-card']}>
                                <img 
                                    className={styles['developer-photo']} 
                                    src={developer.photo} 
                                    alt={developer.name}
                                    loading="lazy"
                                />
                                <div className={styles['card-bottom']}>
                                    <p className={styles['name']}>{developer.name}</p>
                                    <a className={styles['button-portfolio']} href={developer.link}>
                                        <span>перейти</span>
                                        <PortfolioArrow />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div 
                    ref={scrollbarRef}
                    className={styles['custom-scrollbar']}
                />

                <div className={styles['show-more']}>
                    <NavigationButtonWhite to={'/developers'} children={'показать больше'} />
                </div>
            </div>
        </div>
    );
}