import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token tidak ditemukan. Silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/dataTransaksi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (err) {
      console.error("❌ Gagal mengambil data transaksi:", err);
      setError("Gagal mengambil data transaksi. Periksa token atau login ulang.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <p>Loading transaksi...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Data Transaksi</h3>
      <ul className="space-y-2">
        {transactions.map((t, idx) => (
          <li key={idx} className="border p-3 rounded shadow">
            <p>🆔 Agent ID: {t.agent_id}</p>
            <p>📦 Jumlah: {t.jumlah}</p>
            <p>💰 Total Harga: {t.total_price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
