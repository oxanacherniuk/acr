'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Technologies.module.css';
import { tools } from './tools';

export function TechnologiesLayout() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(5);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setSlidesToShow(2);
            } else if (window.innerWidth < 768) {
                setSlidesToShow(3);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(4);
            } else if (window.innerWidth < 1280) {
                setSlidesToShow(5);
            } else {
                setSlidesToShow(6);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const duplicatedTools = [...tools, ...tools, ...tools, ...tools, ...tools, ...tools, ...tools, ...tools, ...tools];

    const nextSlide = () => {
        setCurrentIndex(prevIndex => {
            const newIndex = prevIndex + 1;
            if (newIndex >= tools.length * 2) {
                setTimeout(() => {
                    setIsTransitioning(false);
                    setCurrentIndex(newIndex - tools.length);
                }, 600);
                
                setIsTransitioning(true);
                return newIndex;
            }
            
            setIsTransitioning(true);
            return newIndex;
        });
    };

    useEffect(() => {
        if (!isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 2000);

        return () => clearInterval(interval);
    }, [slidesToShow]);

    const getTransformValue = () => {
        if (sliderRef.current) {
            const cardWidth = sliderRef.current.offsetWidth / slidesToShow;
            return -currentIndex * cardWidth;
        }
        return -currentIndex * (100 / slidesToShow);
    };

    return (
        <div className={styles.slider}>
            <p className={styles['slider-title']}>Инструменты и технологии</p>
            
            <div className={styles['slider-container']}>
                <div 
                    className={styles['slider-track']}
                    ref={sliderRef}
                >
                    <div 
                        className={styles['slider-inner']}
                        style={{ 
                            transform: `translateX(${getTransformValue()}px)`,
                            transition: isTransitioning ? 'transform 0.6s ease-in-out' : 'none'
                        }}
                    >
                        {duplicatedTools.map((tool, index) => (
                            <div 
                                key={`${tool.id}-${index}`} 
                                className={styles['slider-card']}
                            >
                                <img 
                                    className={styles['tool-image']} 
                                    src={tool.img} 
                                    alt={tool.title} 
                                />
                                <p className={styles['tool-name']}>{tool.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.progress}>
                <div 
                    className={styles['progress-bar']}
                    style={{
                        width: `${((currentIndex % tools.length) / tools.length) * 100}%`
                    }}
                />
            </div>
        </div>
    );
}