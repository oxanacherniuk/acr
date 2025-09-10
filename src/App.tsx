import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './pages/index';
import DevelopersPage from './pages/developers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeveloperPage from './pages/developerPage';
import { ServiceDesign } from './pages/ServiceDesign';
import { ServiceMobileApp } from './pages/ServiceMobileApp';
import { ServiceAI } from './pages/ServiceAI';
import { ServiceWebApp } from './pages/ServiceWebApp';
import { ServiceChatBots } from './pages/ServiceChatBots';
import Services from './pages/Services';
import CompanyPage from './pages/Company';
import { ServiceLandings } from './pages/ServiceLandings';
import { ServiceEcommerce } from './pages/ServiceEcommerce';
import { ServiceCorporate } from './pages/ServiceCorporate';
import './App.css';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { ServiceMarketing } from './pages/ServiceMarketing';

type NavigationType = 'POP' | 'PUSH' | 'REPLACE';

function AnimatedRoutes() {
  const location = useLocation();
  const navigationType = useNavigationType();

  const getAnimation = (type: NavigationType) => {
    if (type === 'POP') {
      return {
        initial: { x: -300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 300, opacity: 0 }
      };
    } else {
      return {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 }
      };
    }
  };

  const animation = getAnimation(navigationType);

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <div className="motion-div">
              <HomePage />
            </div>
          }
        />
        <Route
          path="/developers"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <DevelopersPage />
            </motion.div>
          }
        />
        <Route
          path="/company"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <CompanyPage />
            </motion.div>
          }
        />
        <Route
          path="/developer/:id"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <DeveloperPage />
            </motion.div>
          }
        />
        <Route
          path="/soglasie-obrabotka-pers-dannih"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <PrivacyPolicy />
            </motion.div>
          }
        />
        <Route
          path="/services"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <Services />
            </motion.div>
          }
        />
        <Route
          path="/services/landings"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="motion-div"
            >
              <ServiceLandings />
            </motion.div>
          }
        />
        <Route
          path="/services/ecommerce"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <ServiceEcommerce />
            </motion.div>
          }
        />
        <Route
          path="/services/corporate"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <ServiceCorporate />
            </motion.div>
          }
        />
        <Route
          path="/services/web-app"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <ServiceWebApp />
            </motion.div>
          }
        />
        <Route
          path="/services/chat-bots"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <ServiceChatBots />
            </motion.div>
          }
        />
        <Route
          path="/services/ai"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <ServiceAI />
            </motion.div>
          }
        />
        <Route
          path="/services/mobile-app"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <ServiceMobileApp />
            </motion.div>
          }
        />
        <Route
          path="/services/design"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <ServiceDesign />
            </motion.div>
          }
        />
        <Route
          path="/services/marketing"
          element={
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="motion-div"
            >
              <ServiceMarketing />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;