import styles from './ServicePage.module.css';
import TelegramIcon from '../assets/images/tg.svg';
import { HeaderLayout } from '../layout/Header/Header';
import ServiceImage from '../assets/images/web-app-service.png';
import { QuizLayout } from '../layout/Quiz/Quiz';
import { FooterLayout } from '../layout/Footer/Footer';

export function ServiceWebApp() {
    return (
        <div>
            <HeaderLayout />
            <div className={styles['service-page']}>
                <div className='container'>
                    <span className={styles['service-category']}>Услуга</span>
                    <div className={styles['service-header']}>
                        <div className={styles['service-header-content']}>
                            <h1 className={styles['service-title']}>РАЗРАБОТКА WEB ПРИЛОЖЕНИЙ</h1>
                        </div>
                        
                        <div className={styles['service-image']}>
                            <img 
                                src={ServiceImage}
                                alt="Разработка web приложений" 
                                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                        </div>
                    </div>

                    <div className={styles['service-content']}>
                        <div className={styles['service-info']}>
                            <div className={styles['info-section']}>
                                <h3>описание</h3>
                                <p>Разрабатываем веб-приложения c нуля или подключаемся на любой стадии проекта. 
                                Создаем современные, масштабируемые и высокопроизводительные решения 
                                с использованием передовых технологий и лучших практик разработки.</p>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>условия работы</h3>
                                <ol>
                                    <li>Анализ требований и проектирование архитектуры</li>
                                    <li>Разработка по методологии Agile</li>
                                    <li>Поэтапная сдача проекта</li>
                                    <li>Техническая поддержка после запуска</li>
                                    <li>Гибкие условия сотрудничества</li>
                                    <li>Прозрачная отчетность и коммуникация</li>
                                </ol>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>сроки выполнения</h3>
                                <p>От 2 недель до 6 месяцев в зависимости от сложности проекта. 
                                Мы обеспечиваем соблюдение сроков благодаря тщательному планированию 
                                и использованию современных методологий разработки.</p>
                            </div>

                            <div className={styles['info-section'] + ' ' + styles['price-section']}>
                                <h3 className={styles['price-label']}>стоимость:</h3>
                                <p className={styles['price']}>От 150 000 ₽</p>
                            </div>
                        </div>

                        <div className={styles['service-cta']}>
                            <a 
                                href="https://t.me/KP888_Bot" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles['cta-button']}
                            >
                                Обсудить проект
                                <img src={TelegramIcon} alt="Telegram" />
                            </a>
                        </div>
                    </div>
                    <QuizLayout />
                </div>
            </div>
            <FooterLayout />
        </div>
    );
}