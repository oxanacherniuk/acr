import { LinkButton } from '../../components/LinkButton/LinkButton';
import styles from './SecondBanner.module.css';
import { useEffect, useRef, useState } from 'react';
import but from "../../assets/video/but2.webm"
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
        <div date-color="dark" ref={bannerRef}  className={styles['banner']}>
            <div className='container'>
                <div className={styles['banner-content']}>
                    <LinkButton 
                        to={''} 
                        videoType='video/webm'
                        videoSrc={but}
                        className={`${isVisible ? styles['button-visible'] : ''}`}
                    />
                </div>
            </div>
        </div>
    );
}