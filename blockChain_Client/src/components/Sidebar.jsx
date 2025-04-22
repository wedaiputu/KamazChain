import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiLogOut } from 'react-icons/fi'; // Tambahkan icon logout
import { cn } from '../utils/cn';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // atau sessionStorage, sesuai implementasi kamu
    navigate('/');
  };

  return (
    <div className="h-screen fixed top-0 left-0 transition-all duration-300 bg-gray-900 text-white w-16 hover:w-48 overflow-hidden z-50 peer">
      <div className="flex flex-col h-full p-4 space-y-4 min-w-0 justify-between">
        <div className="space-y-4">
          <SidebarItem
            to="/dashboard"
            icon={<FiHome className="text-xl" />}
            label="Dashboard"
            active={location.pathname === '/dashboard'}
          />
          <SidebarItem
            to="/contracts"
            icon={<FiFileText className="text-xl" />}
            label="Contract List"
            active={location.pathname === '/contracts'}
          />
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center p-2 rounded-md hover:bg-red-600 transition text-white"
        >
          <div className="shrink-0 w-6 text-xl">
            <FiLogOut />
          </div>
          <span className="overflow-hidden whitespace-nowrap w-0 group-hover:w-auto group-hover:pl-2 transition-all duration-300">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={cn(
      'group flex items-center p-2 rounded-md hover:bg-gray-700 transition',
      active ? 'bg-gray-800' : ''
    )}
  >
    <div className="shrink-0 w-6 text-xl">{icon}</div>
    <span
      className={cn(
        'overflow-hidden whitespace-nowrap w-0 group-hover:w-auto group-hover:pl-2 transition-all duration-300'
      )}
    >
      {label}
    </span>
  </Link>
);

export default Sidebar;
