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
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportSeries, setPassportSeries] = useState('');
  const [passportJSHSHIR, setPassportJSHSHIR] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const cities = {
    'Toshkent shahri': ['Yunusobod', 'Chilonzor', 'Shayxontohur'],
    'Toshkent viloyati': ['Zangiota', 'Qibray', 'Chinoz'],
    Andijon: ['Andijon shahri', 'Asaka', 'Xonobod'],
    Buxoro: ['Buxoro shahri', 'Gʻijduvon', 'Kogon'],
    Jizzax: ['Jizzax shahri', 'Zomin', 'Gallaorol'],
    Qashqadaryo: ['Qarshi', 'Shahrisabz', 'Muborak'],
    Navoiy: ['Navoiy shahri', 'Karmana', 'Zarafshon'],
    Namangan: ['Namangan shahri', 'Chortoq', 'Pop'],
    Samarqand: ['Samarqand shahri', 'Urgut', 'Ishtixon'],
    Surxondaryo: ['Termiz', 'Denov', 'Sherobod'],
    Sirdaryo: ['Guliston', 'Yangiyer', 'Sirdaryo'],
    "Farg'ona": ["Farg'ona shahri", 'Qoʻqon', 'Margʻilon'],
    Xorazm: ['Urganch', 'Xiva', 'Hazorasp'],
    "Qoraqalpog'iston": ['Nukus', 'Beruniy', 'Moʻynoq'],
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    // Uzbekistan phone number format: +998XXXXXXXXX or 998XXXXXXXXX
    const phoneRegex = /^(\+998|998)?[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const minAge = new Date();
    const maxAge = new Date();
    minAge.setFullYear(today.getFullYear() - 18); // Minimum 18 years old
    maxAge.setFullYear(30 + today.getFullYear()); //

    return date <= minAge && date >= maxAge;
  };

  const validatePassportSeries = (series) => {
    return /^[A-Z]{2}$/.test(series);
  };

  const validatePassportNumber = (number) => {
    return /^[0-9]{7}$/.test(number);
  };

  const validateJSHSHIR = (jshshir) => {
    return /^[0-9]{14}$/.test(jshshir);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Middle Name validation
    if (!middleName.trim()) {
      newErrors.middleName = 'Middle name is required';
    }

    // Last Name validation
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Phone validation
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format. Use +998XXXXXXXXX';
    }

    // City validation
    if (!city) {
      newErrors.city = 'City is required';
    }

    // District validation
    if (!district) {
      newErrors.district = 'District is required';
    }

    // Date of Birth validation
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validateDate(dateOfBirth)) {
      newErrors.dateOfBirth = `Invalid date of birth: You must be at least 18 years old and have not reached the age of 30`;
    }

    // Passport Series validation
    if (!passportSeries.trim()) {
      newErrors.passportSeries = 'Passport series is required';
    } else if (!validatePassportSeries(passportSeries)) {
      newErrors.passportSeries =
        'Passport series must be 2 uppercase letters (e.g., AB)';
    }

    // Passport Number validation
    if (!passportNumber.trim()) {
      newErrors.passportNumber = 'Passport number is required';
    } else if (!validatePassportNumber(passportNumber)) {
      newErrors.passportNumber = 'Passport number must be exactly 7 digits';
    }

    // JSHSHIR validation
    if (!passportJSHSHIR.trim()) {
      newErrors.passportJSHSHIR = 'Passport JSHSHIR is required';
    } else if (!validateJSHSHIR(passportJSHSHIR)) {
      newErrors.passportJSHSHIR = 'JSHSHIR must be exactly 14 digits';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Password confirmation is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Address validation
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setErrors({});

    // Validate form before submission
    if (!validateForm()) {
      setError('Please fix the validation errors below.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        firstName: firstName.trim(),
        middleName: middleName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password,
        phoneNumber: phoneNumber.replace(/\s+/g, ''), // Remove spaces
        city,
        district,
        dateOfBirth,
        passportId: passportSeries.toUpperCase() + passportNumber,
        passportJSHSHIR,
        address: address.trim(),
        role: 'CANDIDATE',
      });

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage(
          'Registration successful! You will be redirected to login.'
        );
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.errors
      ) {
        // Handle validation errors from backend
        const backendErrors = {};
        err.response.data.errors.forEach((error) => {
          backendErrors[error.path] = error.msg;
        });
        setErrors(backendErrors);
        setError('Please fix the validation errors below.');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.startsWith('998')) {
      value = '+' + value;
    } else if (!value.startsWith('+998') && value.length > 0) {
      value = '+998' + value;
    }
    setPhoneNumber(value);
  };

  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p>
    ) : null;
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.firstName ? 'border-red-500' : ''
                }`}
                required
              />
              {renderError('firstName')}
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.lastName ? 'border-red-500' : ''
                }`}
                required
              />
              {renderError('lastName')}
            </div>
          </div>

          {/* Middle Name */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="middleName"
            >
              Middle Name
            </label>
            <input
              id="middleName"
              type="text"
              placeholder="Enter your middle name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.middleName ? 'border-red-500' : ''
              }`}
              required
            />
            {renderError('middleName')}
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? 'border-red-500' : ''
              }`}
              required
            />
            {renderError('email')}
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
              placeholder="+998XXXXXXXXX"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.phoneNumber ? 'border-red-500' : ''
              }`}
              required
            />
            {renderError('phoneNumber')}
          </div>

          {/* City and District */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setDistrict(''); // Reset district when city changes
              }}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.city ? 'border-red-500' : ''
              }`}
              required
            >
              <option value="">Select a city</option>
              {Object.keys(cities).map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
            {renderError('city')}

            {city && (
              <div className="mt-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="district"
                >
                  District
                </label>
                <select
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.district ? 'border-red-500' : ''
                  }`}
                  required
                >
                  <option value="">Select a district</option>
                  {cities[city].map((districtName) => (
                    <option key={districtName} value={districtName}>
                      {districtName}
                    </option>
                  ))}
                </select>
                {renderError('district')}
              </div>
            )}
          </div>

          {/* Passport */}
          <div className="mt-4">
            <label
              htmlFor="passport"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Passport (Series + Number)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="passportSeries"
                value={passportSeries}
                onChange={(e) =>
                  setPassportSeries(
                    e.target.value.toUpperCase().replace(/[^A-Z]/g, '')
                  )
                }
                placeholder="AB"
                maxLength={2}
                className={`w-1/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.passportSeries ? 'border-red-500' : ''
                }`}
                required
              />
              <input
                type="text"
                id="passportNumber"
                value={passportNumber}
                onChange={(e) =>
                  setPassportNumber(e.target.value.replace(/\D/g, ''))
                }
                placeholder="1234567"
                maxLength={7}
                className={`w-3/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.passportNumber ? 'border-red-500' : ''
                }`}
                required
              />
            </div>
            {renderError('passportSeries')}
            {renderError('passportNumber')}
          </div>

          {/* Passport JSHSHIR */}
          <div className="mt-4">
            <label
              htmlFor="passportJSHSHIR"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Passport JSHSHIR (14 digits)
            </label>
            <input
              type="text"
              id="passportJSHSHIR"
              value={passportJSHSHIR}
              onChange={(e) =>
                setPassportJSHSHIR(e.target.value.replace(/\D/g, ''))
              }
              placeholder="12345678901234"
              maxLength={14}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.passportJSHSHIR ? 'border-red-500' : ''
              }`}
              required
            />
            {renderError('passportJSHSHIR')}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password (min 8 characters)
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? 'border-red-500' : ''
              }`}
              required
            />
            {renderError('password')}
          </div>

          {/* Confirm Password */}
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
              required
            />
            {renderError('confirmPassword')}
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.dateOfBirth ? 'border-red-500' : ''
              }`}
              required
            />
            {renderError('dateOfBirth')}
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.address ? 'border-red-500' : ''
              }`}
              required
            ></textarea>
            {renderError('address')}
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
