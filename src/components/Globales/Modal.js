import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Fondo oscuro semi-transparente */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Contenedor del contenido */}
      <div
        className="relative bg-white rounded-lg shadow-xl p-6 w-10/12 max-w-3xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg font-bold hover:cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
