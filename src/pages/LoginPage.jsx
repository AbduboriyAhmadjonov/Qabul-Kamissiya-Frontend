import React, { useState, useContext } from 'react';
import { User, Lock, GraduationCap, Shield, Settings } from 'lucide-react';
import { AuthContext, demoUsers } from '../contexts/AuthContext';

export default function LoginPage({ onNavigate }) {
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
