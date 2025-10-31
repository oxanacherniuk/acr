import { BigDevelopersLayout } from '../layout/BigDevelopers/BigDevelopers';
import Footer from '../layout/Footer/Footer';
import { HeaderLayout } from '../layout/Header/Header';

const DevelopersPage: React.FC = () => {
    return (
        <div>
            <HeaderLayout />
            <BigDevelopersLayout />
            <Footer/>
        </div>
    )
};

export default DevelopersPage;