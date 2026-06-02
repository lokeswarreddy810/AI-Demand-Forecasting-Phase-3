function ReusableModal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl p-8 w-full max-w-xl border border-green-300 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-red-500 font-bold text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ReusableModal;