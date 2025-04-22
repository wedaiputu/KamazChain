import { ethers } from 'ethers';
import contractJSON from './abi/MyContract.json';

const contractABI = contractJSON.abi;
const CONTRACT_ADDRESS = "0x4A679253410272dd5232B3Ff7cF5dbB88f295319"; // Ganti sesuai alamat kamu

export const getContract = async () => {
  if (!window.ethereum) throw new Error("Metamask tidak ditemukan");

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};

export const logTransactionsBatch = async (transaksiData) => {
  const contract = await getContract();

  const agent_ids = transaksiData.map((t) => Number(t.agent_id));
  const total_jumlahs = transaksiData.map((t) => Number(t.total_jumlah));
  const total_hargas = transaksiData.map((t) => ethers.parseUnits(t.total_harga, 0)); // 0 desimal

  console.log("📦 Data yang akan dikirim ke smart contract:");
  console.log("Agent IDs:", agent_ids);
  console.log("Total Jumlahs:", total_jumlahs);
  console.log("Total Hargas:", total_hargas.map(h => h.toString()));

  const tx = await contract.logTransactionsBatch(agent_ids, total_jumlahs, total_hargas);
  await tx.wait();

  return tx.hash;
};

// ✅ Ambil semua transaksi dari smart contract (langsung pakai getAllTransactions)
export const getAllTransactions = async () => {
  const contract = await getContract();
  const txList = await contract.getAllTransactions();

  return txList.map((tx, index) => ({
    id: index + 1,
    agent_id: Number(tx.agent_id),
    total_jumlah: Number(tx.total_jumlah),
    total_harga: Number(tx.total_harga),
  }));
};
