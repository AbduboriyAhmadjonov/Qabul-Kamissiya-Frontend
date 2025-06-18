import { MapPin } from 'lucide-react';

import SectionHeader from '../Shared/SectionHeader';
import InputField from '../Shared/InputField';
import PhoneInputField from '../Shared/PhoneInputField';

// Additional Information Section
export default function AdditionalInfoSection({ formData, handleInputChange }) {
  const jamOrganOptions = [
    { value: 'QORAQALPOQ_RES', label: 'QORAQALPOQ_RES' },
    { value: 'ANDIJON_MIB', label: 'ANDIJON_MIB' },
    { value: 'BUXORO_MIB', label: 'BUXORO_MIB' },
    { value: 'JIZZAX_MIB', label: 'JIZZAX_MIB' },
    { value: 'QASHQADARYA_MIB', label: 'QASHQADARYA_MIB' },
    { value: 'NAVOIY_MIB', label: 'NAVOIY_MIB' },
    { value: 'NAMANGAN_MIB', label: 'NAMANGAN_MIB' },
    { value: 'SAMARQAND_MIB', label: 'SAMARQAND_MIB' },
    { value: 'SURXONDARYO_MIB', label: 'SURXONDARYO_MIB' },
    { value: 'SIRDARYA_MIB', label: 'SIRDARYA_MIB' },
    { value: 'TOSHKENT_SH_MIB', label: 'TOSHKENT_SH_MIB' },
    { value: 'TOSHKENT_VIL_MIB', label: 'TOSHKENT_VIL_MIB' },
    { value: 'FARGONA_MIB', label: 'FARGONA_MIB' },
    { value: 'XORAZM_MIB', label: 'XORAZM_MIB' },
  ];

  const mutaxOptions = [
    { value: 'MVBQQTF', label: 'MVBQQTF' },
    { value: 'XHT', label: 'XHT' },
    { value: 'XFTPT', label: 'XFTPT' },
    { value: 'IqXav', label: 'IqXav' },
    { value: 'AvQTFB', label: 'AvQTFB' },
    { value: 'QBQT', label: 'QBQT' },
    { value: 'YXHF', label: 'YXHF' },
    { value: 'JTSF', label: 'JTSF' },
    { value: 'MvFR', label: 'MvFR' },
    { value: 'XHXHT', label: 'XHXHT' },
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
    { value: 'BIR', label: 'BIR' },
    { value: 'IKKI', label: 'IKKI' },
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
}
