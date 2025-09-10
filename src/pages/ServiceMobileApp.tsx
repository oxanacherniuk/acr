import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HeaderLayout } from '../layout/Header/Header';
import styles from './ServicePage.module.css';
import TelegramIcon from '../assets/images/tg.svg';
import ServiceImage from '../assets/images/mobile-app-service.png';
import { QuizLayout } from '../layout/Quiz/Quiz';
import { FooterLayout } from '../layout/Footer/Footer';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import { NavigationButton } from '../components/NavigationButton/NavigationButton';

const schema = yup.object({
    name: yup
        .string()
        .required('Имя обязательно для заполнения')
        .min(2, 'Имя должно содержать минимум 2 символа')
        .max(50, 'Имя слишком длинное')
        .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя может содержать только буквы'),
    email: yup
        .string()
        .required('Email обязателен для заполнения')
        .email('Введите корректный email адрес'),
    phone: yup
        .string()
        .required('Телефон обязателен для заполнения')
        .min(4, 'Телефон должен содержать минимум 4 цифры')
        .transform((value) => value.replace(/\D/g, ''))
});

export function ServiceMobileApp() {
    const [activeTab, setActiveTab] = useState('development');
    const [displayTitle, setDisplayTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const fullText = "Мобильные приложения";
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: ''
        }
    });

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const timer = setTimeout(() => {
                setDisplayTitle(prev => prev + fullText[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, fullText]);

    const onSubmit = async (data: { phone: string; }) => {
        try {
            const formattedData = {
                ...data,
                phone: data.phone.replace(/\D/g, '')
            };

            console.log('Данные формы:', formattedData);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Замечательно! Мы скоро с Вами свяжемся');
            reset();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Произошла ошибка при отправке формы');
        }
    };

    return (
        <div>
            <HeaderLayout />
            <div className={styles['service-page__top']}> 
                <div className='container'>
                    <span className={styles['service-category']}>Услуга</span>
                    <div className={styles['service-header']}>
                        <div className={styles['service-header-content']}>
                            <h1 className={styles['service-title']}>
                                {displayTitle}
                                {currentIndex < fullText.length && <span className={styles['cursor']}>|</span>}
                            </h1>
                            <p className={styles['service-subtitle']}>
                                Создаем нативные и кроссплатформенные мобильные приложения для iOS и Android 
                                с фокусом на пользовательский опыт и производительность.
                            </p>
                        </div>
                        
                        <div className={styles['service-image']}>
                            <img 
                                src={ServiceImage}
                                alt="Разработка мобильных приложений" 
                                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['service-page']}>
                <div className='container'>
                    <div className={styles['hero-block']}>
                        <div className={styles['hero-content']}>
                            <h2>создайте мобильное приложение, которое полюбят ваши пользователи</h2>
                            <p>
                                Превратите вашу бизнес-идею в современное мобильное приложение, 
                                которое будет работать безупречно на iOS и Android.
                            </p>
                            <NavigationButton to={'https://t.me/KP888_Bot'} children={'обсудить проект'} />
                        </div>
                    </div>

                    <div className={styles['benefits-section']}>
                        <h3>почему выбирают мобильные приложения?</h3>
                        <div className={styles['benefits-grid']}>
                            <div className={styles['benefit-item']}>
                                <h4>Прямой доступ к клиентам</h4>
                                <p>Ваше приложение всегда под рукой у пользователей</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Высокая производительность</h4>
                                <p>Нативные технологии обеспечивают максимальную скорость</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Оффлайн-возможности</h4>
                                <p>Работайте даже без интернет-соединения</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Push-уведомления</h4>
                                <p>Поддерживайте вовлеченность пользователей</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['service-content']}>
                        <div className={styles['service-info']}> 
                            <div className={styles['info-section']}>
                                <h3>что входит в разработку мобильного приложения?</h3>
                                
                                <div className={styles['tabs']}>
                                    <div className={styles['tabs-header']}>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'development' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('development')}
                                        >
                                            Разработка
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'design' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('design')}
                                        >
                                            Дизайн и UX
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'functionality' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('functionality')}
                                        >
                                            Функционал
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'publication' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('publication')}
                                        >
                                            Публикация
                                        </button>
                                    </div>

                                    <div className={styles['tabs-content']}>
                                        {activeTab === 'development' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Нативная разработка для iOS</li>
                                                    <li>Нативная разработка для Android</li>
                                                    <li>Кроссплатформенная разработка</li>
                                                    <li>Архитектура приложения (MVP/MVVM)</li>
                                                    <li>Интеграция с бэкенд-API</li>
                                                    <li>Настройка серверной части</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'design' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>UI/UX дизайн по гайдлайнам платформ</li>
                                                    <li>Прототипирование и вайрфрейминг</li>
                                                    <li>Адаптивный дизайн для всех устройств</li>
                                                    <li>Разработка иконки и брендинга</li>
                                                    <li>Анимации и микроинтеракции</li>
                                                    <li>Тестирование юзабилити</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'functionality' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Push-уведомления</li>
                                                    <li>Оффлайн-режим работы</li>
                                                    <li>Интеграция с платежными системами</li>
                                                    <li>Социальные авторизации</li>
                                                    <li>Геолокация и карты</li>
                                                    <li>Камера и галерея</li>
                                                    <li>Чат и мессенджер</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'publication' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Подготовка к публикации в App Store</li>
                                                    <li>Подготовка к публикации в Google Play</li>
                                                    <li>Создание описаний и скриншотов</li>
                                                    <li>Настройка метаданных</li>
                                                    <li>Помощь с модерацией</li>
                                                    <li>Техническая поддержка после запуска</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>инвестируйте в мобильное присутствие вашего бизнеса</h3>
                                <p className={styles['price-note']}>
                                    Мобильное приложение — это не просто тренд, а необходимость 
                                    для современного бизнеса, которая увеличивает лояльность 
                                    клиентов и открывает новые возможности для роста.
                                </p>
                                
                                <div className={styles['price-block']}>
                                    <p className={styles['price-note']}>
                                        Точная стоимость зависит от сложности приложения, 
                                        количество экранов, интеграций и платформ
                                    </p>
                                    <p className={styles['price-note']}>
                                        Техническая поддержка и обновления включены в стоимость
                                    </p>
                                    <div className={styles['price-inner']}>
                                        <span className={styles['main-price']}>от 250 000 ₽</span>
                                        <NavigationButton to={'https://t.me/KP888_Bot'} children={'узнать стоимость'} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__stages']}>
                                <h3>этапы создания вашего мобильного приложения</h3>
                                <div className={styles['timeline']}>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 1</span>
                                        <h4>Анализ и планирование</h4>
                                        <p>Изучаем требования, анализируем рынок, разрабатываем ТЗ</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 2</span>
                                        <h4>Дизайн и прототипирование</h4>
                                        <p>Создаем UI/UX дизайн и интерактивные прототипы</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 3</span>
                                        <h4>Разработка</h4>
                                        <p>Программируем приложение и интегрируем с бэкендом</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 4</span>
                                        <h4>Тестирование</h4>
                                        <p>Проводим комплексное тестирование на разных устройствах</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 5</span>
                                        <h4>Публикация</h4>
                                        <p>Помогаем с публикацией в App Store и Google Play</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 6</span>
                                        <h4>Поддержка</h4>
                                        <p>Обеспечиваем техническую поддержку и обновления</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__faq']}>
                                <h3>ответы на частые вопросы</h3>
                                <div className={styles['faq']}>
                                    <div className={styles['faq-item']}>
                                        <h4>Какие платформы вы поддерживаете?</h4>
                                        <p>Мы разрабатываем приложения для iOS, Android, а также кроссплатформенные решения с использованием React Native</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Сколько времени занимает разработка?</h4>
                                        <p>От 1 до 6 месяцев в зависимости от сложности приложения, количества экранов и интеграций</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Вы помогаете с публикацией в магазинах приложений?</h4>
                                        <p>Да, мы полностью сопровождаем процесс публикации в App Store и Google Play</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>создайте мобильное приложение для вашего бизнеса!</h3>
                                <p>Оставьте контакты, и наш менеджер подготовит для вас индивидуальное коммерческое предложение в течение дня.</p>
                                
                                <form 
                                    className={styles['contact-form']} 
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                >
                                    <div className={styles['input-group']}>
                                        <input 
                                            placeholder='Ваше имя' 
                                            className={`${styles['contact-input']} ${errors.name ? styles['input-error'] : ''}`}
                                            type="text"
                                            {...register('name')}
                                        />
                                        {errors.name && (
                                            <span className={styles['error-message']} role="alert">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className={styles['input-group']}>
                                        <input 
                                            placeholder='Ваш e-mail' 
                                            className={`${styles['contact-input']} ${errors.email ? styles['input-error'] : ''}`}
                                            type="email"
                                            {...register('email')}
                                        />
                                        {errors.email && (
                                            <span className={styles['error-message']} role="alert">
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className={styles['input-group']}>
                                        <input 
                                            placeholder='Ваш номер телефона' 
                                            className={`${styles['contact-input']} ${errors.phone ? styles['input-error'] : ''}`}
                                            type="tel"
                                            {...register('phone')}
                                        />
                                        {errors.phone && (
                                            <span className={styles['error-message']} role="alert">
                                                {errors.phone.message}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className={styles['form-footer']}>
                                        <p className={styles['privacy-text']}>
                                            Отправляя заявку, вы соглашаетесь с Политикой обработки персональных данных и Правилами пользования сайта
                                        </p>
                                        
                                        <button 
                                            type="submit" 
                                            className={styles['contact-button']}
                                            disabled={isSubmitting || !isValid}
                                        >
                                            {isSubmitting ? 'Отправка...' : 'Получить КП'}
                                        </button>
                                    </div>
                                </form>
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
            <BottomNavigation />
        </div>
    );
}