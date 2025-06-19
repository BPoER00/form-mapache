import React, { useState } from "react";
import Formulario from "./Formulario";
import Modal from "./Globales/Modal";

const SeccionFormulario = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-10/12 flex flex-col justify-center items-center mx-auto my-10 gap-10">
      <hgroup className="w-full border border-gray-300 rounded-lg p-6 shadow-lg bg-white">
        <h1 className="font-bold text-2xl">
          Realiza tus configuraciones de trámites
        </h1>
        <span>Dudas puedes consultar en el grupo</span>
      </hgroup>

      <section className="w-10/12 flex justify-center items-center mx-auto my-10 bg-white border border-gray-300 rounded-lg p-6 gap-4">
        <h3 className="text-xl">
          Para empezar a añadir campos de la configuración de sus trámites,
          pulse el botón
        </h3>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-xl bg-amber-300 rounded-full p-2 text-center text-white hover:bg-amber-700 transition duration-300 ease-in-out flex items-center gap-2 hover:cursor-pointer"
        >
          <img src="/svg/plus-icon.svg" className="w-5 h-5" alt="plus" />
          <span>Añadir campo</span>
        </button>
      </section>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Formulario />
        </Modal>
      )}
    </section>
  );
};

export default SeccionFormulario;
