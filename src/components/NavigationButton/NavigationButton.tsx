import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationButton.module.css';

interface NavigationButtonProps {
    to: string;
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    className?: string;
    onClick?: () => void;
    external?: boolean;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
    to,
    children,
    size = 'medium',
    className = '',
    onClick,
    external = false,
}) => {
    if (external) {
        return (
        <a
            href={to}
            className={`${styles.navButton} ${styles[size]} ${className}`}
            onClick={onClick}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
        );
    }

    return (
        <Link
            to={to}
            className={`${styles.navButton} ${styles[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};