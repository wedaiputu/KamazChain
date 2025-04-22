import { useEffect, useState } from 'react';
import { getAllTransactions } from '../blockchain/contractTransaction';
import DataTable from '../components/DataTable';
import Sidebar from '../components/Sidebar';

const ContractList = () => {
  const [transaksiOnChain, setTransaksiOnChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const data = await getAllTransactions();
        console.log("✅ Data dari blockchain:", data);
        setTransaksiOnChain(data);
      } catch (err) {
        console.error("❌ Gagal fetch data dari blockchain:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex">
      <Sidebar />
      <div className="flex-1 ml-16 group-hover:ml-48 transition-all duration-300 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">Contract List</h2>

          {loading ? (
            <p>Loading data dari blockchain...</p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-2">📦 Data mentah (debug preview):</p>
              <pre className="bg-gray-100 p-4 text-xs max-h-64 overflow-auto mb-4 rounded">
                {JSON.stringify(transaksiOnChain, null, 2)}
              </pre>

              <DataTable data={transaksiOnChain} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractList;
