import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HeaderLayout } from '../layout/Header/Header';
import styles from './ServicePage.module.css';
import TelegramIcon from '../assets/images/tg.svg';
import ShopImage from '../assets/images/internet-shop.webp';
import { QuizLayout } from '../layout/Quiz/Quiz';
import { FooterLayout } from '../layout/Footer/Footer';
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

export function ServiceEcommerce() {
    const [activeTab, setActiveTab] = useState('foundation');
    const [displayTitle, setDisplayTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const tabsContentRef = useRef<HTMLDivElement>(null);
    const tabsHeaderRef = useRef<HTMLDivElement>(null);
    const tabBtnRefs = useRef<{
        foundation: HTMLButtonElement | null;
        marketing: HTMLButtonElement | null;
        functionality: HTMLButtonElement | null;
        technical: HTMLButtonElement | null;
    }>({
        foundation: null,
        marketing: null,
        functionality: null,
        technical: null,
    });
    const fullText = "Интернет-магазин";
    
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

    const centerActiveTab = (key: 'foundation' | 'marketing' | 'functionality' | 'technical') => {
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
        requestAnimationFrame(() => centerActiveTab(activeTab as 'foundation' | 'marketing' | 'functionality' | 'technical'));
    }, [activeTab, isMobile]);

    const handleSwipe = (direction: 'left' | 'right') => {
        const tabs = ['foundation', 'marketing', 'functionality', 'technical'];
        const currentIndex = tabs.indexOf(activeTab);
        
        if (direction === 'left' && currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1] as typeof activeTab);
        } else if (direction === 'right' && currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1] as typeof activeTab);
        }
    };

    const setupSwipe = (element: HTMLElement) => {
        let startX: number;
        let startY: number;
        let distX: number;
        let distY: number;
        const threshold = 50;
        const restraint = 100;
        const allowedTime = 300;

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
                                Запустите мощный интернет-магазин, который продает 24/7. 
                                Всё включено — от домена до маркетинга и онлайн-кассы.
                            </p>
                            <p className={styles['service-subtitle']}>
                                Вы сосредотачиваетесь на товарах, мы берём на себя всю техническую часть.
                            </p>
                        </div>
                        
                        <div className={styles['service-image']}>
                            <img 
                                src={ShopImage}
                                alt="Современный интернет-магазин" 
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
                            <h2>Интернет-магазин под ключ — <br /> <span className={styles['blue-text']}>ваш новый канал продаж</span></h2>
                            <p>
                                Полностью готовый к работе инструмент для вашего бизнеса, современный и функциональный 
                                интернет-магазин с корзиной, оформлением заказов, оповещениями и админ-панелью.
                            </p>
                            <NavigationButton to={'https://t.me/KP888_Bot'} children={'получить коммерческое предложение'} />
                        </div>
                    </div>

                    <div className={styles['benefits-section']}>
                        <h3>почему выбирают нас</h3>
                        <div className={styles['benefits-grid']}>
                            <div className={styles['benefit-item']}>
                                <h4>Домен и хостинг в подарок на 1 год</h4>
                                <p>Полностью бесплатное размещение в первый год</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Готов к работе с онлайн-платежами</h4>
                                <p>Интеграция с популярными платежными системами</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Полная маркетинговая подготовка</h4>
                                <p>Анализ ЦА, конкурентов и маркетинговая стратегия</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Тестирование и гарантия запуска</h4>
                                <p>Гарантия 1 год на все работы и поддержку</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['service-content']}>
                        <div className={styles['service-info']}> 
                            <div className={styles['info-section']}>
                                <h3>что входит в стоимость сайта?</h3>
                                
                                <div className={styles['tabs']}>
                                    <div className={styles['tabs-header']} ref={tabsHeaderRef}>
                                        <button 
                                            ref={(el) => { tabBtnRefs.current.foundation = el; }}
                                            className={`${styles['tab-button']} ${activeTab === 'foundation' ? styles['active'] : ''}`}
                                            onClick={() => { 
                                                setActiveTab('foundation'); 
                                                if (isMobile) centerActiveTab('foundation'); 
                                            }}
                                        >
                                            Фундамент и Безопасность
                                        </button>
                                        <button 
                                            ref={(el) => { tabBtnRefs.current.marketing = el; }}
                                            className={`${styles['tab-button']} ${activeTab === 'marketing' ? styles['active'] : ''}`}
                                            onClick={() => { 
                                                setActiveTab('marketing'); 
                                                if (isMobile) centerActiveTab('marketing'); 
                                            }}
                                        >
                                            Маркетинг и Конверсия
                                        </button>
                                        <button 
                                            ref={(el) => { tabBtnRefs.current.functionality = el; }}
                                            className={`${styles['tab-button']} ${activeTab === 'functionality' ? styles['active'] : ''}`}
                                            onClick={() => { 
                                                setActiveTab('functionality'); 
                                                if (isMobile) centerActiveTab('functionality'); 
                                            }}
                                        >
                                            Функционал и Автоматизация
                                        </button>
                                        <button 
                                            ref={(el) => { tabBtnRefs.current.technical = el; }}
                                            className={`${styles['tab-button']} ${activeTab === 'technical' ? styles['active'] : ''}`}
                                            onClick={() => { 
                                                setActiveTab('technical'); 
                                                if (isMobile) centerActiveTab('technical'); 
                                            }}
                                        >
                                            Техническое совершенство
                                        </button>
                                    </div>

                                    <div className={styles['tabs-content']} ref={tabsContentRef}>
                                        {activeTab === 'foundation' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Домен и хостинг на 1 год в подарок</li>
                                                    <li>Установка SSL сертификата</li>
                                                    <li>Система управления сайтом (CMS)</li>
                                                    <li>Соответствие ФЗ «О персональных данных» (152-ФЗ)</li>
                                                    <li>Подключение онлайн-кассы и соответствие 54-ФЗ</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'marketing' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Анализ тематики и конкурентов</li>
                                                    <li>Анализ целевой аудитории</li>
                                                    <li>Маркетинговая стратегия</li>
                                                    <li>Индивидуальный мотивирующий дизайн</li>
                                                    <li>Составление УТП</li>
                                                    <li>Блокировка советника Яндекс</li>
                                                    <li>Модули рекомендаций товаров</li>
                                                    <li>Формы обратной связи</li>
                                                    <li>Фото-/видео-отзывы</li>
                                                    <li>Модуль с логотипами клиентов</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'functionality' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Полная проработка структуры сайта</li>
                                                    <li>Подключение платежей по банковским картам</li>
                                                    <li>Настройка бизнес-процессов обслуживания</li>
                                                    <li>Интерактивный калькулятор</li>
                                                    <li>Комплексная система автоматизации</li>
                                                    <li>Подключение корзины и модулей доставки</li>
                                                    <li>Многоуровневый каталог товаров</li>
                                                    <li>Карточка товара (полная)</li>
                                                    <li>Интеграция с CRM</li>
                                                    <li>Настройки для прайс-листов поставщиков</li>
                                                    <li>Интерактивная карта (Яндекс)</li>
                                                    <li>Online-консультант</li>
                                                    <li>Потенциал для расширения</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'technical' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Адаптация для всех устройств</li>
                                                    <li>Кроссбраузерность</li>
                                                    <li>Ускорение загрузки</li>
                                                    <li>Тестирование всего проекта на ошибки</li>
                                                    <li>Возможность упаковки в мобильное приложение</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>прозрачное ценообразование без скрытых платежей</h3>
                                <p className={styles['info-section__text']}>
                                    Вы платите за комплексное решение, а не просто за «создание сайта». 
                                    В указанную стоимость уже входит 34 пункта работ. Это полный пакет «под ключ», 
                                    который выводит ваш бизнес в онлайн с полной юридической и технической готовностью.
                                </p>
                                
                                <div className={styles['price-block']}>
                                    <p className={styles['price-note']}>Точная стоимость зависит от объема каталога и специфичных интеграций.</p>
                                    <div className={styles['price-inner']}>
                                        <span className={styles['main-price']}>от 500 000 ₽</span>
                                        <NavigationButton to={'https://t.me/KP888_Bot'} children={'узнать стоимость'} />
                                    </div>
                                    
                                    <div className={styles['additional-options']}>
                                        <h3>что влияет на стоимость?</h3>
                                        <div className={styles['additional-options-grid']}>
                                            <div className={styles['option-item']}>
                                                <div className={styles['option-name']}>Размер каталога</div>
                                                <div className={styles['option-price']}>Количество товаров</div>
                                            </div>
                                            <div className={styles['option-item']}>
                                                <div className={styles['option-name']}>Сложность интеграций</div>
                                                <div className={styles['option-price']}>CRM, 1C, ERP</div>
                                            </div>
                                            <div className={styles['option-item']}>
                                                <div className={styles['option-name']}>Уникальный функционал</div>
                                                <div className={styles['option-price']}>Нестандартные модули</div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className={styles['price-note']}>
                                        Гарантия 1 год на все работы и техническую поддержку
                                    </p>
                                </div>
                            </div>

                            <div className={styles['info-section__stages']}>
                                <h3>этапы создания вашего интернет-магазина</h3>
                                <div className={styles['timeline']}>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 1</span>
                                        <h4>Заявка и обсуждение</h4>
                                        <p>Бесплатная консультация и обсуждение проекта</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 2</span>
                                        <h4>Аналитика</h4>
                                        <p>Анализ ниши, конкурентов и целевой аудитории</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 3</span>
                                        <h4>Прототип и дизайн</h4>
                                        <p>Создание и согласование макета магазина</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 4</span>
                                        <h4>Разработка</h4>
                                        <p>Верстка, программирование и подключение функционала</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 5</span>
                                        <h4>Тестирование</h4>
                                        <p>Наполнение товарами и комплексное тестирование</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 6</span>
                                        <h4>Запуск</h4>
                                        <p>Запуск проекта и обучение управлению</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__faq']}>
                                <h3>ответы на частые вопросы</h3>
                                <div className={styles['faq']}>
                                    <div className={styles['faq-item']}>
                                        <h4>Сколько времени занимает разработка?</h4>
                                        <p>От 4 до 8 недель в зависимости от сложности проекта и объема каталога</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Можно ли интегрировать с моей CRM?</h4>
                                        <p>Да, мы интегрируем с популярными CRM системами и разрабатываем кастомные интеграции</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Предоставляете ли вы обучение?</h4>
                                        <p>Да, мы проводим полное обучение управлению магазином и предоставляем инструкции</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>готовы увеличить свои продажи?</h3>
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
        </div>
    );
}