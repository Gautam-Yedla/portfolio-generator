export default function SectionEditor({ title, content, onChange }) {
  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-48 p-4 border border-gray-300 rounded"
        placeholder={`Edit your ${title} here...`}
      />
    </div>
  );
}
