import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "../abi/TransactionLogger.json";

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const useContract = () => {
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const connect = async () => {
      if (!window.ethereum) return;

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const contractInstance = new Contract(CONTRACT_ADDRESS, abi, signer);

      setAddress(userAddress);
      setContract(contractInstance);
    };

    connect();
  }, []);

  return { contract, address };
};
