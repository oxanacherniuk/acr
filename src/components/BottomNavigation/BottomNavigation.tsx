import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BottomNavigation.module.css';

import HomeIcon from '../../assets/images/home.svg';
import ServicesIcon from '../../assets/images/code.svg';
import DevelopersIcon from '../../assets/images/developers.svg';
import CompanyIcon from '../../assets/images/about.svg';

interface NavigationItem {
    path: string;
    label: string;
    icon: string;
    alt: string;
}

const navigationItems: NavigationItem[] = [
    {
        path: '/',
        label: 'Главная',
        icon: HomeIcon,
        alt: 'Иконка главной страницы'
    },
    {
        path: '/services',
        label: 'Услуги',
        icon: ServicesIcon,
        alt: 'Иконка услуг'
    },
    {
        path: '/developers',
        label: 'Разработчики',
        icon: DevelopersIcon,
        alt: 'Иконка разработчиков'
    },
    {
        path: '/company',
        label: 'О компании',
        icon: CompanyIcon,
        alt: 'Иконка о компании'
    }
];

const BottomNavigation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <nav className={styles.bottomNav}>
        <div className={styles.navContainer}>
            {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
                <button
                key={item.path}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={() => handleNavigation(item.path)}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                >
                <div className={styles.iconContainer}>
                    <img
                    src={item.icon}
                    alt={item.alt}
                    className={styles.icon}
                    />
                </div>
                <span className={styles.label}>{item.label}</span>
                </button>
            );
            })}
        </div>
        </nav>
    );
};

export default BottomNavigation;