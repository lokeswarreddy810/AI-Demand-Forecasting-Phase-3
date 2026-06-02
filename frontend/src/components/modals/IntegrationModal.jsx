import ReusableModal from "./ReusableModal";

function IntegrationModal({ isOpen, onClose, children }) {
  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title="Integration Details"
    >
      {children}
    </ReusableModal>
  );
}

export default IntegrationModal;