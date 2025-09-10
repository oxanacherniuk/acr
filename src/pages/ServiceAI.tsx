import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HeaderLayout } from '../layout/Header/Header';
import styles from './ServicePage.module.css';
import TelegramIcon from '../assets/images/tg.svg';
import ServiceImage from '../assets/images/ai-service.png';
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

export function ServiceAI() {
    const [activeTab, setActiveTab] = useState('solutions');
    const [displayTitle, setDisplayTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const fullText = "Внедрение ИИ";
    
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
                                Интегрируем AI-решения для оптимизации бизнес-процессов, анализа данных, 
                                прогнозирования и автоматизации принятия решений.
                            </p>
                        </div>
                        
                        <div className={styles['service-image']}>
                            <img 
                                src={ServiceImage}
                                alt="Внедрение искусственного интеллекта" 
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
                            <h2>преобразите бизнес с помощью искусственного интеллекта</h2>
                            <p>
                                Используйте силу машинного обучения и нейронных сетей для создания 
                                интеллектуальных систем, способных трансформировать ваши бизнес-процессы.
                            </p>
                            <NavigationButton to={''} children={'обсудить внедрение'} />
                        </div>
                    </div>

                    {/* Остальной код остается без изменений */}
                    <div className={styles['benefits-section']}>
                        <h3>почему выбирают внедрение ИИ?</h3>
                        <div className={styles['benefits-grid']}>
                            <div className={styles['benefit-item']}>
                                <h4>Автоматизация процессов</h4>
                                <p>Сокращение рутинных операций и повышение эффективности</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Точность прогнозов</h4>
                                <p>Анализ данных и предсказание трендов с высокой точностью</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Персонализация</h4>
                                <p>Индивидуальный подход к каждому клиенту и сотруднику</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Конкурентное преимущество</h4>
                                <p>Использование передовых технологий для опережения рынка</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['service-content']}>
                        <div className={styles['service-info']}> 
                            <div className={styles['info-section']}>
                                <h3>что входит во внедрение искусственного интеллекта?</h3>
                                
                                <div className={styles['tabs']}>
                                    <div className={styles['tabs-header']}>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'solutions' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('solutions')}
                                        >
                                            AI-решения
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'integration' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('integration')}
                                        >
                                            Интеграция
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'technologies' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('technologies')}
                                        >
                                            Технологии
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeTab === 'support' ? styles['active'] : ''}`}
                                            onClick={() => setActiveTab('support')}
                                        >
                                            Поддержка
                                        </button>
                                    </div>

                                    <div className={styles['tabs-content']}>
                                        {activeTab === 'solutions' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Чат-боты и виртуальные ассистенты</li>
                                                    <li>Системы рекомендаций и персонализации</li>
                                                    <li>Прогнозная аналитика и машинное обучение</li>
                                                    <li>Обработка естественного языка (NLP)</li>
                                                    <li>Компьютерное зрение и анализ изображений</li>
                                                    <li>Голосовые интерфейсы и speech-to-text</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'integration' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Анализ бизнес-процессов и выявление точек роста</li>
                                                    <li>Интеграция с существующей IT-инфраструктурой</li>
                                                    <li>Миграция данных и настройка ETL-процессов</li>
                                                    <li>Создание API для взаимодействия систем</li>
                                                    <li>Настройка безопасности и контроля доступа</li>
                                                    <li>Тестирование на совместимость и производительность</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'technologies' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Машинное обучение и глубокие нейросети</li>
                                                    <li>Обработка больших данных (Big Data)</li>
                                                    <li>Облачные AI-платформы (AWS, GCP, Azure)</li>
                                                    <li>Фреймворки: TensorFlow, PyTorch, Keras</li>
                                                    <li>MLOps - автоматизация жизненного цикла моделей</li>
                                                    <li>Генеративный AI и языковые модели</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeTab === 'support' && (
                                            <div className={styles['tab-panel']}>
                                                <ul>
                                                    <li>Обучение сотрудников работе с новыми системами</li>
                                                    <li>Мониторинг и постоянная оптимизация алгоритмов</li>
                                                    <li>Техническая поддержка 24/7</li>
                                                    <li>Регулярные обновления и дообучение моделей</li>
                                                    <li>Анализ эффективности внедренных решений</li>
                                                    <li>Консультации по развитию AI-стратегии</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>инвестируйте в интеллектуальное будущее вашего бизнеса</h3>
                                <p className={styles['price-note']}>
                                    Искусственный интеллект — это не просто технология, а стратегическое 
                                    преимущество, которое позволяет автоматизировать процессы, принимать 
                                    более точные решения и создавать уникальный клиентский опыт.
                                </p>
                                
                                <div className={styles['price-block']}>
                                    <p className={styles['price-note']}>
                                        Точная стоимость зависит от сложности решений, 
                                        объема данных и масштаба интеграции.
                                    </p>
                                    
                                    <p className={styles['price-note']}>
                                        Поэтапное внедрение с возможностью быстрого получения первых результатов.
                                    </p>

                                    <div className={styles['price-inner']}>
                                        <span className={styles['main-price']}>от 200 000 ₽</span>
                                        <NavigationButton to={''} children={'узнать стоимость'} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__stages']}>
                                <h3>этапы внедрения искусственного интеллекта</h3>
                                <div className={styles['timeline']}>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 1</span>
                                        <h4>Анализ и аудит</h4>
                                        <p>Изучаем бизнес-процессы, данные и инфраструктуру</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 2</span>
                                        <h4>Разработка стратегии</h4>
                                        <p>Определяем цели, метрики и roadmap внедрения</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 3</span>
                                        <h4>Прототипирование</h4>
                                        <p>Создаем и тестируем пилотные решения</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 4</span>
                                        <h4>Интеграция</h4>
                                        <p>Внедряем и настраиваем AI-решения</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 5</span>
                                        <h4>Обучение</h4>
                                        <p>Обучаем команду работе с новыми инструментами</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>Этап 6</span>
                                        <h4>Поддержка</h4>
                                        <p>Обеспечиваем мониторинг и развитие системы</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__faq']}>
                                <h3>ответы на частые вопросы</h3>
                                <div className={styles['faq']}>
                                    <div className={styles['faq-item']}>
                                        <h4>Какие бизнес-задачи решает ИИ?</h4>
                                        <p>Автоматизация процессов, прогнозирование спроса, персонализация предложений, анализ sentiment, обнаружение аномалий, оптимизация цепочек поставок и многое другое</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Нужны ли специальные знания у сотрудников?</h4>
                                        <p>Мы предоставляем полное обучение и создаем интуитивно понятные интерфейсы. Для сложных решений можем подготовить ваших специалистов</p>
                                    </div>
                                    <div className={styles['faq-item']}>
                                        <h4>Как быстро можно получить первые результаты?</h4>
                                        <p>Пилотные проекты и MVP мы запускаем в течение 2-4 недель. Полное внедрение занимает от 1 до 3 месяцев</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>начните использовать искусственный интеллект уже сегодня!</h3>
                                <p>Оставьте контакты, и наш AI-эксперт подготовит для вас индивидуальное коммерческое предложение в течение дня.</p>
                                
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