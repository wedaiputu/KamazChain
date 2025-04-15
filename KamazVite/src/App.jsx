import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import axios from "axios";
import abi from "./abi/TransactionLogger.json";

// const CONTRACT_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [contract, setContract] = useState(null);

  const fetchBackendData = async () => {
    try {
      const token = localStorage.getItem("token"); // atau ambil dari tempat lain
      if (!token) {
        console.error("Token tidak ditemukan!");
        return;
      }
  
      const response = await axios.get("http://127.0.0.1:8000/api/dataTransaksi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setTransactions(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };
  

  const connectContract = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask belum terpasang!");
        return;
      }
  
      console.log("🧩 MetaMask ditemukan");
  
      const provider = new BrowserProvider(window.ethereum); // ethers v6
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("🔑 Signer siap. Alamat:", address, signer);
  
      const instance = new Contract(CONTRACT_ADDRESS, abi, signer);
      console.log("📄 Contract instance dibuat:", instance);
  
      setContract(instance);
    } catch (error) {
      console.error("❌ Gagal connect ke smart contract:", error);
      alert("Gagal connect ke smart contract. Lihat console untuk detail.");
    }
  };
  
  

  const sendToBlockchain = async () => {
    if (!contract) return alert("Smart contract belum terhubung");

    for (let tx of transactions) {
      const { agent_id, jumlah, total_price } = tx;
      const txSend = await contract.logTransaction(agent_id, jumlah, total_price);
      await txSend.wait();
    }

    alert("Semua data berhasil dikirim ke blockchain!");
  };

  useEffect(() => {
    fetchBackendData();
    connectContract();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Data Transaksi dari Backend</h2>
      <ul className="mb-4">
        {transactions.map((t, idx) => (
          <li key={idx}>
            Agent: {t.agent_id}, Jumlah: {t.jumlah}, Harga: {t.total_price}
          </li>
        ))}
      </ul>

      <button
        onClick={sendToBlockchain}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Kirim ke Blockchain
      </button>
    </div>
  );
}

export default App;
