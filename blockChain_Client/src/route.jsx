import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ContractList from './pages/ContractList'; // ⬅️ import halaman baru

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/contracts" element={<ContractList />} /> {/* ⬅️ route baru */}
  </Routes>
);

export default AppRoutes;
