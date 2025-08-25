import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/index';
import AmentiesPage from './pages/amenities';
import DevelopersPage from './pages/developers';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <div>
      <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/amenties" element={<AmentiesPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/soglasie-obrabotka-pers-dannih" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
