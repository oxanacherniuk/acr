import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HeaderLayout } from '../layout/Header/Header';
import styles from './ServicePage.module.css';
import TelegramIcon from '../assets/images/tg.svg';
import ServiceImage from '../assets/images/chat-bots-service.webp';
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

export function ServiceChatBots() {
    const [activeTab, setActiveTab] = useState('sales');
    const [platform, setPlatform] = useState('');
    const [displayTitle, setDisplayTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const tabsContentRef = useRef<HTMLDivElement>(null);
    const tabsHeaderRef = useRef<HTMLDivElement>(null);
    const tabBtnRefs = useRef<{ sales: HTMLButtonElement | null; service: HTMLButtonElement | null }>({
    sales: null,
    service: null,
    });
    const fullText = "Умные чат-боты";
    
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
            phone: '',
        }
    });

    const centerActiveTab = (key: 'sales' | 'service') => {
        const container = tabsHeaderRef.current;
        const btn = tabBtnRefs.current[key];
        if (!container || !btn) return;

        const cRect = container.getBoundingClientRect();
        const bRect = btn.getBoundingClientRect();

        const currentLeft = container.scrollLeft;
        const delta = (bRect.left - cRect.left) + bRect.width / 2 - cRect.width / 2; 
        const target = currentLeft + delta;

        const max = container.scrollWidth - container.clientWidth;
        const next = Math.max(0, Math.min(max, target));

        container.scrollTo({ left: next, behavior: 'smooth' });
    };

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const timer = setTimeout(() => {
                setDisplayTitle(prev => prev + fullText[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, fullText]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        requestAnimationFrame(() => centerActiveTab(activeTab as 'sales' | 'service'));
    }, [activeTab, isMobile]);

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            setActiveTab('service');
        } else if (direction === 'right') {
            setActiveTab('sales');
        }
    };

    const setupSwipe = (element: HTMLElement) => {
        let startX: number;
        let startY: number;
        let distX: number;
        let distY: number;
        const threshold = 50; // минимальное расстояние для свайпа
        const restraint = 100; // максимальное отклонение по вертикали
        const allowedTime = 300; // максимальное время свайпа

        let startTime: number;

        element.addEventListener('touchstart', (e: TouchEvent) => {
            const touchObj = e.changedTouches[0];
            startX = touchObj.pageX;
            startY = touchObj.pageY;
            startTime = new Date().getTime();
            e.preventDefault();
        }, false);

        element.addEventListener('touchend', (e: TouchEvent) => {
            const touchObj = e.changedTouches[0];
            distX = touchObj.pageX - startX;
            distY = touchObj.pageY - startY;
            const elapsedTime = new Date().getTime() - startTime;

            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    if (distX > 0) {
                        handleSwipe('right');
                    } else {
                        handleSwipe('left');
                    }
                }
            }
            e.preventDefault();
        }, false);
    };

    useEffect(() => {
        if (isMobile && tabsContentRef.current) {
            const tabPanel = tabsContentRef.current.querySelector(`.${styles['tab-panel']}`);
            if (tabPanel) {
                setupSwipe(tabPanel as HTMLElement);
            }
        }
    }, [isMobile, activeTab]);

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
                                Автоматизируйте продажи и поддержку 24/7 с помощью интеллектуальных ботов, 
                                которые не просто отвечают, а ведут диалог и решают бизнес-задачи
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
                            <h2>Умные чат-боты: автоматизируйте продажи и поддержку <span className={styles['blue-text']}>24/7</span></h2>
                            <p>Внедряем chat-боты, которые не просто отвечают, а ведут диалог, собирают заявки, консультируют и экономят до 30% вашего бюджета на операционные задачи.</p>
                            <NavigationButton to={'https://t.me/KP888_Bot'} children={'рассчитать стоимость'} />
                        </div>
                    </div>

                    <div className={styles['benefits-section']}>
                        <h3>наша философия в разработке ботов</h3>
                        <div className={styles['benefits-grid']}>
                            <div className={styles['benefit-item']}>
                                <h4>Глубокая аналитика перед созданием</h4>
                                <p>Изучаем бизнес-процессы, типичные вопросы клиентов и «боли». Бот строится на реальных сценариях</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Естественное общение</h4>
                                <p>Наши боты умеют понимать смысл и контекст запроса благодаря AI, что повышает лояльность клиентов</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Интеграция в ядро бизнеса</h4>
                                <p>Бот не работает сам по себе. Подключаем к вашей CRM, базе знаний, системе бронирования</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['service-content']}>
                        <div className={styles['service-info']}> 
                            <div className={styles['info-section']}>
                                <h3>какие задачи решают наши боты?</h3>
                                
                                <div className={styles['tabs']}>
                                    <div className={styles['tabs-header']} ref={tabsHeaderRef}>
                                    <button
                                        ref={(el) => { tabBtnRefs.current.sales = el; }}
                                        className={`${styles['tab-button']} ${activeTab === 'sales' ? styles['active'] : ''}`}
                                        onClick={() => { setActiveTab('sales'); if (isMobile) centerActiveTab('sales'); }}
                                    >
                                        Продажи и лиды
                                    </button>

                                    <button
                                        ref={(el) => { tabBtnRefs.current.service = el; }}
                                        className={`${styles['tab-button']} ${activeTab === 'service' ? styles['active'] : ''}`}
                                        onClick={() => { setActiveTab('service'); if (isMobile) centerActiveTab('service'); }}
                                    >
                                        Клиентский сервис
                                    </button>
                                    </div>

                                    <div className={styles['tabs-content']} ref={tabsContentRef}>
                                        {activeTab === 'sales' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Консультация и подбор товара/услуги</li>
                                                    <li>Прием заказов и бронирование прямо в мессенджере</li>
                                                    <li>Проведение акций и сбор базы подписчиков</li>
                                                    <li>Генерация качественных лидов 24/7</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'service' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Ответы на частые вопросы <br /> <span className={styles['tab-panel__subtext']}>(снижает нагрузку на менеджеров)</span></li>
                                                    <li>Статус заказа, отслеживание доставки</li>
                                                    <li>Запись на услугу или прием</li>
                                                    <li>Техническая поддержка клиентов</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>наш процесс разработки</h3>
                                <div className={styles['timeline']}>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 1</span>
                                        <h4>Аудит и сценарий</h4>
                                        <p>Изучаем бизнес-процессы, прописываем диалоги и логику</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 2</span>
                                        <h4>Прототип</h4>
                                        <p>Создаем и согласовываем карту диалогов</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 3</span>
                                        <h4>Копирайтинг</h4>
                                        <p>Пишем тексты для бота в стиле вашего бренда</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 4</span>
                                        <h4>Разработка</h4>
                                        <p>Программируем бота, подключаем API</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 5</span>
                                        <h4>Тестирование</h4>
                                        <p>Проверяем все сценарии на ошибки</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 6</span>
                                        <h4>Запуск</h4>
                                        <p>Запускаем бота и обучаем вашу команду</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__tech']}>
                                <h3>технологии и платформы</h3>
                                <p>Разрабатываем для всех популярных платформ. Выберем оптимальное решение под ваши задачи.</p>
                                
                                <div className={styles['benefits-grid']} style={{marginTop: '40px'}}>
                                    <div className={styles['benefit-item']}>
                                        <h4>Telegram</h4>
                                        <p>Для продаж и поддержки в мессенджере</p>
                                    </div>
                                    <div className={styles['benefit-item']}>
                                        <h4>WhatsApp</h4>
                                        <p>Профессиональные решения для бизнеса</p>
                                    </div>
                                    <div className={styles['benefit-item']}>
                                        <h4>Виджет на сайт</h4>
                                        <p>Для захвата лидов и помощи посетителям</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__price']}>
                                <h3>что входит в стоимость?</h3>
                                <p>Стоимость проекта зависит от сложности логики, количества интеграций и платформы.</p>
                                
                                <div className={styles['price-block']}>
                                    <div className={styles['price-inner']}>
                                        <span className={styles['main-price']}>от 90 000 ₽</span>
                                        <NavigationButton to={'https://t.me/KP888_Bot'} children={'узнать стоимость'} />
                                    </div>
                                    <p className={styles['price-note']}>Базовая комплектация включает:</p>
                                    <div className={styles['punct-panel']}>
                                        <ul className={styles['puncts']}>
                                            <li>Проектирование сложного сценария с 10+ ветками диалога</li>
                                            <li>Написание продающих текстов для бота</li>
                                            <li>Разработка бота на одной платформе</li>
                                            <li>Базовая интеграция для сбора заявок</li>
                                            <li>Тестирование и запуск</li>
                                            <li>Обучение вашего менеджера</li>
                                        </ul>
                                    </div>
                                    
                                    <div className={styles['additional-options']}>
                                        <h3>дополнительные опции</h3>
                                        <div className={styles['additional-options-grid']}>
                                            <div className={styles['option-item']}>
                                                <div className={styles['option-name']}>Интеграция с CRM</div>
                                                <div className={styles['option-price']}>+20 000 ₽</div>
                                            </div>
                                            <div className={styles['option-item']}>
                                                <div className={styles['option-name']}>NLP (понимание вопросов)</div>
                                                <div className={styles['option-price']}>+30 000 ₽</div>
                                            </div>
                                            <div className={styles['option-item']}>
                                                <div className={styles['option-name']}>Вторая платформа</div>
                                                <div className={styles['option-price']}>+40 000 ₽</div>
                                            </div>
                                        </div>
                                        <NavigationButton to={'https://t.me/KP888_Bot'} children={'получить расчет'} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>готовы автоматизировать рутину и увеличить продажи?</h3>
                                <p>Опишите задачу, и наш специалист по AI бесплатно подготовит предварительный сценарий и расчет стоимости.</p>
                                
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

                                    <div className={styles['input-group']}>
                                        <select 
                                            className={styles['contact-input']}
                                            value={platform}
                                            onChange={(e) => setPlatform(e.target.value)}
                                            style={{color: platform ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'}}
                                        >
                                            <option value="">К какой платформе нужен бот?</option>
                                            <option value="telegram">Telegram</option>
                                            <option value="whatsapp">WhatsApp</option>
                                            <option value="website">Виджет на сайт</option>
                                            <option value="vk">VK Мессенджер</option>
                                            <option value="multiple">Несколько платформ</option>
                                        </select>
                                    </div>

                                    <div className={styles['input-group']}>
                                        <textarea 
                                            placeholder='Опишите задачу для бота...' 
                                            className={styles['contact-input']}
                                            rows={4}
                                            style={{resize: 'vertical'}}
                                        />
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
                                            {isSubmitting ? 'Отправка...' : 'Обсудить разработку бота'}
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