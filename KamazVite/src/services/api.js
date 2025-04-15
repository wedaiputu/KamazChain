import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://127.0.0.1:8000/api";

export const fetchTransactions = async (token) => {
  const response = await axios.get(`${API_URL}/dataTransaksi`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
