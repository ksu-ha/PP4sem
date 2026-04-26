import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CasesPage from '../pages/Cases/CasesPage';
import SentCasesPage from '../pages/Cases/SentCasesPage';
import CaseViewPage from '../pages/Cases/CaseViewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/sent-cases" element={<SentCasesPage />} />
        <Route path="/cases/:id" element={<CaseViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;