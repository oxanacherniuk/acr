import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HeaderLayout } from '../layout/Header/Header';
import styles from './ServicePage.module.css';
import TelegramIcon from '../assets/images/tg.svg';
import ServiceImage from '../assets/images/marketing.png';
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

export function ServiceMarketing() {
    const [activeService, setActiveService] = useState('complex');
    const [displayTitle, setDisplayTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const fullText = "DIGITAL-МАРКЕТИНГ";
    
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
                            <p className={styles['service-subtitle']}>Мы не просто настраиваем рекламу. Мы выстраиваем единую систему привлечения и удержания клиентов, где каждый рубль работает на окупаемость. <br /> От стратегии до запуска и полной аналитики.</p>
                        </div>
                        
                        <div className={styles['service-image']}>
                            <img 
                                src={ServiceImage}
                                alt="Digital-маркетинг" 
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
                            <h2>Digital-маркетинг, который <span className={styles['blue-text']}>считает вашу прибыль</span></h2>
                            <p>Мы выстраиваем комплексную систему продвижения, где все каналы работают согласованно на ваш результат.</p>
                            <NavigationButton to={'https://t.me/KP888_Bot'} children={'заказать аудит и стратегию'} />
                        </div>
                    </div>

                    <div className={styles['benefits-section']}>
                        <h3>наша философия в маркетинге</h3>
                        <div className={styles['benefits-grid']}>
                            <div className={styles['benefit-item']}>
                                <h4>Глубина прежде действий</h4>
                                <p>Мы не бросаемся в рекламу. Сначала мы проводим глубокий аудит, анализируем вашу ЦА и рынок. Каждая наша гипотеза основана на данных.</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Комплексность и синергия</h4>
                                <p>Мы связываем все каналы продвижения (SEO, контекст, SMM) в единую экосистему. Это убирает конфликт каналов и повышает общую эффективность.</p>
                            </div>
                            <div className={styles['benefit-item']}>
                                <h4>Прозрачность и результат</h4>
                                <p>Мы считаем деньги. Вы всегда видите, какой канал сколько принес и какова окупаемость. Наша цель — не потратить бюджет, а заработать для вас.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['service-content']}>
                        <div className={styles['service-info']}> 
                            <div className={styles['info-section']}>
                                <h3>Полный цикл услуг для вашего роста</h3>
                                
                                <div className={styles['tabs']}>
                                    <div className={styles['tabs-header']}>
                                        <button 
                                            className={`${styles['tab-button']} ${activeService === 'complex' ? styles['active'] : ''}`}
                                            onClick={() => setActiveService('complex')}
                                        >
                                            Комплексное продвижение
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeService === 'audit' ? styles['active'] : ''}`}
                                            onClick={() => setActiveService('audit')}
                                        >
                                            Аудит и аналитика
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeService === 'strategy' ? styles['active'] : ''}`}
                                            onClick={() => setActiveService('strategy')}
                                        >
                                            Стратегия развития
                                        </button>
                                        <button 
                                            className={`${styles['tab-button']} ${activeService === 'smm' ? styles['active'] : ''}`}
                                            onClick={() => setActiveService('smm')}
                                        >
                                            SMM
                                        </button>
                                    </div>

                                    <div className={styles['tabs-content']}>
                                        {activeService === 'complex' && (
                                            <div className={styles['tab-panel']}>
                                                <h4 className={styles['price-note']}>Что входит:</h4>
                                                <ul>
                                                    <li>SEO-оптимизация</li>
                                                    <li>Ведение и стратегия контекстной рекламы (Яндекс.Директ)</li>
                                                    <li>Настройка и ведение рекламы в социальных сетях</li>
                                                </ul>
                                                <h4 className={styles['price-note']}>Результат:</h4>
                                                <p>Увеличение видимости вашего бренда в сети, постоянный поток целевых заявок со всех каналов.</p>
                                                <h4 className={styles['price-note']}>Кому подходит:</h4>
                                                <p>Компаниям, которые хотят получать стабильный поток заявок и контролировать рекламный бюджет.</p>
                                                <div className={styles['price-inner']}>
                                                    <span className={styles['main-price']}>от 50 000 ₽</span>
                                                    <NavigationButton to={'https://t.me/KP888_Bot'} children={'рассчитать под ключ'} />
                                                </div>
                                            </div>
                                        )}
                                        {activeService === 'audit' && (
                                            <div className={styles['tab-panel']}>
                                                <h4 className={styles['price-note']}>Что входит:</h4>
                                                <ul>
                                                    <li>Аудит сайта, юзабилити, рекламных каналов и конкурентов</li>
                                                    <li>Анализ воронки продаж и выявление «узких» мест</li>
                                                </ul>
                                                <h4 className={styles['price-note']}>Результат:</h4>
                                                <p>Готовый план по оптимизации и развитию digital-направления с четким KPI.</p>
                                                <h4 className={styles['price-note']}>Кому подходит:</h4>
                                                <p>Тем, кто хочет понять, что не так с текущим продвижением, и получить дорожную карту для исправления.</p>
                                                <div className={styles['price-inner']}>
                                                    <span className={styles['main-price']}>от 30 000 ₽</span>
                                                    <NavigationButton to={'https://t.me/KP888_Bot'} children={'заказать аудит'} />
                                                </div>
                                            </div>
                                        )}
                                        {activeService === 'strategy' && (
                                            <div className={styles['tab-panel']}>
                                                <h4 className={styles['price-note']}>Что входит:</h4>
                                                <ul>
                                                    <li>Разработка детальной годовой дорожной карты по digital-продвижению</li>
                                                    <li>Определение целей, этапов, бюджета</li>
                                                    <li>Прогноз по лидам и ROI</li>
                                                </ul>
                                                <h4 className={styles['price-note']}>Результат:</h4>
                                                <p>Понимание, куда и зачем двигаться, и как распределять ресурсы на год вперед.</p>
                                                <h4 className={styles['price-note']}>Кому подходит:</h4>
                                                <p>Собственникам бизнеса и директорам по маркетингу для планирования и обоснования бюджета.</p>
                                                <div className={styles['price-inner']}>
                                                    <span className={styles['main-price']}>от 60 000 ₽</span>
                                                    <NavigationButton to={''} children={'разработать стратегию'} />
                                                </div>
                                            </div>
                                        )}
                                        {activeService === 'smm' && (
                                            <div className={styles['tab-panel']}>
                                                <h4 className={styles['price-note']}>Что входит:</h4>
                                                <ul>
                                                    <li>Разработка контент-стратегии</li>
                                                    <li>Создание креативов и текстов</li>
                                                    <li>Ведение сообществ</li>
                                                    <li>Запуск и ведение таргетированной рекламы</li>
                                                    <li>Работа с вовлечением</li>
                                                </ul>
                                                <h4 className={styles['price-note']}>Результат:</h4>
                                                <p>Узнаваемость бренда, лояльное комьюнити и постоянный поток лидов из соцсетей.</p>
                                                <h4 className={styles['price-note']}>Кому подходит:</h4>
                                                <p>Компаниям, которые хотят строить долгосрочные отношения с аудиторией в Instagram, VK, Telegram.</p>
                                                <div className={styles['price-inner']}>
                                                    <span className={styles['main-price']}>от 40 000 ₽</span>
                                                    <NavigationButton to={''} children={'продумать SMM'} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section__stages']}>
                                <h3>как мы выстраиваем работу?</h3>
                                <div className={styles['timeline']}>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>этап 1</span>
                                        <h4>Диагностика</h4>
                                        <p>Проводим глубокий аудит текущей ситуации (если есть) и погружаемся в бизнес-процессы.</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>этап 2</span>
                                        <h4>Стратегия</h4>
                                        <p>Согласовываем цели, KPI и разрабатываем поэтапный план работ.</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>этап 3</span>
                                        <h4>Реализация</h4>
                                        <p>Запускаем и ведем рекламные каналы, оптимизируем сайт, наполняем соцсети.</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>этап 4</span>
                                        <h4>Анализ</h4>
                                        <p>Еженедельно и ежемесячно снимаем данные, анализируем эффективность, тестируем гипотезы.</p>
                                    </div>
                                    <div className={styles['timeline-item']}>
                                        <span className={styles['timeline-days']}>этап 5</span>
                                        <h4>Отчет и корректировка</h4>
                                        <p>Предоставляем понятные отчеты о результатах и корректируем стратегию для увеличения ROI.</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['info-section']}>
                                <h3>готовы выстроить маркетинг, который приносит деньги?</h3>
                                <p>Закажите бесплатный экспресс-аудит ваших рекламных каналов. Наш специалист проанализирует их и даст 3 рекомендации по улучшению уже завтра.</p>
                                <p className={styles['privacy-note']}>Это ни к чему вас не обязывает. Только экспертное мнение.</p>
                                
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
                                        <input 
                                            placeholder='Ссылка на сайт' 
                                            className={styles['contact-input']}
                                            type="url"
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
                                            {isSubmitting ? 'Отправка...' : 'Получить бесплатный аудит'}
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