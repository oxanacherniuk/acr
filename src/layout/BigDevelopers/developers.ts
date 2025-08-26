import Pavel from '../../assets/images/pavel.png';
import Oksana from '../../assets/images/oksana.png';
import AI from '../../assets/images/ai.png';
import Platon from '../../assets/images/oksana.png';
import Irina from '../../assets/images/oksana.png';
import Maksim from '../../assets/images/oksana.png';
import OksanaSite1 from '../../assets/images/oksana-site1.png';
import OksanaSite2 from '../../assets/images/oksana-site2.png';
import OksanaSite3 from '../../assets/images/oksana-site3.png';
import OksanaSite4 from '../../assets/images/oksana-site4.png';
import OksanaSite5 from '../../assets/images/oksana-site5.png';
import OksanaSite6 from '../../assets/images/oksana-site6.png';
import OksanaSite7 from '../../assets/images/oksana-site7.png';
import OksanaSite8 from '../../assets/images/oksana-site8.png';
import PavelSite1 from '../../assets/images/pavel-site1.png';
import PavelSite2 from '../../assets/images/pavel-site2.png';
import PavelSite3 from '../../assets/images/pavel-site3.png';
import PavelSite4 from '../../assets/images/pavel-site4.png';

export interface Developer {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    photo: string;
    portfolio: string[];
}

export const developers: Developer[] = [
    {
        id: 'pavel',
        firstName: 'Павел',
        lastName: '',
        position: 'Backend-разработчик',
        photo: Pavel,
        portfolio: [
        PavelSite1,
        PavelSite2,
        PavelSite3,
        PavelSite4
        ]
    },
    {
        id: 'ii',
        firstName: 'ИИ',
        lastName: '',
        position: 'AI разработчик',
        photo: AI,
        portfolio: [
        '/images/portfolio/ii-1.jpg',
        '/images/portfolio/ii-2.jpg'
        ]
    },
    {
        id: 'oksana',
        firstName: 'Оксана',
        lastName: '',
        position: 'Frontend разработчик',
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
        ]
    },
    {
        id: 'platon',
        firstName: 'Платон',
        lastName: '',
        position: 'Fullstack разработчик',
        photo: Platon,
        portfolio: [
        '/images/portfolio/platon-1.jpg',
        '/images/portfolio/platon-2.jpg'
        ]
    },
    {
        id: 'irina',
        firstName: 'Ирина',
        lastName: '',
        position: 'UI/UX дизайнер',
        photo: Irina,
        portfolio: [
        '/images/portfolio/irina-1.jpg',
        '/images/portfolio/irina-2.jpg',
        '/images/portfolio/irina-3.jpg'
        ]
    },
    {
        id: 'maksim',
        firstName: 'Максим',
        lastName: '',
        position: 'Backend разработчик',
        photo: Maksim,
        portfolio: [
        '/images/portfolio/maksim-1.jpg',
        '/images/portfolio/maksim-2.jpg'
        ]
    }
];