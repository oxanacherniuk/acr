import React from 'react';
import { HeaderLayout } from '../layout/Header/Header';
import { BannerLayout } from '../layout/Banner/Banner';
import { ServicesLayout } from '../layout/Services/Services';
import { DevelopersLayout } from '../layout/Developers/Developers';
import { TechnologiesLayout } from '../layout/Technologies/Technologies';
import { ReviewsLayout } from '../layout/Reviews/Reviews';
import { DiscussionLayout } from '../layout/Discussion/Discussion';
import { ContactLayout } from '../layout/ContactForm/ContactForm';
import { FooterLayout } from '../layout/Footer/Footer';

const IndexPage: React.FC = () => {
    return (
        <div>
            <HeaderLayout />
            <BannerLayout />
            <ServicesLayout />
            <DevelopersLayout />
            <DiscussionLayout />
            <TechnologiesLayout />
            <ReviewsLayout />
            <ContactLayout />
            <FooterLayout />
        </div>
    );
};

export default IndexPage;