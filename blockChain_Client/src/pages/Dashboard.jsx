import { useEffect, useState } from 'react';
import { fetchDetailTransaksis, fetchTransaksis } from '../api/api';
import { logTransactionsBatch } from '../blockchain/contract';
import DataTable from '../components/DataTable';

const Dashboard = () => {
  const [detailData, setDetailData] = useState([]);
  const [transaksiData, setTransaksiData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchDetailTransaksis(token).then(setDetailData);
      fetchTransaksis(token).then(setTransaksiData);
    }
  }, []);

  const handleSendToBlockchain = async () => {
    try {
      setLoading(true);
      const txHash = await logTransactionsBatch(transaksiData);
      alert(`Berhasil dikirim ke blockchain! Tx Hash: ${txHash}`);
    } catch (err) {
      console.error('Gagal mengirim transaksi:', err);
      alert('Gagal mengirim transaksi ke blockchain.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-10">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Detail Transaksi</h3>
          <DataTable data={detailData} />
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Transaksi Ringkas</h3>
          <DataTable data={transaksiData} />
        </section>

        <button
          onClick={handleSendToBlockchain}
          disabled={loading || transaksiData.length === 0}
          className={`px-6 py-2 rounded text-white font-semibold transition ${
            loading || transaksiData.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? 'Mengirim...' : 'Kirim Transaksi ke Blockchain'}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
