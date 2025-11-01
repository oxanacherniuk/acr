import { BannerLayout } from '../layout/Banner/Banner';
import { ServicesLayout } from '../layout/Services/Services';
import { DevelopersLayout } from '../layout/Developers/Developers';
import { TechnologiesLayout } from '../layout/Technologies/Technologies';
import { ReviewsLayout } from '../layout/Reviews/Reviews';
import { DiscussionLayout } from '../layout/Discussion/Discussion';
import Footer from '../layout/Footer/Footer';
import { PortfolioLayout } from '../layout/Portfolio/Portfolio';
import { SecondBannerLayout } from '../layout/SecondBanner/SecondBanner';
import BannnerMP4 from '../assets/video/bab2.mp4';
import { HeaderLayout } from '../layout/Header/Header';
import { MoveUp } from '../components/Motions';
import { ContactSection } from '../layout/FosForm';

const IndexPage: React.FC = () => {
    return (
        <div>
            <HeaderLayout />
            <div className='AiBanner '>
                <video 
                    className='banner-video'
                    autoPlay
                    muted
                    loop
                    playsInline
                    pip="false"
                >
                    <source src={BannnerMP4} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
                <BannerLayout />
            </div>
            {/* <StockAll/> */}
            <MoveUp>

                <SecondBannerLayout />
            </MoveUp>
            <ServicesLayout />
            <DevelopersLayout />
            <DiscussionLayout />
            <TechnologiesLayout />
            <ReviewsLayout />
            <PortfolioLayout />
            <ContactSection/>
            {/* <ContactLayout /> */}
            <Footer/>
        </div>
    );
};

export default IndexPage;