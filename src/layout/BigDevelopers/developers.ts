import Pavel from '../../assets/images/pavel.jpg';
import Oksana from '../../assets/images/oksana.jpg';
import Platon from '../../assets/images/platon.jpg';
import Irina from '../../assets/images/irina.png';
import Maksim from '../../assets/images/maksim.jpg';
import AI from '../../assets/images/ai.jpg';
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
import PlatonBot1 from '../../assets/images/platonBot1.png';
import PlatonBot2 from '../../assets/images/platonBot2.png';

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
        position: 'Fullstack-разработчик',
        photo: Pavel,
        portfolio: [
        PavelSite1,
        PavelSite2,
        PavelSite3,
        PavelSite4
        ]
    },
    {
        id: 'platon',
        firstName: 'Платон',
        lastName: '',
        position: 'Python-разработчик',
        photo: Platon,
        portfolio: [
        PlatonBot1,
        PlatonBot2
        ]
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
        ]
    },
    {
        id: 'maksim',
        firstName: 'Максим',
        lastName: '',
        position: 'Руководитель, PR-маркетолог',
        photo: Maksim,
        portfolio: []
    },
    {
        id: 'irina',
        firstName: 'Ирина',
        lastName: '',
        position: 'Project менеджер',
        photo: Irina,
        portfolio: []
    },
    {
        id: 'ai',
        firstName: 'Ева',
        lastName: '',
        position: 'Искусственный интеллект',
        photo: AI,
        portfolio: []
    }
];