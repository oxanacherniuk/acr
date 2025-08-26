import { AmenitiesLayout } from '../layout/Amenities/Amenities';
import { FooterLayout } from '../layout/Footer/Footer';
import { HeaderLayout } from '../layout/Header/Header';
import { PortfolioLayout } from '../layout/Portfolio/Portfolio';

const AmentiesPage: React.FC = () => {
    return (
        <div>
            <HeaderLayout />
            <AmenitiesLayout />
            <PortfolioLayout />
            <FooterLayout />
        </div>
    )
};

export default AmentiesPage;