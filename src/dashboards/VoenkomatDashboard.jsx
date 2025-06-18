import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Shield, Eye, CheckCircle, XCircle } from 'lucide-react';

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

export default function VoenkomatDashboard({ onNavigate }) {
  const { user, logout } = useContext(AuthContext);
  const [applications, setApplications] = useState(mockApplications);

  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      voenkomat_review: {
        color: 'bg-yellow-100 text-yellow-800',
        text: "Ko'rib chiqilmoqda",
      },
      voenkomat_approved: {
        color: 'bg-green-100 text-green-800',
        text: 'Tasdiqlandi',
      },
      voenkomat_rejected: {
        color: 'bg-red-100 text-red-800',
        text: 'Rad etildi',
      },
      university_approved: {
        color: 'bg-blue-100 text-blue-800',
        text: 'OTM tasdiqladi',
      },
    };
    const config = statusConfig[status] || statusConfig['voenkomat_review'];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Harbiy komissariat paneli
                </h1>
                <p className="text-sm text-gray-600">
                  Arizalarni ko'rib chiqish
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">
                  {user?.region} voenkomati
                </p>
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
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Kelgan arizalar</h2>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
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
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4 inline mr-1" />
                        Ko'rish
                      </button>
                      {app.status === 'voenkomat_review' && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(app.id, 'voenkomat_approved')
                            }
                            className="text-green-600 hover:text-green-900 ml-2"
                          >
                            <CheckCircle className="w-4 h-4 inline mr-1" />
                            Tasdiqlash
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(app.id, 'voenkomat_rejected')
                            }
                            className="text-red-600 hover:text-red-900 ml-2"
                          >
                            <XCircle className="w-4 h-4 inline mr-1" />
                            Rad etish
                          </button>
                        </>
                      )}
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
