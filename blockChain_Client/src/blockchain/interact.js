import { getContract } from './contractTransaction';

// Kirim satu data transaksi
export const sendTransaksiToBlockchain = async (transaksi) => {
  try {
    const contract = await getContract();

    const tx = await contract.storeTransaksi(
      transaksi.transaksi_id,
      transaksi.user,
      transaksi.server
      // tambah parameter lain sesuai kontrakmu
    );

    await tx.wait();
    console.log("✅ Terkirim:", tx.hash);
  } catch (err) {
    console.error("❌ Gagal kirim transaksi:", err);
  }
};

// Kirim semua data sekaligus
export const sendAllTransaksi = async (list) => {
  for (const trx of list) {
    await sendTransaksiToBlockchain(trx);
  }
};
