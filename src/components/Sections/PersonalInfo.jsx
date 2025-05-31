import { User } from 'lucide-react';
import SectionHeader from '../Shared/SectionHeader';
import InputField from '../Shared/InputField';

// Personal Information Section
export default function PersonalInfoSection({ formData, handleInputChange }) {
  return (
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
}
