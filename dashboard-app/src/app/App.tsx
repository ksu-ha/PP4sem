import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CasesPage from '../pages/Cases/CasesPage';
import SentCasesPage from '../pages/Cases/SentCasesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/cases/sent" element={<SentCasesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;