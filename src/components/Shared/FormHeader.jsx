import { GraduationCap } from 'lucide-react';

// Header Component
export default function FormHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-lg shadow-lg">
      <div className="flex items-center gap-3">
        <GraduationCap className="w-8 h-8" />
        <h1 className="text-xl md:text-2xl font-bold">
          O'zbekiston Respublikasi Jamoat xavfsizligi universiteti
        </h1>
      </div>
    </div>
  );
}
