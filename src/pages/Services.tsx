import Footer from '../layout/Footer/Footer';
import { HeaderLayout } from '../layout/Header/Header';
import { PortfolioLayout } from '../layout/Portfolio/Portfolio';
import { ServicesLayout } from '../layout/Services/Services';

const ServicesPage: React.FC = () => {
    return (
        <div>
            <HeaderLayout />
            <ServicesLayout />
            <PortfolioLayout />
            <Footer/>
        </div>
    )
};

export default ServicesPage;