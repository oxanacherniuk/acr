import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import { FooterLayout } from '../layout/Footer/Footer';
import { HeaderLayout } from '../layout/Header/Header';
import { PortfolioLayout } from '../layout/Portfolio/Portfolio';
import { ServicesLayout } from '../layout/Services/Services';

const ServicesPage: React.FC = () => {
    return (
        <div>
            <HeaderLayout />
            <ServicesLayout />
            <PortfolioLayout />
            <FooterLayout />
            <BottomNavigation />
        </div>
    )
};

export default ServicesPage;