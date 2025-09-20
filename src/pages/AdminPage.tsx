import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { AdminDashboard } from '../components/Admin/AdminDashboard';

interface AdminPageProps {
  onBackToMenu: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToMenu }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showCart={false} showAdmin={false} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={onBackToMenu}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>
      </div>

      <AdminDashboard />
    </div>
  );
};