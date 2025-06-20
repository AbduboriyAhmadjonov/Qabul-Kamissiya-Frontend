// src/pages/Public/RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState(''); // Need to add
  const [district, setDistrict] = useState(''); // Need to add
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [passportNumber, setPassportNumber] = useState(''); // Need to add
  const [passportSeries, setPassportSeries] = useState(''); // Need to add
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Add other candidate fields as per your schema
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Basic date validation (backend should also validate)
    if (!dateOfBirth) {
      setError('Date of birth is required.');
      return;
    }

    try {
      const response = await axios.post('/api/candidates', {
        firstName,
        middleName,
        lastName,
        email,
        password,
        phoneNumber,
        city,
        district,
        dateOfBirth,
        passportNumber,
        passportSeries,
        role: 'CANDIDATE',
      });

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage(
          'Registration successful! You will be redirected to login.'
        );
        // Optionally auto-login or redirect to login page
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Join Us
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Create your candidate account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {/* Last Name */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {/* Middle Name */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="middleName"
              >
                Last Name
              </label>
              <input
                id="middleName"
                type="text"
                placeholder="Enter your last name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          {/* Email */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Phone Number */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Password */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Date of Birth */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateOfBirth"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Full Address */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Full Address
            </label>
            <textarea
              id="address"
              placeholder="Enter your full address"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;

// src/pages/Public/RegistrationPage.jsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// // Placeholder data for regions and districts. In a real app, this would come from your backend.
// // We'll keep this simple and manage it locally for now to match the previous structure.

// const RegistrationPage = () => {
//   // State for all fields
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [middleName, setMiddleName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   // Address state with cascading logic
//
//   const [streetAddress, setStreetAddress] = useState(''); // Renamed 'address' to 'streetAddress' for clarity

//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [passportNumber, setPassportNumber] = useState('');
//   const [passportSeries, setPassportSeries] = useState('');

//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   // Logic for available districts based on selected region
//   const availableDistricts = regionsData[selectedRegion] || [];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');

//     // Basic validation
//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !password ||
//       !confirmPassword ||
//       !dateOfBirth ||
//       !selectedRegion ||
//       !selectedDistrict ||
//       !streetAddress
//     ) {
//       setError('Please fill in all required fields.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }
//     // Add more client-side validations (phone format, passport format, etc.)

//     try {
//       const response = await axios.post('/api/candidates', {
//         firstName,
//         middleName,
//         lastName,
//         email,
//         password, // Backend will hash this
//         phoneNumber,
//         // Construct the full address string for the backend
//         city: selectedDistrict, // Assuming district can represent city/major area
//         district: selectedRegion, // Assuming region represents the broader area
//         streetAddress: streetAddress, // Explicitly send streetAddress
//         dateOfBirth,
//         passportNumber,
//         passportSeries,
//         role: 'CANDIDATE', // This is set by backend based on user context or specific registration flow
//       });

//       if (response.status === 201 || response.status === 200) {
//         setSuccessMessage(
//           'Registration successful! You will be redirected to login shortly.'
//         );
//         setTimeout(() => navigate('/login'), 2000);
//       }
//     } catch (err) {
//       console.error('Registration failed:', err);
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError('Registration failed. Please try again or contact support.');
//       }
//     }
//   };

//   return (
//     // Subtle military-themed background
//     <div className="relative min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
//       {/* Overlay for better text readability */}
//       <div className="absolute inset-0 bg-black opacity-40"></div>

//       <div className="relative z-10 w-full max-w-4xl bg-white/10 p-10 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-700">
//         <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-200">
//           JOIN OUR RANKS
//         </h2>
//         <p className="text-center text-gray-300 mb-8 text-lg font-medium">
//           Begin your path to service and leadership.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Section 1: Candidate Identification */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-gray-600 rounded-lg shadow-inner bg-gray-900/50">
//             <h3 className="text-2xl font-semibold text-gray-200 mb-4 md:col-span-3 border-b-2 border-gray-600 pb-2">
//               Identification Details
//             </h3>

//             {/* First Name */}
//             <div>
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="firstName"
//               >
//                 First Name
//               </label>
//               <input
//                 id="firstName"
//                 type="text"
//                 placeholder="e.g. Amir"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>
//             {/* Middle Name */}
//             <div>
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="middleName"
//               >
//                 Middle Name (Optional)
//               </label>
//               <input
//                 id="middleName"
//                 type="text"
//                 placeholder="e.g.jon"
//                 value={middleName}
//                 onChange={(e) => setMiddleName(e.target.value)}
//                 className="input-field"
//               />
//             </div>
//             {/* Last Name */}
//             <div>
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="lastName"
//               >
//                 Last Name
//               </label>
//               <input
//                 id="lastName"
//                 type="text"
//                 placeholder="e.g. Karim"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>
//           </div>

//           {/* Section 2: Contact & Security */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-gray-600 rounded-lg shadow-inner bg-gray-900/50">
//             <h3 className="text-2xl font-semibold text-gray-200 mb-4 md:col-span-3 border-b-2 border-gray-600 pb-2">
//               Contact & Security
//             </h3>

//             {/* Email */}
//             <div className="md:col-span-2">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="email"
//               >
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="your.email@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>
//             {/* Phone Number */}
//             <div className="md:col-span-1">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="phoneNumber"
//               >
//                 Phone Number
//               </label>
//               <input
//                 id="phoneNumber"
//                 type="tel"
//                 placeholder="+998 90 123 4567"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>
//             {/* Password */}
//             <div className="md:col-span-1">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="password"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="Create a strong password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>
//             {/* Confirm Password */}
//             <div className="md:col-span-1">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="confirmPassword"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>
//           </div>

//           {/* Section 3: Additional Details */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-gray-600 rounded-lg shadow-inner bg-gray-900/50">
//             <h3 className="text-2xl font-semibold text-gray-200 mb-4 md:col-span-3 border-b-2 border-gray-600 pb-2">
//               Vital Information
//             </h3>

//             {/* Date of Birth */}
//             <div className="md:col-span-1">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="dateOfBirth"
//               >
//                 Date of Birth
//               </label>
//               <input
//                 id="dateOfBirth"
//                 type="date"
//                 value={dateOfBirth}
//                 onChange={(e) => setDateOfBirth(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>

//             {/* Address: Region Selector */}
//             <div className="md:col-span-1">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="regionSelect"
//               >
//                 Region
//               </label>
//               <div className="relative">
//                 {' '}
//                 {/* Wrapper for select and arrow */}
//                 <select
//                   id="regionSelect"
//                   value={selectedRegion}
//                   onChange={(e) => {
//                     setSelectedRegion(e.target.value);
//                     setSelectedDistrict('');
//                     setStreetAddress(''); // Clear street if region/district changes
//                   }}
//                   className="input-field appearance-none cursor-pointer pl-3 pr-10"
//                   required
//                 >
//                   <option value="" disabled>
//                     Select Region
//                   </option>
//                   {Object.keys(regionsData).map((region) => (
//                     <option key={region} value={region}>
//                       {region}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                   <svg
//                     className="fill-current h-4 w-4"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Address: District Selector */}
//             <div className="md:col-span-1">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="districtSelect"
//               >
//                 District
//               </label>
//               <div className="relative">
//                 {' '}
//                 {/* Wrapper for select and arrow */}
//                 <select
//                   id="districtSelect"
//                   value={selectedDistrict}
//                   onChange={(e) => {
//                     setSelectedDistrict(e.target.value);
//                     // Update fullAddress when district is selected, format: "Street, District, Region"
//                     setStreetAddress(
//                       `${streetAddress || ''}, ${e.target.value}, ${
//                         selectedRegion || ''
//                       }`
//                     );
//                   }}
//                   className={`input-field appearance-none cursor-pointer pl-3 pr-10 ${
//                     !selectedRegion ? 'bg-gray-700 cursor-not-allowed' : ''
//                   }`}
//                   required
//                   disabled={!selectedRegion}
//                 >
//                   <option value="" disabled>
//                     {!selectedRegion
//                       ? 'Select Region First'
//                       : 'Select District'}
//                   </option>
//                   {availableDistricts.map((district) => (
//                     <option key={district} value={district}>
//                       {district}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                   <svg
//                     className="fill-current h-4 w-4"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Street Address */}
//             <div className="md:col-span-2">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="streetAddress"
//               >
//                 Street & House Number
//               </label>
//               <input
//                 id="streetAddress"
//                 type="text"
//                 placeholder="e.g. 15 Amir Temur Street"
//                 value={streetAddress}
//                 onChange={(e) => setStreetAddress(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>

//             {/* Passport Number */}
//             <div className="md:col-span-1">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="passportNumber"
//               >
//                 Passport Number
//               </label>
//               <input
//                 id="passportNumber"
//                 type="text"
//                 placeholder="Passport No."
//                 value={passportNumber}
//                 onChange={(e) => setPassportNumber(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>
//             {/* Passport Series */}
//             <div className="md:col-span-1">
//               <label
//                 className="block text-gray-300 text-sm font-bold mb-2"
//                 htmlFor="passportSeries"
//               >
//                 Passport Series
//               </label>
//               <input
//                 id="passportSeries"
//                 type="text"
//                 placeholder="e.g. AA1234567"
//                 value={passportSeries}
//                 onChange={(e) => setPassportSeries(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>
//           </div>

//           {/* Error and Success Messages */}
//           {error && (
//             <p className="text-red-500 text-center text-sm mb-4">{error}</p>
//           )}
//           {successMessage && (
//             <p className="text-green-500 text-center text-sm mb-4">
//               {successMessage}
//             </p>
//           )}

//           {/* Submit Button */}
//           <div className="mt-10">
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-br from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               REGISTER AND START YOUR JOURNEY
//             </button>
//           </div>
//         </form>

//         {/* Footer Link */}
//         <p className="text-center text-gray-300 text-sm mt-8">
//           Already have an account?{' '}
//           <Link
//             to="/login"
//             className="text-blue-400 hover:underline font-semibold"
//           >
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// // Add these styles to your tailwind.config.js or global CSS file for the .input-field and select styles.
// // Example for tailwind.config.js (inside theme.extend.plugins or a custom plugin):
// /*

// */

// export default RegistrationPage;
