import { Phone } from 'lucide-react';

// Phone Input Component
export default function PhoneInputField({ label, name, value, onChange }) {
  return (
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
}
