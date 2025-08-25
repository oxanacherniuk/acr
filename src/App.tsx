import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/index';
import AmentiesPage from './pages/amenities';
import DevelopersPage from './pages/developers';

function App() {
  return (
    <div>
      <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/amenties" element={<AmentiesPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
