import { useState, useEffect } from 'react';
import { HeaderLayout } from '../layout/Header/Header';
import { FooterLayout } from '../layout/Footer/Footer';
import styles from './CompanyPage.module.css';
import CompanyPhoto from '../assets/images/company-photo.jpg';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';

export default function CompanyPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div>
            <HeaderLayout />
            <div className={styles['company-page']}>
                <div className='container'>
                    <div className={`${styles['company-header']} ${isVisible ? styles['visible'] : ''}`}>
                        <h1 className={styles['company-title']}>Мы не просто создаем сайты. <br /> Мы <span style={{ color: 'white' }}>развиваем бизнес</span>  с помощью digital-инструментов</h1>
                        <div className={styles['title-decoration']}></div>
                    </div>

                    <div className={styles['company-content']}>

                        <div className={`${styles['about-flex-section']} ${isVisible ? styles['visible'] : ''}`}>
                            <div className={styles['company-photo-container']}>
                                <img 
                                    src={CompanyPhoto} 
                                    alt="Аналитический центр Развития"
                                    className={styles['company-photo']}
                                />
                            </div>
                            
                            <div className={styles['about-text-container']}>
                                <h2 className={styles['about-main-title']}>Аналитический Центр Развития</h2>
                                <div className={styles['about-text']}>
                                    <p>
                                        «Аналитический центр развития» — это команда экспертов по digital, 
                                        которые на основе глубокого анализа строят эффективные онлайн-решения, 
                                        приносящие нашим клиентам прибыль и устойчивый рост.
                                    </p>
                                    <p>
                                        С 2010 года мы помогаем компаниям различных масштабов 
                                        реализовывать их digital-стратегии. От стартапов до крупных 
                                        корпораций - мы находим индивидуальный подход к каждому клиенту.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['values-section']} ${isVisible ? styles['visible'] : ''}`}>
                            <h3 className={styles['section-title']}>наша философия: осознанный подход к развитию вашего бизнеса</h3>
                            <div className={styles['values-grid']}>
                                <div className={styles['value-item']}>
                                    <h4 className={styles['value-title']}>Анализ — наше второе имя</h4>
                                    <p className={styles['value-text']}>
                                        Мы не начинаем работу без глубокого погружения в ваш бизнес, рынок и цели. 
                                        Каждое наше решение основано на данных, а не на интуиции.
                                    </p>
                                </div>
                                <div className={styles['value-item']}>
                                    <h4 className={styles['value-title']}>Комплексность и синергия</h4>
                                    <p className={styles['value-text']}>
                                        Мы объединяем разработку и маркетинг в единый процесс. Это позволяет избежать 
                                        разрозненности и получить максимальный результат от вложений.
                                    </p>
                                </div>
                                <div className={styles['value-item']}>
                                    <h4 className={styles['value-title']}>Партнерство, а не подряд</h4>
                                    <p className={styles['value-text']}>
                                        Мы искренне заинтересованы в вашем успехе. Вы получаете не просто исполнителя, 
                                        а надежного советника и партнера в digital-среде.
                                    </p>
                                </div>
                                <div className={styles['value-item']}>
                                    <h4 className={styles['value-title']}>Прозрачность и ясность</h4>
                                    <p className={styles['value-text']}>
                                        Вы всегда понимаете, на каком этапе находится проект, какие задачи решаются 
                                        и как расходуется бюджет. Мы говорим с вами на одном языке.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['history-section']} ${isVisible ? styles['visible'] : ''}`}>
                            <h3 className={styles['section-title']}>от идеи к лидерству: как мы росли</h3>
                            <div className={styles['timeline']}>
                                <div className={styles['timeline-item']}>
                                    <span className={styles['timeline-year']}>2010</span>
                                    <h4 className={styles['timeline-title']}>Основание компании</h4>
                                    <p className={styles['timeline-text']}>Фокус на веб-аналитике и контекстной рекламе</p>
                                </div>
                                <div className={styles['timeline-item']}>
                                    <span className={styles['timeline-year']}>2019</span>
                                    <h4 className={styles['timeline-title']}>Расширение портфеля услуг</h4>
                                    <p className={styles['timeline-text']}>Запуск направления по разработке сайтов. Первые комплексные клиенты</p>
                                </div>
                                <div className={styles['timeline-item']}>
                                    <span className={styles['timeline-year']}>2020-2022</span>
                                    <h4 className={styles['timeline-title']}>Становление методологии</h4>
                                    <p className={styles['timeline-text']}>Объединение аналитики, разработки и маркетинга в единый продукт. Формирование костяка команды</p>
                                </div>
                                <div className={styles['timeline-item']}>
                                    <span className={styles['timeline-year']}>2023-н.в.</span>
                                    <h4 className={styles['timeline-title']}>Лидерство в отрасли</h4>
                                    <p className={styles['timeline-text']}>Разработка и сопровождение успешных проектов. Мы — надежный партнер для среднего и крупного бизнеса</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['team-section']} ${isVisible ? styles['visible'] : ''}`}>
                            <h3 className={styles['section-title']}>наша сила — в экспертизе нашей команды</h3>
                            <p className={styles['team-description']}>
                                Над каждым проектом работает сплоченная команда специалистов с глубокой экспертизой 
                                в своей области. Мы постоянно учимся и отслеживаем тренды digital.
                            </p>
                            <div className={styles['team-grid']}>
                                <div className={styles['team-member']}>
                                    <h4 className={styles['member-name']}>Алексей Петров</h4>
                                    <p className={styles['member-position']}>Стратег, аналитик</p>
                                    <p className={styles['member-description']}>Опыт в digital — 12 лет. Специализируется на комплексных digital-стратегиях</p>
                                </div>
                                <div className={styles['team-member']}>
                                    <h4 className={styles['member-name']}>Мария Сидорова</h4>
                                    <p className={styles['member-position']}>Lead Designer</p>
                                    <p className={styles['member-description']}>Специализируется на интерфейсах, повышающих конверсию. Опыт 8 лет</p>
                                </div>
                                <div className={styles['team-member']}>
                                    <h4 className={styles['member-name']}>Дмитрий Иванов</h4>
                                    <p className={styles['member-position']}>Технический директор</p>
                                    <p className={styles['member-description']}>Эксперт в высоконагруженных системах и сложной интеграции. Опыт 10 лет</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['stats-section']} ${isVisible ? styles['visible'] : ''}`}>
                            <h3 className={styles['section-title']}>мы говорим на языке цифр и результатов</h3>
                            <div className={styles['stats-grid']}>
                                <div className={styles['stat-item']}>
                                    <span className={styles['stat-number']}>15+</span>
                                    <p className={styles['stat-label']}>Лет на рынке digital-разработки и аналитики</p>
                                </div>
                                <div className={styles['stat-item']}>
                                    <span className={styles['stat-number']}>95%</span>
                                    <p className={styles['stat-label']}>Клиентов рекомендуют нас партнерам</p>
                                </div>
                                <div className={styles['stat-item']}>
                                    <span className={styles['stat-number']}>1 год</span>
                                    <p className={styles['stat-label']}>Гарантийная поддержка на все проекты</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['process-section']} ${isVisible ? styles['visible'] : ''}`}>
                            <h3 className={styles['section-title']}>наш процесс — это четкость и предсказуемость результата</h3>
                            <p className={styles['process-description']}>
                                Мы отладили каждый этап работы, чтобы вы получали ровно тот результат, 
                                который ожидаете, в оговоренные сроки и бюджет.
                            </p>
                            <div className={styles['process-timeline']}>
                                <div className={styles['process-step']}>
                                    <span className={styles['step-number']}>1</span>
                                    <h4 className={styles['step-title']}>Исследование</h4>
                                    <p className={styles['step-text']}>Погружение в бизнес, анализ ЦА и конкурентов</p>
                                </div>
                                <div className={styles['process-step']}>
                                    <span className={styles['step-number']}>2</span>
                                    <h4 className={styles['step-title']}>Стратегия</h4>
                                    <p className={styles['step-text']}>Формируем план, утверждаем KPI и дорожную карту</p>
                                </div>
                                <div className={styles['process-step']}>
                                    <span className={styles['step-number']}>3</span>
                                    <h4 className={styles['step-title']}>Прототип и дизайн</h4>
                                    <p className={styles['step-text']}>Создаем логику и визуал, который конвертирует</p>
                                </div>
                                <div className={styles['process-step']}>
                                    <span className={styles['step-number']}>4</span>
                                    <h4 className={styles['step-title']}>Разработка и интеграция</h4>
                                    <p className={styles['step-text']}>Программируем, подключаем CRM и инструменты</p>
                                </div>
                                <div className={styles['process-step']}>
                                    <span className={styles['step-number']}>5</span>
                                    <h4 className={styles['step-title']}>Запуск и тестирование</h4>
                                    <p className={styles['step-text']}>Проводим полное тестирование и запускаем проект</p>
                                </div>
                                <div className={styles['process-step']}>
                                    <span className={styles['step-number']}>6</span>
                                    <h4 className={styles['step-title']}>Поддержка и рост</h4>
                                    <p className={styles['step-text']}>Анализируем данные, масштабируем успешные гипотезы</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['requisites-section']} ${isVisible ? styles['visible'] : ''}`}>
                            <h3 className={styles['section-title']}>реквизиты</h3>
                            <div className={styles['requisites-card']}>
                                <div className={styles['requisites-grid']}>
                                    <div className={styles['requisites-item']}>
                                        <h4 className={styles['requisites-subtitle']}>Общая информация</h4>
                                        <p className={styles['requisites-text']}>
                                            ООО «Аналитический Центр Развитие»<br/>
                                            ИНН 7325112704<br/>
                                            КПП 732601001<br/>
                                            ОГРН 1127325002573<br/>
                                            ОКПО 97638790<br/>
                                            Основной ОКВЭД 22.22
                                        </p>
                                    </div>
                                    
                                    <div className={styles['requisites-item']}>
                                        <h4 className={styles['requisites-subtitle']}>Адреса</h4>
                                        <p className={styles['requisites-text']}>
                                            <strong>Фактический адрес:</strong><br/>
                                            г. Ульяновск, ул. Чайковского, д. 1 <br/><br/>

                                            <strong>Юридический адрес:</strong><br/>
                                            432063, РФ, Ульяновская обл.,<br/>
                                            г. Ульяновск, ул. Кирова, д. 6, кв. 397<br/><br/>
                                            
                                            <strong>Почтовый адрес:</strong><br/>
                                            432063, РФ, Ульяновская обл.,<br/>
                                            г. Ульяновск, ул. Кирова, д. 6, кв. 397
                                        </p>
                                    </div>
                                    
                                    <div className={styles['requisites-item']}>
                                        <h4 className={styles['requisites-subtitle']}>Банковские реквизиты</h4>
                                        <p className={styles['requisites-text']}>
                                            Р/с 40702810129280002066<br/>
                                            ФИЛИАЛ "НИЖЕГОРОДСКИЙ" АО "АЛЬФА-БАНК"<br/>
                                            БИК 042202824<br/>
                                            Корр. счет: 30101810200000000824
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['contacts-section']} ${isVisible ? styles['visible'] : ''}`}>
                            <h3 className={styles['section-title']}>контакты</h3>
                            <div className={styles['contacts-grid']}>
                                <div className={styles['contact-item']}>
                                    <div className={styles['contact-info']}>
                                        <h4>Email</h4>
                                        <p>info@acr-development.ru</p>
                                    </div>
                                </div>
                                <div className={styles['contact-item']}>
                                    <div className={styles['contact-info']}>
                                        <h4>Телефон</h4>
                                        <p>+7 (905) 349-14-49</p>
                                    </div>
                                </div>
                                <div className={styles['contact-item']}>
                                    <div className={styles['contact-info']}>
                                        <h4>Время работы</h4>
                                        <p>Пн-Пт: 9:00 - 18:00</p>
                                    </div>
                                </div>
                                <div className={styles['contact-item']}>
                                    <div className={styles['contact-info']}>
                                        <h4>Адрес</h4>
                                        <p>г. Ульяновск, ул. Чайковского, д. 1</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['map-section']} ${isVisible ? styles['visible'] : ''}`}>
                            <h3 className={styles['section-title']}>мы находимся</h3>
                            <div className={styles['map-container']}>
                                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A148b4d8d414a5d6710d30e4ed0cd3105f6c07ae2a085ef7f991f8776be183475&amp;source=constructor" className={styles['map']}
                                    title="Карта расположения компании"
                                    loading="lazy" width="100%" height="400">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterLayout />
            <BottomNavigation />
        </div>
    );
}