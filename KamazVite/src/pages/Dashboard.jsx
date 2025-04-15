import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";
import { useContract } from "../hooks/UseContract";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TransactionList from "../Components/TransactionList";

export default function Dashboard() {
  const { token } = useAuth();
  const { contract, address } = useContract();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!token) return;
      const data = await fetchTransactions(token);
      setTransactions(data);
    };

    loadData();
  }, [token]);

  return (
      <div className="p-4">
        <Navbar/>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <p>Connected Address: {address}</p>
      <ul>
        {transactions.map((t, idx) => (
          <li key={idx}>Agent: {t.agent_id}, Jumlah: {t.jumlah}, Harga: {t.total_price}</li>
        ))}
      </ul>
      <TransactionList/>
    </div>
  );
}
