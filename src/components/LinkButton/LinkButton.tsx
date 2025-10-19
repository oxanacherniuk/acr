import React from 'react';
import styles from './LinkButton.module.css';
import { FadeIn } from '../Motions';
interface LinkButtonProps {
    to: string;
    children?: React.ReactNode ; 
    icon?: string;
    alt?: string; 
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string; 
    className?: string; 
    onClick?: () => void; 
    videoSrc?: string; // Добавляем опциональное видео
    videoType?: string; // Тип видео, например "video/mp4"
}
export const LinkButton: React.FC<LinkButtonProps> = ({
    to,
    children,
    icon,
    alt = 'Button icon',
    target = '_self',
    rel = target === '_blank' ? 'noopener noreferrer' : undefined,
    className = '',
    onClick,
    videoSrc,
    videoType = 'video/mp4'
}) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
       <FadeIn>
         <a
            href={to}
            className={`${styles['link-button']} ${className}`}
            target={target}
            rel={rel}
            onClick={handleClick}
        >
            {/* Видео на фоне */}
            {videoSrc && (
                <video 
                    className={styles['button-video']}
                    autoPlay
                    muted
                    loop
                    pip={"false"}
                    playsInline
                >
                    <source src={videoSrc} type={videoType} />
                </video>
            )}
            
            {children && <span className={styles['button-text']}>{children}</span>}
            {icon && (
                <img 
                    src={icon} 
                    alt={alt} 
                    className={styles['button-icon']}
                />
            )}
        </a>
       </FadeIn>
    );
};