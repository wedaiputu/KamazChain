import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DetailTransactionHandler from '../components/DetailTransactionHandler';
import TransactionHandler from '../components/TransactionHandler';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('detail');

  const renderContent = () => {
    if (activeTab === 'detail') return <DetailTransactionHandler />;
    if (activeTab === 'transaksi') return <TransactionHandler />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex">
      {/* Sidebar */}
      <Sidebar />

      <div
        className="
           flex-1 
      transition-all duration-300 
      ml-16 peer-hover:ml-48 
      p-6"
      >
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h2>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('detail')}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === 'detail'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Detail Transaksi
            </button>
            <button
              onClick={() => setActiveTab('transaksi')}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === 'transaksi'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Transaksi
            </button>
          </div>

          {/* Render Table Based on Tab */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
