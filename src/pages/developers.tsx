import { BigDevelopersLayout } from '../layout/BigDevelopers/BigDevelopers';
import { FooterLayout } from '../layout/Footer/Footer';
import { HeaderLayout } from '../layout/Header/Header';

const DevelopersPage: React.FC = () => {
    return (
        <div>
            <HeaderLayout />
            <BigDevelopersLayout />
            <FooterLayout />
        </div>
    )
};

export default DevelopersPage;