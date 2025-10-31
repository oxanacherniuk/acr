import Pavel from '../../assets/images/pavel.jpg';
import Oksana from '../../assets/images/oksana.jpg';
import Platon from '../../assets/images/platon.jpg';
import Irina from '../../assets/images/irina.jpg';
import Maksim from '../../assets/images/maksim.jpg';
import AI from '../../assets/images/eva.jpg';
import Elena from '../../assets/images/elena.jpg';
import Lev from '../../assets/images/lev.jpg';
import OksanaSite1 from '../../assets/images/oksana-site1.webp';
import OksanaSite2 from '../../assets/images/oksana-site2.webp';
import OksanaSite3 from '../../assets/images/oksana-site3.webp';
import OksanaSite4 from '../../assets/images/oksana-site4.webp';
import OksanaSite5 from '../../assets/images/oksana-site5.webp';
import OksanaSite6 from '../../assets/images/oksana-site6.webp';
import OksanaSite7 from '../../assets/images/oksana-site7.webp';
import OksanaSite8 from '../../assets/images/oksana-site8.webp';
import PavelSite1 from '../../assets/images/pavel-site1.webp';
import PavelSite2 from '../../assets/images/pavel-site2.webp';
import PavelSite3 from '../../assets/images/pavel-site3.webp';
import PavelSite4 from '../../assets/images/pavel-site4.webp';
import PlatonBot1 from '../../assets/images/platonBot1.webp';
import PlatonBot2 from '../../assets/images/platonBot2.webp';
import PlatonBot3 from '../../assets/images/platonBot3.webp';

export interface Developer {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    photo: string;
    portfolio: string[];
    description: string;
}

export const developers: Developer[] = [
    {
        id: 'ai',
        firstName: 'Ева',
        lastName: '',
        position: 'Искусственный интеллект',
        photo: AI,
        portfolio: [],
        description: 'AI/ML инженер, специализирующийся на машинном обучении и компьютерном зрении.'
    },
    {
        id: 'pavel',
        firstName: 'Павел',
        lastName: '',
        position: 'Fullstack-разработчик',
        photo: Pavel,
        portfolio: [
            PavelSite1,
            PavelSite2,
            PavelSite3,
            PavelSite4
        ],
        description: 'Специалист по fullstack-разработке с 5-летним опытом. Создает интуитивные и отзывчивые интерфейсы.'
    },
    {
        id: 'platon',
        firstName: 'Платон',
        lastName: '',
        position: 'Python-разработчик',
        photo: Platon,
        portfolio: [
            PlatonBot1,
            PlatonBot2,
            PlatonBot3
        ],
        description: 'Бэкенд-архитектор с глубокими знаниями в микросервисной архитектуре. Разрабатывает надежные серверные решения.'
    },
    {
        id: 'oksana',
        firstName: 'Оксана',
        lastName: '',
        position: 'Fullstack-разработчик',
        photo: Oksana,
        portfolio: [
            OksanaSite1,
            OksanaSite2,
            OksanaSite3, 
            OksanaSite4, 
            OksanaSite5,
            OksanaSite6,
            OksanaSite7,
            OksanaSite8
        ],
        description: 'Full-stack разработчик с фокусом на веб-приложения. Объединяет креативный дизайн с технической реализацией.'
    },
    {
        id: 'maksim',
        firstName: 'Максим',
        lastName: '',
        position: 'Руководитель, PR-маркетолог',
        photo: Maksim,
        portfolio: [],
        description: 'Технический лидер с 8-летним опытом управления командами. Специализируется на сложных enterprise-проектах.'
    },
    {
        id: 'irina',
        firstName: 'Ирина',
        lastName: '',
        position: 'Project менеджер',
        photo: Irina,
        portfolio: [],
        description: 'Опытный проект-менеджер с навыками координации команд и управления сроками.'
    },
    {
        id: 'lev',
        firstName: 'Лев',
        lastName: '',
        position: 'Мобильный разработчик',
        photo: Lev,
        portfolio: [],
        description: 'Mobile-разработчик с экспертизой в кроссплатформенных решениях. Создает нативные приложения для iOS и Android.'
    },
    {
        id: 'elena',
        firstName: 'Елена',
        lastName: '',
        position: 'Тестировщик',
        photo: Elena,
        portfolio: [],
        description: 'QA-инженер с вниманием к деталям. Специализируется на автоматизированном тестировании и обеспечении качества продукта.'
    }
];