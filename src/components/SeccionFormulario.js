import React, { useState } from "react";
import Modal from "./Globales/Modal";
import FormularioGeneral from "./Formularios/FormularioGeneral";
import { useNotification } from "@/contexts/Notify";

const SeccionFormulario = () => {
  const { addNotification } = useNotification();
  const [showModal, setShowModal] = useState(false);
  const [configuracionTramite, setConfiguracionTramites] = useState([]);
  const [values, setValues] = useState({});

  const handleEditarCampo = (campos) => {
    setValues(campos);
    setShowModal(true);
  };

  const handleEliminarCampo = (campos) => {
    addNotification(`el campo: ${campos.label}, fue eliminado`);
    setConfiguracionTramites((prevCampos) =>
      prevCampos.filter((campo) => campo.nombre !== campos.nombre)
    );
  };

  return (
    <section className="w-10/12 flex flex-col justify-center items-center mx-auto my-10 gap-10">
      <hgroup className="w-full border border-gray-300 rounded-lg p-6 shadow-lg bg-white">
        <h1 className="font-bold text-2xl">
          Realiza tus configuraciones de trámites
        </h1>
        <span>Dudas puedes consultar en el grupo</span>
      </hgroup>

      {configuracionTramite.length > 0 && (
        <section className="w-10/12 flex flex-col items-start mx-auto my-10 bg-white border border-gray-300 rounded-lg p-6 gap-4">
          <h3 className="text-xl font-semibold">
            Lista de campos configurados:
          </h3>

          <table className="w-full text-left text-gray-800 mt-4">
            <thead>
              <tr className="text-sm font-semibold text-gray-600 border-b">
                <th className="py-2 px-4">Campo</th>
                <th className="py-2 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {configuracionTramite.map((campo, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">
                    {campo.label || `Campo ${index + 1}`}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditarCampo(campo)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEliminarCampo(campo)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="self-center text-xl bg-amber-300 rounded-full p-2 text-white hover:bg-amber-700 transition duration-300 ease-in-out flex items-center gap-2 hover:cursor-pointer"
          >
            <img src="/svg/plus-icon.svg" className="w-5 h-5" alt="plus" />
            <span>Añadir campo</span>
          </button>
        </section>
      )}

      {configuracionTramite.length === 0 && (
        <section className="w-10/12 flex justify-center items-center mx-auto my-10 bg-white border border-gray-300 rounded-lg p-6 gap-4">
          <h3 className="text-xl text-center">
            Para empezar a añadir campos de la configuración de sus trámites,
            pulse el botón
          </h3>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-xl bg-amber-300 rounded-full p-2 text-white hover:bg-amber-700 transition duration-300 ease-in-out flex items-center gap-2 hover:cursor-pointer"
          >
            <img src="/svg/plus-icon.svg" className="w-5 h-5" alt="plus" />
            <span>Añadir campo</span>
          </button>
        </section>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <FormularioGeneral
            configuracion={configuracionTramite}
            setConfiguracion={setConfiguracionTramites}
            closeModal={setShowModal}
            valoresEditar={values}
          />
        </Modal>
      )}
    </section>
  );
};

export default SeccionFormulario;
