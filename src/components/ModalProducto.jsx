/* eslint-disable react/prop-types */
export default function ModalProducto({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-slideUp">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
          >
            ✖
          </button>
  
          {/* Encabezado con icono */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white text-2xl mb-4">
              📦
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Completa la información del producto y guarda los cambios.
            </p>
          </div>
  
          {/* Contenido dinámico */}
          <div>{children}</div>
        </div>
      </div>
    );
  }
  