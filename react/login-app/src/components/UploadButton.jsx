const UploadButton = ({ onUpload, disabled, children }) => (
  <button
    onClick={onUpload}
    disabled={disabled}
    className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
    }`}
  >
    {children}
  </button>
);
export default UploadButton;

