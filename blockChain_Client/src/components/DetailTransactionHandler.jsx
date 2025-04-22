import { useEffect, useState } from 'react';
import { fetchDetailTransaksis } from '../api/api';
import { logDetailTransactionsBatch } from '../blockchain/contractDetailTransaction';
import DataTable from './DataTable';
import Swal from 'sweetalert2';

const DetailTransactionHandler = () => {
  const [detailData, setDetailData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchDetailTransaksis(token).then(setDetailData);
    }
  }, []);

  const handleSendDetailToBlockchain = async () => {
    try {
      setLoading(true);
      const txHash = await logDetailTransactionsBatch(detailData);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Detail transaksi berhasil dikirim ke blockchain.\nTx Hash: ${txHash}`,
        confirmButtonColor: '#10B981',
      });
    } catch (err) {
      console.error('Gagal mengirim detail transaksi:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal mengirim detail transaksi ke blockchain.',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Detail Transaksi</h3>
        <DataTable data={detailData} />
      </section>
      <button
        onClick={handleSendDetailToBlockchain}
        disabled={loading || detailData.length === 0}
        className={`px-6 py-2 rounded text-white font-semibold transition ${
          loading || detailData.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {loading ? 'Mengirim...' : 'Kirim Detail Transaksi ke Blockchain'}
      </button>
    </>
  );
};

export default DetailTransactionHandler;
