import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HeaderLayout } from '../layout/Header/Header';
import styles from './ServicePage.module.css';
import TelegramIcon from '../assets/images/tg.svg';
import CorporateImage from '../assets/images/corporate.png';
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

export function ServiceCorporate() {
    const [activeTab, setActiveTab] = useState('foundation');
    const [displayTitle, setDisplayTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const fullText = "Корпоративный сайт";
    
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
                                Корпоративный сайт — ваше мощное представительство в интернете. 
                                Всё для имиджа, доверия и лидов.
                            </p>
                            <p className={styles['service-subtitle']}>
                                Создадим современный и функциональный сайт, который расскажет о вашей компании 
                                лучше любого менеджера и будет работать на вас 24/7.
                            </p>
                        </div>
                        
                        <div className={styles['service-image']}>
                            <img 
                                src={CorporateImage}
                                alt="Современный корпоративный сайт" 
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
                            <h2>Корпоративный сайт — <br /> <span className={styles['blue-text']}>лицо вашего бизнеса</span> <br /> в digital-пространстве</h2>
                            <p>
                                Откройте представительство своей компании в интернете с помощью создания 
                                современного и функционального корпоративного сайта.
                            </p>
                            <NavigationButton to={''} children={'обсудить проект'} />
                        </div>
                    </div>

                    <div className={styles['benefits-section']}>
                        <h3>почему выбирают корпоративный сайт?</h3>
                        <div className={styles['benefits-grid']}>
                            <div className={styles['benefit-item']}>
                                <h4>Укрепление имиджа и доверия</h4>
                                <p>Профессиональное представление вашей компании в сети</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Привлечение клиентов и заявок</h4>
                                <p>Постоянный поток качественных лидов 24/7</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Домен и хостинг в подарок</h4>
                                <p>Полностью бесплатное размещение в первый год</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Полная готовность к работе</h4>
                                <p>Запускаем сразу после завершения разработки</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['service-content']}>
                        <div className={styles['service-info']}> 
                            <div className={styles['info-section']}>
                                <h3>что входит в стоимость корпоративного сайта?</h3>
                                
                                <div className={styles['tabs']}>
                                    <div className={styles['tabs-header']}>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'foundation' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('foundation')}
                                        >
                                            Фундамент и Безопасность
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'strategy' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('strategy')}
                                        >
                                            Стратегия и Дизайн
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'functionality' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('functionality')}
                                        >
                                            Функционал
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'technical' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('technical')}
                                        >
                                            Техническое качество
                                        </button>
                                    </div>

                                    <div className={styles['tabs-content']}>
                                        {activeTab === 'foundation' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Домен и хостинг на 1 год в подарок</li>
                                                    <li>Установка SSL сертификата</li>
                                                    <li>Регулярное резервное копирование</li>
                                                    <li>Загрузка сайта на хостинг клиента</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'strategy' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Анализ тематики и конкурентов</li>
                                                    <li>Анализ целевой аудитории</li>
                                                    <li>Маркетинговая стратегия</li>
                                                    <li>Индивидуальный мотивирующий дизайн</li>
                                                    <li>Полная проработка структуры сайта (до 20 страниц)</li>
                                                    <li>Составление УТП</li>
                                                    <li>Слайд-шоу на главной странице</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'functionality' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Подключение окон с рабочими формами заказа</li>
                                                    <li>Формы обратной связи (звонок, мессенджер)</li>
                                                    <li>Фото- или видео-галерея с увеличением</li>
                                                    <li>Фото-, видео-отзывы (на выбор)</li>
                                                    <li>Каталог услуг и продукции</li>
                                                    <li>Возможность скачать прайс-лист</li>
                                                    <li>Модуль с логотипами клиентов и партнеров</li>
                                                    <li>Интерактивная карта (Яндекс)</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'technical' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Адаптация для всех устройств</li>
                                                    <li>Кроссбраузерность</li>
                                                    <li>Базовая СЕО-оптимизация</li>
                                                    <li>Ускорение загрузки сайта</li>
                                                    <li>Закладываем потенциал для расширения функционала</li>
                                                    <li>Тестирование всего проекта на наличие ошибок</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>инвестиция в репутацию и рост, а не просто траты на сайт</h3>
                                <p className={styles['info-section__text']}>
                                    Мы создаем не «визитку», а рабочий маркетинговый инструмент, 
                                    который окупает вложения за счет привлечения качественных клиентов.
                                </p>
                                
                                <div className={styles['price-block']}>
                                    <p className={styles['price-note']}>Итоговая стоимость рассчитывается индивидуально, исходя из сложности дизайна и объема функционала</p>
                                    <div className={styles['price-inner']}>
                                        <span className={styles['main-price']}>от 200 000 ₽</span>
                                        <NavigationButton to={''} children={'узнать стоимость'} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__stages']}>
                                <h3>этапы создания вашего сайта</h3>
                                <div className={styles['timeline']}>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 1</span>
                                        <h4>Погружение</h4>
                                        <p>Изучаем вашу компанию, ЦА и конкурентов. Согласовываем структуру.</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 2</span>
                                        <h4>Прототип и дизайн</h4>
                                        <p>Разрабатываем макет и уникальный дизайн главной и внутренних страниц.</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 3</span>
                                        <h4>Верстка и интеграция</h4>
                                        <p>Наполняем сайт жизнью: анимации, подключение форм, CMS.</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 4</span>
                                        <h4>Наполнение</h4>
                                        <p>Помогаем с подготовкой и публикацией текстов и изображений.</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 5</span>
                                        <h4>Тестирование и запуск</h4>
                                        <p>Проверяем всё на ошибках и запускаем проект.</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 6</span>
                                        <h4>Обучение и поддержка</h4>
                                        <p>Передаем доступы, обучаем ваших сотрудников работе с сайтом.</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__faq']}>
                                <h3>ответы на частые вопросы</h3>
                                <div className={styles['faq']}>
                                    <div className={styles['faq-item']}>
                                        <h4>Сколько страниц включает корпоративный сайт?</h4>
                                        <p>Обычно от 5 до 20 страниц, включая главную, о компании, услуги, контакты и другие разделы</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Можно ли потом расширить функционал?</h4>
                                        <p>Да, мы закладываем потенциал для будущего расширения и добавляем новые модули</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Предоставляете ли вы контент?</h4>
                                        <p>Мы помогаем с структурированием, но тексты и фото предоставляет клиент или заказывает отдельно</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>сделайте первый шаг к сильному имиджу в сети!</h3>
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
                                            Отправляя заявку, you соглашаетесь с Политикой обработки персональных данных и Правилами пользования сайта
                                        </p>
                                        
                                        <button 
                                            type="submit" 
                                            className={styles['contact-button']}
                                            disabled={isSubmitting || !isValid}
                                        >
                                            {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
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