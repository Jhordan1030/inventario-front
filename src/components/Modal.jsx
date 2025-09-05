/* eslint-disable react/prop-types */
export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    );
  }
  