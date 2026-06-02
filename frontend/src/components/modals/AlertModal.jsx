import ReusableModal from "./ReusableModal";

function AlertModal({ isOpen, onClose, message }) {
  return (
    <ReusableModal isOpen={isOpen} onClose={onClose} title="Alert">
      <p className="text-gray-700 dark:text-gray-300">{message}</p>

      <button
        onClick={onClose}
        className="mt-6 bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
      >
        OK
      </button>
    </ReusableModal>
  );
}

export default AlertModal;