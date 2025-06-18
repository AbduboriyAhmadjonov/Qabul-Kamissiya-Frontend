import { Save, Search, Calendar } from 'lucide-react';

// Action Buttons Component
export default function ActionButtons({ onSave }) {
  return (
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
}
