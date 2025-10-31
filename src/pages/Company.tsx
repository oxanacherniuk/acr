import { HeaderLayout } from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { AboutSection } from "../components/Compani/AboutSection";
import { HeroSection } from "../components/Compani/HeroSection";
import { PhilosophySection } from "../components/Compani/PhilosophySection";
import { TimelineSection } from "../components/Compani/TimelineSection";
import { ProcessSection } from "../components/Compani/ProcessSection";
import { HowItWorksSection } from "../components/Compani/HowItWorksSection";
import { StatsSection } from "../components/Compani/StatsSection";
import { RequisitesSection } from "../components/Compani/RequisitesSection";

export default function CompanyPage() {


  return (
    <div>
      <HeaderLayout />
      <HeroSection/>
      <AboutSection/>
      <PhilosophySection/>
      <TimelineSection/>
      <ProcessSection/>
      <HowItWorksSection/>
      <StatsSection/>
      <RequisitesSection/>
     
      <Footer/>
    </div>
  );
}
