import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faUsers, 
    faCogs, 
    faBuilding,
    type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BottomNavigation.module.css';

interface NavigationItem {
    id: string;
    label: string;
    icon: IconDefinition;
    color: string;
    path: string;
}

const BottomNavigation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState<string>(getActiveItemFromPath());

    function getActiveItemFromPath(): string {
        switch (location.pathname) {
            case '/':
                return 'm-home';
            case '/developers':
                return 'm-team';
            case '/services':
                return 'm-services';
            case '/company':
                return 'm-company';
            default:
                return 'm-home';
        }
    }

    const navigationItems: NavigationItem[] = [
        { id: 'm-home', label: 'Главная', icon: faHome, color: '#3fa8d2ff' , path: '/' },
        { id: 'm-team', label: 'Команда', icon: faUsers, color: '#3fa8d2ff', path: '/developers' },
        { id: 'm-services', label: 'Услуги', icon: faCogs, color: '#3fa8d2ff', path: '/services' },
        { id: 'm-company', label: 'О нас', icon: faBuilding, color: '#3fa8d2ff', path: '/company' }
    ];

    const handleItemClick = (item: NavigationItem) => {
        setActiveItem(item.id);
        navigate(item.path);
    };

    const getSelectorPosition = () => {
        const index = navigationItems.findIndex(item => item.id === activeItem);
        const itemWidth = 66;
        const margin = 12;
        const basePosition = 13;
        return basePosition + index * (itemWidth + margin * 2);
    };

    const getSelectorColor = () => {
        const item = navigationItems.find(item => item.id === activeItem);
        return item ? item.color : '#39a1f4';
    };

    return (
        <div className={styles.containerNav}>
            <nav className={styles.menu}>
                {navigationItems.map((item) => (
                    <div key={item.id} className={styles.navItem}>
                        <input
                            type="radio"
                            name="nav-item"
                            id={item.id}
                            checked={activeItem === item.id}
                            onChange={() => handleItemClick(item)}
                            className={styles.input}
                        />
                        <label 
                            htmlFor={item.id}
                            className={styles.label}
                            style={{ '--sel': item.color } as React.CSSProperties}
                        >
                            <FontAwesomeIcon 
                                icon={item.icon} 
                                className={styles.navIcon}
                            />
                            <span className='text-metallic'>{item.label}</span>
                        </label>
                    </div>
                ))}
                
                <div 
                    className={styles.selector}
                    style={{
                        left: `${getSelectorPosition()}px`,
                        '--hole': getSelectorColor()
                    } as React.CSSProperties}
                />
            </nav>
        </div>
    );
};

export default BottomNavigation;