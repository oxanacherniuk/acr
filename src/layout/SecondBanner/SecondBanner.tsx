import { LinkButton } from '../../components/LinkButton/LinkButton';
import styles from './SecondBanner.module.css';
import { useEffect, useRef, useState } from 'react';
import but from "../../assets/video/but2.webm"
import GradientHeadingLite from '../../components/GradientHeading/GradientHeading';

export function SecondBannerLayout() {
    const [isVisible, setIsVisible] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px' 
            }
        );

        if (bannerRef.current) {
            observer.observe(bannerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div date-color="dark" ref={bannerRef} className={styles['banner']}>
            <div className='container'>
                <GradientHeadingLite as='p' className="h2" blueBoost={1} baseAngle={45}>
                    акции
                </GradientHeadingLite>
                <div className={styles['banner-content']}>
                    <div className={`${styles['arrow-left']} ${isVisible ? styles['arrow-visible'] : ''}`}>
                        <div className={styles["service-arrow"]}>→</div>
                    </div>
                    
                    <LinkButton 
                        to={'/stocks'} 
                        videoType='video/webm'
                        videoSrc={but}
                        className={`${isVisible ? styles['button-visible'] : ''}`}
                    />
                    
                    <div className={`${styles['arrow-right']} ${isVisible ? styles['arrow-visible'] : ''}`}>
                        <div className={styles["service-arrow"]}>→</div>
                    </div>
                </div>
            </div>
        </div>
    );
}