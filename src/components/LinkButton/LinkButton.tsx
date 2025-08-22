import React from 'react';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
    to: string;
    children: React.ReactNode; 
    icon?: string;
    alt?: string; 
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string; 
    className?: string; 
    onClick?: () => void; 
}

export const LinkButton: React.FC<LinkButtonProps> = ({
    to,
    children,
    icon,
    alt = 'Button icon',
    target = '_self',
    rel = target === '_blank' ? 'noopener noreferrer' : undefined,
    className = '',
    onClick
}) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
        e.preventDefault();
        onClick();
        }
    };

    return (
        <a
            href={to}
            className={`${styles['link-button']} ${className}`}
            target={target}
            rel={rel}
            onClick={handleClick}
        >
        <span className={styles['button-text']}>{children}</span>
        {icon && (
            <img 
                src={icon} 
                alt={alt} 
                className={styles['button-icon']}
            />
        )}
        </a>
    );
};