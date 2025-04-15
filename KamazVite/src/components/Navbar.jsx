import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Simulasi nama user (nanti bisa ambil dari token decoded atau API user)
  const username = "AgentX";

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/send-contract" className="hover:text-blue-400">Send Contract</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">👤 {username}</span>
        {token && (
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
