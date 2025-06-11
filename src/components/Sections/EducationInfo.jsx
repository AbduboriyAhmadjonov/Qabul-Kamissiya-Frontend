import { CreditCard } from 'lucide-react';

import SectionHeader from '../Shared/SectionHeader';
import InputField from '../Shared/InputField';
import PhoneInputField from '../Shared/PhoneInputField';

// Education Information Section
export default function EducationInfoSection({ formData, handleInputChange }) {
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
        label="LITSEY"
        name="litsey"
        value={formData.litsey}
        onChange={handleInputChange}
      />

      <InputField
        label="LITSEY_YILI"
        name="litsey_yili"
        value={formData.litsey_yili}
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
          label="SOG'LIGI"
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
}
