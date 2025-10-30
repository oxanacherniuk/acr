import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Portfolio.module.css";
import { sites } from "./sites";
import GradientHeadingLite from "../../components/GradientHeading/GradientHeading";
import Desktop from '../../assets/images/portfolio/desktop.jpg';
import Notebook from '../../assets/images/portfolio/notebook.jpg';
import Mobile from '../../assets/images/portfolio/phone.jpg';

import WebDevIcon from '../../assets/icons/web-dev.svg';
import DesignIcon from '../../assets/icons/design.svg';
import MobileIcon from '../../assets/icons/mobile.svg';
import BotIcon from '../../assets/icons/bot.svg';

export function PortfolioLayout() {
  const [selectedSite, setSelectedSite] = useState(sites[0]);
  const [activeCategory, setActiveCategory] = useState('web');
  const [activeSubcategory, setActiveSubcategory] = useState('Интернет-магазин');
  const [animationClass, setAnimationClass] = useState('');
  const [, setPrevCategory] = useState('web');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const categories = [
    {
      id: 'web',
      name: 'Разработка сайтов',
      icon: WebDevIcon,
      device: 'desktop'
    },
    {
      id: 'design',
      name: 'Дизайн',
      icon: DesignIcon,
      device: 'notebook'
    },
    {
      id: 'mobile',
      name: 'Разработка мобильных приложений',
      icon: MobileIcon,
      device: 'mobile'
    },
    {
      id: 'bot',
      name: 'Разработка ботов',
      icon: BotIcon,
      device: 'mobile'
    }
  ];

  const webSubcategories = ['Интернет-магазин', 'Лендинг', 'Корпоративный сайт'];
  const designSubcategories = ['Интернет-магазин', 'Лендинг', 'Корпоративный сайт'];
  const mobileSubcategories = ['Нативные', 'Вебвью', 'Telegram Mini App'];
  const botSubcategories = ['Чат-боты', 'Боты-информаторы', 'Боты бронирования'];

  const getSubcategories = () => {
    switch (activeCategory) {
      case 'web':
        return webSubcategories;
      case 'design':
        return designSubcategories;
      case 'mobile':
        return mobileSubcategories;
      case 'bot':
        return botSubcategories;
      default:
        return [];
    }
  };

  const currentDevice = categories.find(cat => cat.id === activeCategory)?.device || 'desktop';
  const currentSubcategories = getSubcategories();

  const handleDeviceClick = () => {
    if (selectedSite.link) {
      navigate(selectedSite.link);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    
    const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
    const newIndex = categories.findIndex(cat => cat.id === categoryId);
    const direction = newIndex > currentIndex ? 'slide-out-left' : 'slide-out-right';
    
    setAnimationClass(direction);
    setPrevCategory(activeCategory);
    
    setTimeout(() => {
      setActiveCategory(categoryId);
      
      const newSubcategories = getSubcategories();
      const firstSubcategory = newSubcategories.length > 0 ? newSubcategories[0] : '';
      setActiveSubcategory(firstSubcategory);
      
      const newFilteredSites = sites.filter(site => {
        if (categoryId === 'web') {
          return site.category === 'Разработка сайтов' && site.subcategory === firstSubcategory;
        }
        if (categoryId === 'design') {
          return (site.category === 'Дизайн' || site.category === 'Веб-дизайн' || site.category === 'веб-дизайн') && 
            site.subcategory === firstSubcategory;
        }
        if (categoryId === 'mobile') {
          return site.category === 'Разработка мобильных приложений' && site.subcategory === firstSubcategory;
        }
        if (categoryId === 'bot') {
          return site.category === 'Разработка ботов' && site.subcategory === firstSubcategory;
        }
        return site.category === categoryId;
      });
      
      if (newFilteredSites.length > 0) {
        setSelectedSite(newFilteredSites[0]);
      } else {
        const fallbackSites = sites.filter(site => {
          if (categoryId === 'web') {
            return site.category === 'Разработка сайтов';
          }
          if (categoryId === 'design') {
            return (site.category === 'Дизайн' || site.category === 'Веб-дизайн' || site.category === 'веб-дизайн');
          }
          if (categoryId === 'mobile') {
            return site.category === 'Разработка мобильных приложений';
          }
          if (categoryId === 'bot') {
            return site.category === 'Разработка ботов';
          }
          return site.category === categoryId;
        });
        
        if (fallbackSites.length > 0) {
          setSelectedSite(fallbackSites[0]);
          if (fallbackSites[0].subcategory) {
            setActiveSubcategory(fallbackSites[0].subcategory);
          }
        }
      }
      
      const slideInDirection = newIndex > currentIndex ? 'slide-in-right' : 'slide-in-left';
      setAnimationClass(slideInDirection);
    }, 300);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setActiveSubcategory(subcategory);
    
    const newFilteredSites = sites.filter(site => {
      if (activeCategory === 'web') {
        return site.category === 'Разработка сайтов' && site.subcategory === subcategory;
      }
      if (activeCategory === 'design') {
        return (site.category === 'Дизайн' || site.category === 'Веб-дизайн' || site.category === 'веб-дизайн') && 
        site.subcategory === subcategory;
      }
      if (activeCategory === 'mobile') {
        return site.category === 'Разработка мобильных приложений' && site.subcategory === subcategory;
      }
      if (activeCategory === 'bot') {
        return site.category === 'Разработка ботов' && site.subcategory === subcategory;
      }
      return site.category === activeCategory;
    });
    
    if (newFilteredSites.length > 0) {
      setSelectedSite(newFilteredSites[0]);
    } else {
      const fallbackSites = sites.filter(site => {
        if (activeCategory === 'web') {
          return site.category === 'Разработка сайтов';
        }
        if (activeCategory === 'design') {
          return (site.category === 'Дизайн' || site.category === 'Веб-дизайн' || site.category === 'веб-дизайн');
        }
        if (activeCategory === 'mobile') {
          return site.category === 'Разработка мобильных приложений';
        }
        if (activeCategory === 'bot') {
          return site.category === 'Разработка ботов';
        }
        return site.category === activeCategory;
      });
      
      if (fallbackSites.length > 0) {
        setSelectedSite(fallbackSites[0]);
      }
    }
  };

  const getDeviceImage = () => {
    switch (currentDevice) {
      case 'notebook':
        return Notebook;
      case 'mobile':
        return Mobile;
      default:
        return Desktop;
    }
  };

  return (
    <div className={styles["portfolio"]}>
      <div className="container">
        <GradientHeadingLite
          as="p"
          className={styles["portfolio-title"]}
          blueBoost={20}
          track="viewport"
          baseAngle={25}
        >
          выполненные проекты
        </GradientHeadingLite>
        
        <div className={styles["portfolio-box"]}>
          <div className={styles["portfolio-navigation"]}>
            
            {currentSubcategories.length > 0 && (
              <div className={styles["subcategories"]}>
                <div className={styles["subcategories-list"]}>
                  {currentSubcategories.map((subcategory) => (
                    <button
                      key={subcategory}
                      className={`${styles["subcategory-button"]} ${
                        activeSubcategory === subcategory ? styles["subcategory-button--active"] : ""
                      }`}
                      onClick={() => handleSubcategoryChange(subcategory)}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles["portfolio-preview"]}>
            <div 
              className={`${styles["device-container"]} ${styles[`device-container--${currentDevice}`]} ${styles[animationClass]}`}
              onClick={handleDeviceClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ cursor: selectedSite.link ? 'pointer' : 'default' }}
            >
              <img 
                className={styles["device-image"]} 
                src={getDeviceImage()} 
                alt="Устройство" 
              />
              <div className={`${styles["maket-wrapper"]} ${styles[`maket-wrapper--${currentDevice}`]}`}>
                <div className={styles["maket-scroll-container"]}>
                  <img 
                    className={styles["portfolio-box__maket"]} 
                    src={selectedSite.image} 
                    alt={`Макет ${selectedSite.name}`} 
                  />
                </div>
              </div>
              
              {/* Анимированная надпись "Перейти" */}
              {selectedSite.link && (
                <div className={`${styles["go-button"]} ${isHovered ? styles["go-button--hover"] : ""}`}>
                  <span className={styles["go-button__text"]}>Перейти</span>
                  <div className={styles["go-button__arrow"]}>→</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles["categories-container"]}>
          <div className={styles["categories-wrapper"]}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles["category-button"]} ${
                  activeCategory === category.id ? styles["category-button--active"] : ""
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <div className={styles["category-icon"]}>
                  <img 
                    src={category.icon} 
                    alt={category.name}
                    className={styles["category-icon__image"]}
                  />
                </div>
                <span className={styles["category-name"]}>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}