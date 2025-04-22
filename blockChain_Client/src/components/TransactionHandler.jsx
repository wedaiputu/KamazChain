import { useEffect, useState } from 'react';
import { fetchTransaksis } from '../api/api';
import { logTransactionsBatch } from '../blockchain/contractTransaction';
import DataTable from './DataTable';
import Swal from 'sweetalert2';

const TransactionHandler = () => {
  const [transaksiData, setTransaksiData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchTransaksis(token).then(setTransaksiData);
    }
  }, []);

  const handleSendToBlockchain = async () => {
    try {
      setLoading(true);
      const txHash = await logTransactionsBatch(transaksiData);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Transaksi berhasil dikirim ke blockchain.\nTx Hash: ${txHash}`,
        confirmButtonColor: '#10B981',
      });
    } catch (err) {
      console.error('Gagal mengirim transaksi:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal mengirim transaksi ke blockchain.',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
};

export default TransactionHandler;
