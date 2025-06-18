import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { GraduationCap, Eye, CheckCircle, Download } from 'lucide-react';

const mockApplications = [
  {
    id: 1,
    candidateName: "Aliyev Vali Akbar o'g'li",
    university: 'TATU',
    specialty: 'Dasturiy injiniring',
    status: 'voenkomat_approved',
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

export default function UniversityDashboard({ onNavigate }) {
  const { user, logout } = useContext(AuthContext);
  const [applications, setApplications] = useState(
    mockApplications.filter((app) => app.status === 'voenkomat_approved')
  );

  const handleFinalApproval = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'university_approved' } : app
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">OTM paneli</h1>
                <p className="text-sm text-gray-600">Yakuniy tasdiqlash</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">OTM mas'uli</p>
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
            <h2 className="text-xl font-bold text-gray-900">
              Voenkomat tomonidan tasdiqlangan arizalar
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
                    Mutaxassislik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sana
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
                        {app.specialty}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.submittedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4 inline mr-1" />
                        Ko'rish
                      </button>
                      {app.status !== 'university_approved' && (
                        <button
                          onClick={() => handleFinalApproval(app.id)}
                          className="text-green-600 hover:text-green-900 ml-2"
                        >
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Yakuniy tasdiqlash
                        </button>
                      )}
                      {app.status === 'university_approved' && (
                        <button className="text-purple-600 hover:text-purple-900 ml-2">
                          <Download className="w-4 h-4 inline mr-1" />
                          Guvohnoma
                        </button>
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
