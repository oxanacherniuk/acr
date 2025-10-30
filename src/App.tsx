import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/index";
import DevelopersPage from "./pages/developers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DeveloperPage from "./pages/developerPage";
import ServiceDesign from "./pages/ServiceDesign";
import { ServiceMobileApp } from "./pages/ServiceMobileApp";
import ServiceAI from "./pages/ServiceAI";
// import { ServiceWebApp } from "./pages/ServiceWebApp";
import ServiceChatBots from "./pages/ServiceChatBots";
import Services from "./pages/Services";
import CompanyPage from "./pages/Company";
import ServiceLandings from "./pages/ServiceLandings";
import { ServiceEcommerce } from "./pages/ServiceEcommerce";
import { ServiceCorporate } from "./pages/ServiceCorporate";
import "./styles/App.css";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { ServiceMarketing } from "./pages/ServiceMarketing";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import { useEffect } from "react";
import Lenis from "lenis";
import Contact from "./pages/contact";
import StockPage from "./pages/StockPage";

function AppRoutes() {
  const location = useLocation();
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <div className="page-container">
            <HomePage />
          </div>
        }
      />
      <Route
        path="/developers"
        element={
          <div className="page-container">
            <DevelopersPage />
          </div>
        }
      />
      <Route
        path="/company"
        element={
          <div className="page-container">
            <CompanyPage />
          </div>
        }
      />
      <Route
        path="/developer/:id"
        element={
          <div className="page-container">
            <DeveloperPage />
          </div>
        }
      />
      <Route
        path="/soglasie-obrabotka-pers-dannih"
        element={
          <div className="page-container">
            <PrivacyPolicy />
          </div>
        }
      />
      <Route
        path="/services"
        element={
          <div className="page-container">
            <Services />
          </div>
        }
      />
      <Route
        path="/services/landings"
        element={
          <div className="page-container">
            <ServiceLandings />
          </div>
        }
      />
      <Route
        path="/services/ecommerce"
        element={
          <div className="page-container">
            <ServiceEcommerce />
          </div>
        }
      />
      <Route
        path="/services/corporate"
        element={
          <div className="page-container">
            <ServiceCorporate />
          </div>
        }
      />
      {/* <Route
        path="/services/web-app"
        element={
          <div className="page-container">
            <ServiceWebApp />
          </div>
        }
      /> */}
      <Route path="/services/chat-bots" element={<ServiceChatBots />} />
      <Route
        path="/services/ai"
        element={
          <div className="page-container">
            <ServiceAI />
          </div>
        }
      />
      <Route
        path="/services/mobile-app"
        element={
          <div className="page-container">
            <ServiceMobileApp />
          </div>
        }
      />
      <Route
        path="/services/design"
        element={
          <div className="page-container">
            <ServiceDesign />
          </div>
        }
      />
      <Route
        path="/services/marketing"
        element={
          <div className="page-container">
            <ServiceMarketing />
          </div>
        }
      />
      <Route
        path="/contact"
        element={
          <div className="page-container">
            <Contact />
          </div>
        }
      />
      <Route
        path="/stock/:url"
        element={
          <div className="page-container">
            <StockPage />
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <AppRoutes />
        <BottomNavigation />
      </Router>
    </div>
  );
}

export default App;
