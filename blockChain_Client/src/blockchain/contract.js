import { ethers } from 'ethers';
import contractJSON from './abi/MyContract.json';
const contractABI = contractJSON.abi;


const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // ganti sesuai alamat kontrak

export const getContract = async () => {
  if (!window.ethereum) throw new Error("Metamask tidak ditemukan");

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};

// Fungsi untuk kirim data batch dari transaksiData React
export const logTransactionsBatch = async (transaksiData) => {
  const contract = await getContract();

  const agent_ids = transaksiData.map((t) => Number(t.agent_id));
  const total_jumlahs = transaksiData.map((t) => Number(t.total_jumlah));
  const total_hargas = transaksiData.map((t) => ethers.parseUnits(t.total_harga, 0)); // gunakan 0 desimal

  const tx = await contract.logTransactionsBatch(agent_ids, total_jumlahs, total_hargas);
  await tx.wait(); // Tunggu transaksi selesai

  return tx.hash;
};
