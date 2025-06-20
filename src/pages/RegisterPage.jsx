// import React, { useState, useContext } from 'react';
// import { User, Lock, Mail, Phone, MapPin } from 'lucide-react';
// import { AuthContext } from '../contexts/AuthContext';

// export default function RegisterPage({ onNavigate }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     email: '',
//     fullName: '',
//     phone: '',
//     region: '',
//   });
//   const [error, setError] = useState('');
//   const { register } = useContext(AuthContext);

//   const regions = [
//     'Toshkent shahri',
//     'Toshkent viloyati',
//     'Andijon',
//     'Buxoro',
//     'Jizzax',
//     'Qashqadaryo',
//     'Navoiy',
//     'Namangan',
//     'Samarqand',
//     'Surxondaryo',
//     'Sirdaryo',
//     "Farg'ona",
//     'Xorazm',
//     "Qoraqalpog'iston",
//   ];

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setError('Parollar mos kelmaydi!');
//       return;
//     }
//     if (formData.password.length < 3) {
//       setError("Parol kamida 3 ta belgidan iborat bo'lishi kerak!");
//       return;
//     }
//     const result = register(formData);
//     if (result.success) {
//       onNavigate('candidate');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-t-lg shadow-lg">
//           <div className="flex items-center gap-3 justify-center">
//             <User className="w-8 h-8" />
//             <h1 className="text-xl font-bold text-center">Ro'yxatdan o'tish</h1>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-b-lg shadow-xl max-h-96 overflow-y-auto">
//           <div className="space-y-4">
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//                 {error}
//               </div>
//             )}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 To'liq ism
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Familiya Ism Sharif"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Foydalanuvchi nomi
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Username"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="email@example.com"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Telefon
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="+998 90 123 45 67"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Viloyat/Shahar
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                 <select
//                   name="region"
//                   value={formData.region}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   required
//                 >
//                   <option value="">Viloyatni tanlang</option>
//                   {regions.map((region) => (
//                     <option key={region} value={region}>
//                       {region}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Parol
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Parol kiriting"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Parolni tasdiqlang
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Parolni qayta kiriting"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => onNavigate('login')}
//                 className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors font-medium"
//               >
//                 Orqaga
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
//               >
//                 Ro'yxatdan o'tish
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
