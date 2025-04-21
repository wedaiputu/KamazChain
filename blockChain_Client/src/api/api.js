const BASE_URL = 'http://127.0.0.1:8000/api';

export const login = async (user, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, password }),
  });

  if (!res.ok) throw new Error('Login gagal');
  return res.json();
};

export const fetchDetailTransaksis = async (token) => {
    const res = await fetch(`${BASE_URL}/superadmin/detail-transaksis`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error('Gagal fetch detail');
  
    const json = await res.json();
    return json.data; // hanya ambil bagian 'data'-nya
  };
  

export const fetchTransaksis = async (token) => {
  const res = await fetch(`${BASE_URL}/superadmin/transaksis`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Gagal fetch transaksi');
  const data = await res.json();
  return data.data;
};
