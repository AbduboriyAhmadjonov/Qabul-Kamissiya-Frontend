import React, { useState } from 'react';
import {
  Save,
  Search,
  User,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  GraduationCap,
} from 'lucide-react';

// Header Component
const FormHeader = () => (
  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-lg shadow-lg">
    <div className="flex items-center gap-3">
      <GraduationCap className="w-8 h-8" />
      <h1 className="text-xl md:text-2xl font-bold">
        O'zbekiston Respublikasi Jamoat xavfsizligi universiteti
      </h1>
    </div>
  </div>
);

// Input Field Component
const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  readOnly = false,
  options = null,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {options ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          readOnly ? 'bg-gray-50' : ''
        }`}
      />
    )}
  </div>
);

// Phone Input Component
const PhoneInputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="flex">
      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
        <Phone className="w-4 h-4" />
      </span>
      <input
        type="tel"
        name={name}
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  </div>
);

// Section Header Component
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 text-blue-600 font-semibold mb-4">
    <Icon className="w-5 h-5" />
    <span>{title}</span>
  </div>
);

// Personal Information Section
const PersonalInfoSection = ({ formData, handleInputChange }) => (
  <div className="space-y-4">
    <SectionHeader icon={User} title="Shaxsiy Ma'lumotlar" />

    <div className="grid grid-cols-2 gap-3">
      <InputField
        label="SHXYI_№"
        name="shxyi_no"
        value={formData.shxyi_no}
        onChange={handleInputChange}
      />
      <div></div>
    </div>

    <InputField
      label="FAMILIYA"
      name="familiya"
      value={formData.familiya}
      onChange={handleInputChange}
    />

    <InputField
      label="ISMI"
      name="ismi"
      value={formData.ismi}
      onChange={handleInputChange}
    />

    <InputField
      label="SHARIFI"
      name="sharifi"
      value={formData.sharifi}
      onChange={handleInputChange}
    />

    <InputField
      label="TUG_SANA"
      name="tug_sana"
      type="date"
      value={formData.tug_sana}
      onChange={handleInputChange}
    />

    <div className="grid grid-cols-2 gap-3">
      <InputField
        label="PAS_SER"
        name="pas_ser"
        value={formData.pas_ser}
        onChange={handleInputChange}
      />
      <InputField
        label="PAS_№"
        name="pas_no"
        value={formData.pas_no}
        onChange={handleInputChange}
      />
    </div>

    <InputField
      label="PINFL"
      name="pinfl"
      value={formData.pinfl}
      onChange={handleInputChange}
    />
  </div>
);

// Additional Information Section
const AdditionalInfoSection = ({ formData, handleInputChange }) => {
  const jamOrganOptions = [
    { value: 'FARGONA_MIB', label: 'FARGONA_MIB' },
    { value: 'TOSHKENT_MIB', label: 'TOSHKENT_MIB' },
    { value: 'SAMARQAND_MIB', label: 'SAMARQAND_MIB' },
  ];

  const mutaxOptions = [
    { value: 'XHT', label: 'XHT' },
    { value: 'OHT', label: 'OHT' },
    { value: 'BHT', label: 'BHT' },
  ];

  const holatiOptions = [
    { value: 'OK', label: 'OK' },
    { value: 'PENDING', label: 'PENDING' },
    { value: 'REJECTED', label: 'REJECTED' },
  ];

  const jinsiOptions = [
    { value: 'ERKAK', label: 'ERKAK' },
    { value: 'AYOL', label: 'AYOL' },
  ];

  const qaytganOptions = [
    { value: 'YOQ', label: 'YOQ' },
    { value: 'HA', label: 'HA' },
  ];

  return (
    <div className="space-y-4">
      <SectionHeader icon={MapPin} title="Qo'shimcha Ma'lumotlar" />

      <InputField
        label="JAM_ORGAN"
        name="jam_organ"
        value={formData.jam_organ}
        onChange={handleInputChange}
        options={jamOrganOptions}
      />

      <InputField
        label="MUTAX"
        name="mutax"
        value={formData.mutax}
        onChange={handleInputChange}
        options={mutaxOptions}
      />

      <InputField
        label="HOLATI"
        name="holati"
        value={formData.holati}
        onChange={handleInputChange}
        options={holatiOptions}
      />

      <PhoneInputField
        label="TELEFON"
        name="telefon"
        value={formData.telefon}
        onChange={handleInputChange}
      />

      <InputField
        label="JINSI"
        name="jinsi"
        value={formData.jinsi}
        onChange={handleInputChange}
        options={jinsiOptions}
      />

      <InputField
        label="QAYTGAN"
        name="qaytgan"
        value={formData.qaytgan}
        onChange={handleInputChange}
        options={qaytganOptions}
      />
    </div>
  );
};

// Education Information Section
const EducationInfoSection = ({ formData, handleInputChange }) => {
  const toifasiOptions = [
    { value: 'KBXX_TAVS', label: 'KBXX_TAVS' },
    { value: 'OTHER', label: 'OTHER' },
  ];

  const tavYiliOptions = [
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
  ];

  const soghigiOptions = [
    { value: 'OK', label: 'OK' },
    { value: 'NOT_OK', label: 'NOT_OK' },
  ];

  return (
    <div className="space-y-4">
      <SectionHeader icon={CreditCard} title="Ta'lim Ma'lumotlari" />

      <InputField
        label="TOIFASI"
        name="toifasi"
        value={formData.toifasi}
        onChange={handleInputChange}
        options={toifasiOptions}
      />

      <InputField
        label="TAV_S/N"
        name="tav_s_n"
        value={formData.tav_s_n}
        onChange={handleInputChange}
      />

      <InputField
        label="TAV_YILI"
        name="tav_yili"
        value={formData.tav_yili}
        onChange={handleInputChange}
        options={tavYiliOptions}
      />

      <InputField
        label="UTSEV"
        name="utsev"
        value={formData.utsev}
        onChange={handleInputChange}
      />

      <InputField
        label="UTSEV_YILI"
        name="utsev_yili"
        value={formData.utsev_yili}
        onChange={handleInputChange}
      />

      <InputField
        label="XIZMAT_JOYI"
        name="xizmat_joyi"
        value={formData.xizmat_joyi}
        onChange={handleInputChange}
      />

      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="SOGHIGI"
          name="soghigi"
          value={formData.soghigi}
          onChange={handleInputChange}
          options={soghigiOptions}
        />
        <InputField
          label="BALL"
          name="ball"
          value={formData.ball}
          onChange={handleInputChange}
        />
      </div>

      <InputField
        label="Student ID"
        name="studentId"
        value={formData.studentId}
        onChange={handleInputChange}
        readOnly={true}
      />
    </div>
  );
};

// Action Buttons Component
const ActionButtons = ({ onSave }) => (
  <div className="bg-gray-50 px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Calendar className="w-4 h-4" />
      <span>Запись: 1 из 1936</span>
    </div>

    <div className="flex flex-col sm:flex-row gap-3">
      <button
        type="button"
        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Search className="w-4 h-4" />
        Qidirish
      </button>

      <button
        type="button"
        onClick={onSave}
        className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        <Save className="w-4 h-4" />
        SAQLASH
      </button>
    </div>
  </div>
);

// Main Component
export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    shxyi_no: '1',
    familiya: 'BOBOGULOV',
    ismi: 'ZOKIRJON',
    sharifi: 'UMARQULOVICH',
    tug_sana: '08.06.2003',
    pas_ser: 'AC',
    pas_no: '2908599',
    pinfl: '50806035270022',
    jam_organ: 'FARGONA_MIB',
    mutax: 'XHT',
    holati: 'OK',
    telefon: '9',
    jinsi: 'ERKAK',
    qaytgan: 'YOQ',
    toifasi: 'KBXX_TAVS',
    tav_s_n: 'QK/083618',
    tav_yili: '2023',
    utsev: '',
    utsev_yili: '',
    xizmat_joyi: '',
    soghigi: 'OK',
    ball: '84,60',
    studentId: '931652770 H/Q 52788',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Form submitted:', formData);
    alert("Ma'lumotlar saqlandi!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <FormHeader />

        <div className="bg-white shadow-xl rounded-b-lg">
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PersonalInfoSection
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <AdditionalInfoSection
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <EducationInfoSection
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>

          <ActionButtons onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}
