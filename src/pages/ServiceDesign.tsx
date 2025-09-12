import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HeaderLayout } from '../layout/Header/Header';
import styles from './ServicePage.module.css';
import TelegramIcon from '../assets/images/tg.svg';
import ServiceImage from '../assets/images/design-service.webp';
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

export function ServiceDesign() {
    const [activeTab, setActiveTab] = useState('uiux');
    const [displayTitle, setDisplayTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const tabsContentRef = useRef<HTMLDivElement>(null);
    const tabsHeaderRef = useRef<HTMLDivElement>(null);
    const tabBtnRefs = useRef<{
        uiux: HTMLButtonElement | null;
        branding: HTMLButtonElement | null;
        marketing: HTMLButtonElement | null;
        motion: HTMLButtonElement | null;
    }>({
        uiux: null,
        branding: null,
        marketing: null,
        motion: null,
    });
    const fullText = "ДИЗАЙН";
    
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

    const centerActiveTab = (key: 'uiux' | 'branding' | 'marketing' | 'motion') => {
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
        requestAnimationFrame(() => centerActiveTab(activeTab as 'uiux' | 'branding' | 'marketing' | 'motion'));
    }, [activeTab, isMobile]);

    const handleSwipe = (direction: 'left' | 'right') => {
        const tabs = ['uiux', 'branding', 'marketing', 'motion'];
        const currentIndex = tabs.indexOf(activeTab);
        
        if (direction === 'left' && currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        } else if (direction === 'right' && currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
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
                            <p className={styles['service-subtitle']}>Разрабатываем современный и функциональный дизайн для цифровых продуктов, 
                                брендов и маркетинговых материалов.</p>
                        </div>
                        
                        <div className={styles['service-image']}>
                            <img 
                                src={ServiceImage}
                                alt="Дизайн услуг" 
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
                            <h2>создадим запоминающийся визуал <span className={styles['blue-text']}>за 2-4 недели</span></h2>
                            <p>Профессиональный дизайн, который повышает узнаваемость бренда и улучшает пользовательский опыт.</p>
                            <NavigationButton to={'https://t.me/KP888_Bot'} children={'заказать дизайн'} />
                        </div>
                    </div>

                    <div className={styles['benefits-section']}>
                        <h3>почему выбирают профессиональный дизайн?</h3>
                        <div className={styles['benefits-grid']}>
                            <div className={styles['benefit-item']}>
                                <h4>Увеличение конверсии</h4>
                                <p>Правильный дизайн повышает доверие и стимулирует действия</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Улучшение пользовательского опыта</h4>
                                <p>Интуитивные интерфейсы и комфортное взаимодействие</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Укрепление бренда</h4>
                                <p>Узнаваемый стиль и профессиональный имидж</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Конкурентное преимущество</h4>
                                <p>Современный дизайн выделяет вас на фоне конкурентов</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['service-content']}>
                        <div className={styles['service-info']}> 
                            <div className={styles['info-section']}>
                                <h3>что входит в наши услуги дизайна?</h3>
                                
                                 <div className={styles['tabs']}>
                                    <div className={styles['tabs-header']} ref={tabsHeaderRef}>
                                        <button 
                                            ref={(el) => { tabBtnRefs.current.uiux = el; }}
                                            className={`${styles['tab-button']} ${activeTab === 'uiux' ? styles['active'] : ''}`}
                                            onClick={() => { 
                                                setActiveTab('uiux'); 
                                                if (isMobile) centerActiveTab('uiux'); 
                                            }}
                                        >
                                            UI/UX Дизайн
                                        </button>
                                        <button 
                                            ref={(el) => { tabBtnRefs.current.branding = el; }}
                                            className={`${styles['tab-button']} ${activeTab === 'branding' ? styles['active'] : ''}`}
                                            onClick={() => { 
                                                setActiveTab('branding'); 
                                                if (isMobile) centerActiveTab('branding'); 
                                            }}
                                        >
                                            Брендинг
                                        </button>
                                        <button 
                                            ref={(el) => { tabBtnRefs.current.marketing = el; }}
                                            className={`${styles['tab-button']} ${activeTab === 'marketing' ? styles['active'] : ''}`}
                                            onClick={() => { 
                                                setActiveTab('marketing'); 
                                                if (isMobile) centerActiveTab('marketing'); 
                                            }}
                                        >
                                            Маркетинг материалы
                                        </button>
                                        <button 
                                            ref={(el) => { tabBtnRefs.current.motion = el; }}
                                            className={`${styles['tab-button']} ${activeTab === 'motion' ? styles['active'] : ''}`}
                                            onClick={() => { 
                                                setActiveTab('motion'); 
                                                if (isMobile) centerActiveTab('motion'); 
                                            }}
                                        >
                                            Motion дизайн
                                        </button>
                                    </div>

                                    <div className={styles['tabs-content']} ref={tabsContentRef}>
                                        {activeTab === 'uiux' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Дизайн интерфейсов сайтов и приложений</li>
                                                    <li>Прототипирование и пользовательские сценарии</li>
                                                    <li>Адаптивный дизайн для всех устройств</li>
                                                    <li>Создание дизайн-систем и гайдлайнов</li>
                                                    <li>Тестирование юзабилити и оптимизация</li>
                                                    <li>Интерактивные прототипы и анимации</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'branding' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Разработка логотипа и фирменного стиля</li>
                                                    <li>Брендбук и гайдлайны использования</li>
                                                    <li>Дизайн упаковки и полиграфической продукции</li>
                                                    <li>Фирменные бланки и визитки</li>
                                                    <li>Мерч и сувенирная продукция</li>
                                                    <li>Айдентика для социальных сетей</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'marketing' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Дизайн презентаций и pitch deck</li>
                                                    <li>Рекламные баннеры и креативы</li>
                                                    <li>Инфографика и схемы</li>
                                                    <li>Email рассылки и шаблоны писем</li>
                                                    <li>Landing page и посадочные страницы</li>
                                                    <li>Промо материалы и брошюры</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'motion' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Анимированные логотипы и заставки</li>
                                                    <li>Рекламные ролики и промо видео</li>
                                                    <li>Анимация интерфейсов и микровзаимодействий</li>
                                                    <li>Explainer video и обучающие ролики</li>
                                                    <li>3D графика и визуализация</li>
                                                    <li>Анимированные презентации</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>идеальное решение для вашего бизнеса</h3>
                                <p className={styles['info-section__text']}>Профессиональный дизайн, который решает бизнес-задачи и создает положительное впечатление о вашем бренде.</p>
                                
                                <div className={styles['price-block']}>
                                    <p className={styles['price-note']}>Точная стоимость зависит от сложности проекта и объема работ.</p>
                                    <div className={styles['price-inner']}>
                                        <span className={styles['main-price']}>от 80 000 ₽</span>
                                        <NavigationButton to={'https://t.me/KP888_Bot'} children={'узнать стоимость'} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__stages']}>
                                <h3>этапы работы над дизайном</h3>
                                <div className={styles['timeline']}>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 1-3</span>
                                        <h4>Бриф и исследование</h4>
                                        <p>Изучаем задачу, анализируем целевую аудиторию и конкурентов</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 4-7</span>
                                        <h4>Концепция и прототипы</h4>
                                        <p>Разрабатываем концепцию и создаем первые прототипы</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 8-14</span>
                                        <h4>Дизайн и визуализация</h4>
                                        <p>Создаем финальный дизайн и готовим материалы</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 15-21</span>
                                        <h4>Уточнения и правки</h4>
                                        <p>Вносим корректировки и финализируем проект</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>День 22-28</span>
                                        <h4>Подготовка к передаче</h4>
                                        <p>Готовим исходные файлы и документацию</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__faq']}>
                                <h3>ответы на частые вопросы</h3>
                                <div className={styles['faq']}>
                                    <div className={styles['faq-item']}>
                                        <h4>Сколько времени занимает разработка дизайна?</h4>
                                        <p>В зависимости от сложности проекта: от 1 недели для простых задач до 4 недель для комплексных проектов с брендингом.</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Какие программы вы используете?</h4>
                                        <p>Мы работаем в Figma, Adobe Photoshop, Illustrator, After Effects, Blender и других профессиональных инструментах.</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Предоставляете ли вы исходные файлы?</h4>
                                        <p>Да, после завершения проекта мы передаем все исходные файлы и права на использование дизайна.</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>получите дизайн, который работает на ваш бизнес!</h3>
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