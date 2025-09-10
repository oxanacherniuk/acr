import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HeaderLayout } from '../layout/Header/Header';
import styles from './ServicePage.module.css';
import TelegramIcon from '../assets/images/tg.svg';
import ServiceImage from '../assets/images/landing.png';
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

export function ServiceLandings() {
    const [activeTab, setActiveTab] = useState('marketing');
    const [displayTitle, setDisplayTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const fullText = "Лендинг";
    
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
                                Создадим функциональный одностраничный сайт, который сфокусирует внимание 
                                на вашем предложении и превратит посетителей в клиентов.
                            </p>
                        </div>
                        
                        <div className={styles['service-image']}>
                            <img 
                                src={ServiceImage}
                                alt="Продающий лендинг" 
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
                            <h2>запустите продажи с мощного лендинга <span className={styles['blue-text']}>за 10 дней</span></h2>
                            <p>Функциональный одностраничный сайт - идеальное решение для эффективного продвижения и демонстрации сильных сторон продукта.</p>
                            <NavigationButton to={'https://t.me/KP888_Bot'} children={'заказать лендинг'} />
                        </div>
                    </div>

                    <div className={styles['benefits-section']}>
                        <h3>почему выбирают лендинг?</h3>
                        <div className={styles['benefits-grid']}>
                            <div className={styles['benefit-item']}>
                                <h4>Фокус на 1 цель <br /> или акцию</h4>
                                <p>Максимальная концентрация на главном предложении</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Быстрый запуск <br /> (от 10 дней)</h4>
                                <p>Оперативное получение работающего инструмента</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Низкая стоимость против сайта</h4>
                                <p>Экономически эффективное решение</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Максимальная конверсия в заявки</h4>
                                <p>Высокий процент превращения посетителей в клиентов</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['service-content']}>
                        <div className={styles['service-info']}> 
                            <div className={styles['info-section']}>
                                <h3>что входит в стоимость лендинга?</h3>
                                
                                <div className={styles['tabs']}>
                                    <div className={styles['tabs-header']}>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'marketing' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('marketing')}
                                        >
                                            Маркетинговая основа
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'design' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('design')}
                                        >
                                            Дизайн и Вовлечение
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'tech' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('tech')}
                                        >
                                            Техника и Захват лидов
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'quality' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('quality')}
                                        >
                                            Качество и Оптимизация
                                        </button>
                                    </div>

                                    <div className={styles['tabs-content']}>
                                        {activeTab === 'marketing' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Аудит Вашего бизнеса и конкурентов</li>
                                                    <li>Анализ целевой аудитории</li>
                                                    <li>Маркетинговая стратегия</li>
                                                    <li>Составление УТП <br /> <span className={styles['tab-panel__subtext']}>(уникального торгового предложения)</span></li>
                                                    <li>Проработка продающих триггеров доверия <br /> <span className={styles['tab-panel__subtext']}>(подтолкнем ваших клиентов к действию)</span></li>
                                                    <li>Копирайтинг <br /> <span className={styles['tab-panel__subtext']}>(наполнение продающим текстом)</span></li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'design' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Индивидуальный мотивирующий дизайн</li>
                                                    <li>Полная проработка структуры сайта</li>
                                                    <li>Видеофон первого экрана (предоставляется заказчиком)</li>
                                                    <li>Фото-/видео-галерея с увеличением</li>
                                                    <li>Фото-/видео-отзывы (предоставляется заказчиком)</li>
                                                    <li>Анимация элементов лендинга</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'tech' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Домен и хостинг на 1 год в подарок</li>
                                                    <li>Установка SSL сертификата</li>
                                                    <li>Подключение почты для сбора заявок</li>
                                                    <li>Специализированные формы обратной связи для заказа</li>
                                                    <li>Интеграция с социальными сетями</li>
                                                    <li>Интерактивная карта (Яндекс)</li>
                                                    <li>Загрузка лендинга на хостинг клиента</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'quality' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Адаптация для всех устройств</li>
                                                    <li>Кроссбраузерность</li>
                                                    <li>Ускорение загрузки сайта</li>
                                                    <li>Закладываем потенциал для расширения</li>
                                                    <li>Тестирование всего проекта на ошибки</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>идеальное решение для акций, запусков <br /> и точечных предложений</h3>
                                <p className={styles['info-section__text']}>Получите работающий инструмент для генерации заявок в сжатые сроки и с предсказуемым бюджетом.</p>
                                
                                <div className={styles['price-block']}>
                                    <p className={styles['price-note']}>Точная стоимость зависит от сложности, анимации и объема текстов.</p>
                                    <div className={styles['price-inner']}>
                                        <span className={styles['main-price']}>от 70 000 ₽</span>
                                        <NavigationButton to={'https://t.me/KP888_Bot'} children={'узнать стоимость'} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__stages']}>
                                <h3>этапы создания вашего лендинга</h3>
                                <div className={styles['timeline']}>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 1-2</span>
                                        <h4>Бриф и аналитика</h4>
                                        <p>Заполняем анкету, анализируем <br /> целевую аудиторию</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 3-5</span>
                                        <h4>Прототип и текст</h4>
                                        <p>Рисуем структуру и пишем продающие тексты</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 6-8</span>
                                        <h4>Дизайн и верстка</h4>
                                        <p>Утверждаем визуал и оживляем его</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 9-10</span>
                                        <h4>Программирование</h4>
                                        <p>Подключаем формы, анимации</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 10</span>
                                        <h4>Тест и запуск</h4>
                                        <p>Проверяем и публикуем ваш лендинг</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__faq']}>
                                <h3>ответы на частые вопросы</h3>
                                <div className={styles['faq']}>
                                    <div className={styles['faq-item']}>
                                        <h4>Чем лендинг лучше многостраничного сайта?</h4>
                                        <p>Для точечных предложений, акций и товаров-новинок. Он ведет клиента по четкому сценарию к одной цели, минимизируя отвлекающие факторы.</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Как быстро вы сделаете лендинг?</h4>
                                        <p>Средний срок разработки — 10-14 рабочих дней. Доступна опция срочного запуска за 7 дней.</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>получите поток заявок с вашего первого лендинга!</h3>
                                <p>Оставьте контакты, наш менеджер подготовит для вас индивидуальное коммерческое предложение в течение дня.</p>
                                
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