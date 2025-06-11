// import Main from './components/Main';

// function App() {
//   return <Main />;
// }

// export default App;

import React, { useState, createContext, useContext } from 'react';
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Shield,
  Settings,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
} from 'lucide-react';

// Auth Context
const AuthContext = createContext();

// Demo users
const demoUsers = [
  {
    id: 1,
    username: 'nomzod1',
    password: '123',
    role: 'candidate',
    name: "Aliyev Vali Akbar o'g'li",
    region: 'Toshkent',
  },
  {
    id: 2,
    username: 'voenkomat1',
    password: '123',
    role: 'voenkomat',
    name: 'Karimov Otabek',
    region: 'Toshkent',
  },
  {
    id: 3,
    username: 'otm1',
    password: '123',
    role: 'university',
    name: 'Rahimova Dilnoza',
    region: 'Toshkent',
  },
  {
    id: 4,
    username: 'admin1',
    password: '123',
    role: 'admin',
    name: 'Administrator',
    region: 'Markaziy',
  },
];

// Mock applications data
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

// Auth Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const foundUser = demoUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return { success: true, user: foundUser };
    }
    return { success: false, message: 'Login yoki parol xato!' };
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'candidate',
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Login Component
function LoginPage({ onNavigate }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formData.username, formData.password);
    if (result.success) {
      switch (result.user.role) {
        case 'candidate':
          onNavigate('candidate');
          break;
        case 'voenkomat':
          onNavigate('voenkomat');
          break;
        case 'university':
          onNavigate('university');
          break;
        case 'admin':
          onNavigate('admin');
          break;
      }
    } else {
      setError(result.message);
    }
  };

  const roleIcons = {
    candidate: User,
    voenkomat: Shield,
    university: GraduationCap,
    admin: Settings,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-lg shadow-lg">
          <div className="flex items-center gap-3 justify-center">
            <GraduationCap className="w-8 h-8" />
            <h1 className="text-xl font-bold text-center">Tizimga kirish</h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-b-lg shadow-xl">
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foydalanuvchi nomi
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Username kiriting"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Parol kiriting"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Kirish
            </button>
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-center text-sm text-gray-600 mb-3">
              Abituriyent bo'lsangiz ro'yxatdan o'ting:
            </p>
            <button
              onClick={() => onNavigate('register')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          <div className="mt-6 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Demo hisoblar:
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {demoUsers.map((user) => {
                const Icon = roleIcons[user.role];
                return (
                  <div key={user.id} className="bg-gray-50 p-2 rounded border">
                    <div className="flex items-center gap-1 mb-1">
                      <Icon className="w-3 h-3 text-blue-600" />
                      <span className="font-medium">{user.username}</span>
                    </div>
                    <div className="text-gray-600">Parol: 123</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Register Component
function RegisterPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: '',
    phone: '',
    region: '',
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);

  const regions = [
    'Toshkent shahri',
    'Toshkent viloyati',
    'Andijon',
    'Buxoro',
    'Jizzax',
    'Qashqadaryo',
    'Navoiy',
    'Namangan',
    'Samarqand',
    'Surxondaryo',
    'Sirdaryo',
    "Farg'ona",
    'Xorazm',
    "Qoraqalpog'iston",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Parollar mos kelmaydi!');
      return;
    }

    if (formData.password.length < 3) {
      setError("Parol kamida 3 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    const result = register(formData);
    if (result.success) {
      onNavigate('candidate');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-t-lg shadow-lg">
          <div className="flex items-center gap-3 justify-center">
            <User className="w-8 h-8" />
            <h1 className="text-xl font-bold text-center">Ro'yxatdan o'tish</h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-b-lg shadow-xl max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To'liq ism
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Familiya Ism Sharif"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foydalanuvchi nomi
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+998 90 123 45 67"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Viloyat/Shahar
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Viloyatni tanlang</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Parol kiriting"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parolni tasdiqlang
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Parolni qayta kiriting"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('login')}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors font-medium"
              >
                Orqaga
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Candidate Dashboard
function CandidateDashboard({ onNavigate }) {
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

// Voenkomat Dashboard
function VoenkomatDashboard({ onNavigate }) {
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

// University Dashboard
function UniversityDashboard({ onNavigate }) {
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

// Admin Dashboard
function AdminDashboard({ onNavigate }) {
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

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} />;
      case 'candidate':
        return <CandidateDashboard onNavigate={setCurrentPage} />;
      case 'voenkomat':
        return <VoenkomatDashboard onNavigate={setCurrentPage} />;
      case 'university':
        return <UniversityDashboard onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard onNavigate={setCurrentPage} />;
      default:
        return <LoginPage onNavigate={setCurrentPage} />;
    }
  };

  return <AuthProvider>{renderPage()}</AuthProvider>;
}

export default App;
