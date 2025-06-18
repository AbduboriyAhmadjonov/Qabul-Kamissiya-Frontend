import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Settings, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const mockApplications = [
  {
    id: 1,
    candidateName: "Aliyev Vali Akbar o'g'li",
    university: 'TATU',
    specialty: 'Dasturiy injiniring',
    status: 'voenkomat_review',
    submittedDate: '2024-05-15',
    documents: ['passport', 'certificate', 'medical'],
  },
  {
    id: 2,
    candidateName: 'Karimov Jasur',
    university: 'NUUz',
    specialty: 'Tibbiyot',
    status: 'university_approved',
    submittedDate: '2024-05-10',
    documents: ['passport', 'certificate', 'medical'],
  },
];

export default function AdminDashboard({ onNavigate }) {
  const { user, logout } = useContext(AuthContext);
  const [stats] = useState({
    totalApplications: 156,
    pending: 45,
    approved: 89,
    rejected: 22,
  });

  const StatCard = ({ title, value, color, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
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
              <Settings className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Administrator paneli
                </h1>
                <p className="text-sm text-gray-600">Tizim statistikasi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">Administrator</p>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Jami arizalar"
            value={stats.totalApplications}
            color="bg-blue-500"
            icon={FileText}
          />
          <StatCard
            title="Kutilmoqda"
            value={stats.pending}
            color="bg-yellow-500"
            icon={Clock}
          />
          <StatCard
            title="Tasdiqlangan"
            value={stats.approved}
            color="bg-green-500"
            icon={CheckCircle}
          />
          <StatCard
            title="Rad etilgan"
            value={stats.rejected}
            color="bg-red-500"
            icon={XCircle}
          />
        </div>
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              So'nggi arizalar
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nomzod
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    OTM / Mutaxassislik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holat
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {app.candidateName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {app.university}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.specialty}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.submittedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === 'university_approved'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'voenkomat_approved'
                            ? 'bg-blue-100 text-blue-800'
                            : app.status === 'voenkomat_rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {app.status === 'university_approved'
                          ? 'Yakuniy tasdiqlandi'
                          : app.status === 'voenkomat_approved'
                          ? 'Voenkomat tasdiqladi'
                          : app.status === 'voenkomat_rejected'
                          ? 'Rad etildi'
                          : "Ko'rib chiqilmoqda"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
