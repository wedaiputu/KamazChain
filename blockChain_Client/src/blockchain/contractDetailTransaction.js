// src/blockchain/contractDetailTransaction.js

import { ethers } from 'ethers';
import contractJSON from './abi/DetailContract.json';

const contractABI = contractJSON.abi;
const CONTRACT_ADDRESS = "0x4A679253410272dd5232B3Ff7cF5dbB88f295319";

export const getContractDetail = async () => {
  if (!window.ethereum) throw new Error("Metamask tidak ditemukan");

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};

export const logDetailTransactionsBatch = async (detailData) => {
  const contract = await getContractDetail();

  const ids = detailData.map((d) => Number(d.id));
  const transaksi_ids = detailData.map((d) => Number(d.transaksi_id));
  const servers = detailData.map((d) => d.server || "");
  const users = detailData.map((d) => d.user || "");
  const ipAddresses = detailData.map((d) => d.ipAddress || "");
  const macs = detailData.map((d) => d.mac || "");
  const uptimes = detailData.map((d) => d.uptime || "");
  const bytes_in = detailData.map((d) => d.bytes_in || "");
  const bytes_out = detailData.map((d) => d.bytes_out || "");
  const time_left = detailData.map((d) => d.time_left || "");
  const login_by = detailData.map((d) => d.login_by || "");
  const comments = detailData.map((d) => d.comment || "");
  const created_ats = detailData.map((d) => d.created_at || "");
  const updated_ats = detailData.map((d) => d.updated_at || "");

  console.log("📦 Detail transaksi yang akan dikirim:");
  console.log("IDs:", ids);
  console.log("Transaksi IDs:", transaksi_ids);

  const tx = await contract.logDetailTransactionsBatch(
    ids,
    transaksi_ids,
    servers,
    users,
    ipAddresses,
    macs,
    uptimes,
    bytes_in,
    bytes_out,
    time_left,
    login_by,
    comments,
    created_ats,
    updated_ats
  );

  await tx.wait();
  return tx.hash;
};

// Ambil semua detail transaksi
export const getAllDetailTransactions = async () => {
  const contract = await getContractDetail();
  const detailList = await contract.getAllDetailTransactions();

  return detailList.map((d) => ({
    id: Number(d.id),
    transaksi_id: Number(d.transaksi_id),
    server: d.server,
    user: d.user,
    ipAddress: d.ipAddress,
    mac: d.mac,
    uptime: d.uptime,
    bytes_in: d.bytes_in,
    bytes_out: d.bytes_out,
    time_left: d.time_left,
    login_by: d.login_by,
    comment: d.comment,
    created_at: d.created_at,
    updated_at: d.updated_at
  }));
};
