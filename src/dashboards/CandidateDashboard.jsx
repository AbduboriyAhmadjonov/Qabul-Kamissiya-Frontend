import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  GraduationCap,
  User,
  FileText,
  Clock,
  CheckCircle,
  Upload,
} from 'lucide-react';

export default function CandidateDashboard({ onNavigate }) {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [documents, setDocuments] = useState({
    passport: null,
    certificate: null,
    medical: null,
  });

  const handleFileUpload = (docType, file) => {
    setDocuments((prev) => ({
      ...prev,
      [docType]: file,
    }));
  };

  const DocumentUpload = ({ type, title, uploaded }) => (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-700">{title}</h4>
        {uploaded ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <Clock className="w-5 h-5 text-gray-400" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <label className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
          <Upload className="w-4 h-4 inline mr-1" />
          {uploaded ? 'Yangilash' : 'Yuklash'}
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(type, e.target.files[0])}
          />
        </label>
        {uploaded && (
          <span className="text-sm text-green-600">✓ Yuklangan</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Harbiy xizmatdan ozod qilish tizimi
                </h1>
                <p className="text-sm text-gray-600">Abituriyent paneli</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {user?.name || user?.fullName}
                </p>
                <p className="text-sm text-gray-600">{user?.region}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  onNavigate('login');
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', name: 'Profil', icon: User },
              { id: 'documents', name: 'Hujjatlar', icon: FileText },
              { id: 'status', name: 'Holat', icon: Clock },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Shaxsiy ma'lumotlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To'liq ism
                </label>
                <p className="text-gray-900">{user?.name || user?.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{user?.email || 'Kiritilmagan'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <p className="text-gray-900">{user?.phone || 'Kiritilmagan'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Viloyat
                </label>
                <p className="text-gray-900">{user?.region}</p>
              </div>
            </div>
          </div>
        )}
        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Hujjatlarni yuklash</h2>
            <div className="space-y-4">
              <DocumentUpload
                type="passport"
                title="Pasport nusxasi"
                uploaded={documents.passport}
              />
              <DocumentUpload
                type="certificate"
                title="Maktabni tugatganligi haqida guvohnoma"
                uploaded={documents.certificate}
              />
              <DocumentUpload
                type="medical"
                title="Tibbiy ma'lumotnoma"
                uploaded={documents.medical}
              />
            </div>
            {documents.passport &&
              documents.certificate &&
              documents.medical && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="text-green-700 font-medium">
                      Barcha hujjatlar yuklandi! Arizangiz ko'rib chiqilish
                      uchun yuborildi.
                    </p>
                  </div>
                </div>
              )}
          </div>
        )}
        {/* Status Tab */}
        {activeTab === 'status' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Ariza holati</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-medium text-blue-900">
                    Hujjatlar ko'rib chiqilmoqda
                  </p>
                  <p className="text-sm text-blue-700">
                    Voenkomat tomonidan tekshirilmoqda
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
