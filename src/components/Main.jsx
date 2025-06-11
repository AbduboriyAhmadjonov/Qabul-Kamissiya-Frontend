import { useState } from 'react';

import AdditionalInfoSection from './Sections/AdditionalInfo';
import EducationInfoSection from './Sections/EducationInfo';
import PersonalInfoSection from './Sections/PersonalInfo';

import FormHeader from './Shared/FormHeader';
import ActionButtons from './Shared/ActionButtons';

// Main Component
export default function Main() {
  const [formData, setFormData] = useState({
    shxyi_no: '1',
    familiya: 'BOBOGULOV',
    ismi: 'ZOKIRJON',
    sharifi: 'UMARQULOVICH',
    tug_sana: '08.06.2003',
    pas_ser: 'AA',
    pas_no: '1234567',
    pinfl: '12345678901234',
    jam_organ: 'FARGONA_MIB',
    mutax: 'XHT',
    holati: 'OK',
    telefon: '+998',
    jinsi: 'ERKAK',
    qaytgan: 'YOQ',
    toifasi: 'KBXX_TAVS',
    tav_s_n: 'QK/083618',
    tav_yili: '2025',
    utsev: '',
    utsev_yili: '',
    xizmat_joyi: '',
    soghigi: 'OK',
    ball: '60',
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
