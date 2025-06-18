// Section Header Component
export default function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 text-blue-600 font-semibold mb-4">
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </div>
  );
}
