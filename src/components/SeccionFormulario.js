import React, { useEffect, useState } from "react";
import Modal from "./Globales/Modal";
import FormularioGeneral from "./Formularios/FormularioGeneral";
import { useNotification } from "@/contexts/Notify";
import { instituciones } from "@/constants/objetos";
import { getAll } from "@/services/Configure-Memory";
import TramiteIniciar from "./UI/TramiteIniciar";

const SeccionFormulario = () => {
  const { addNotification } = useNotification();
  const [showModal, setShowModal] = useState(false);
  const [configuracionTramite, setConfiguracionTramites] = useState([]);
  const [values, setValues] = useState({});
  const [showModalTramiteNuevo, setShowModalTramiteNuevo] = useState(false);
  const [institucionesList, setInstitucionesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataGeneral, setDataGeneral] = useState({});
  const [index, setIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const institucionesData = await getAll(instituciones);

        if (isMounted) {
          setInstitucionesList(institucionesData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    const checkTramiteValores = () => {
      const dataGeneralLocalStorage = localStorage.getItem("tramite-valores");
      const dataCamposLocalStorage = localStorage.getItem("campos-valores");

      if (dataGeneralLocalStorage) {
        try {
          const parsedDataGeneral = JSON.parse(dataGeneralLocalStorage);
          const parsedDataCampos = JSON.parse(dataCamposLocalStorage);
          const hasSixKeys = Object.keys(parsedDataGeneral).length === 4 || 5;

          if (isMounted) {
            setShowModalTramiteNuevo(!hasSixKeys);
          }

          if (hasSixKeys) {
            setDataGeneral(parsedDataGeneral);
          }

          if (parsedDataCampos) {
            setConfiguracionTramites(parsedDataCampos);
          }
        } catch (e) {
          console.warn("Error al parsear tramite-valores:", e);
        }
      } else {
        if (isMounted) {
          setShowModalTramiteNuevo(true);
        }
      }
    };

    fetchData();
    checkTramiteValores();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEditarCampo = (campos, index) => {
    setIndex(index);
    setValues(campos);
    setShowModal(true);
  };

  const handleEliminarCampo = async (campos, index) => {
    const result = await addNotification(
      "¿Estás seguro de querer eliminar, se perdera el orden con las columnas que se han configurado?",
      "question"
    );

    if (result) {
      addNotification(`el campo: ${campos.label}, fue eliminado`);
      setConfiguracionTramites((prevCampos) => {
        const nuevosCampos = prevCampos.filter(
          (campo) => campo.nombre !== campos.nombre
        );

        // Actualizar localStorage
        localStorage.setItem("campos-valores", JSON.stringify(nuevosCampos));

        return nuevosCampos;
      });
    }
  };

  const handleEditarCamposGenerales = () => {
    setShowModalTramiteNuevo(true);
  };

  const handleFinalizarTramite = () => {
    const camposGeneralesTramite = localStorage.getItem("tramite-valores");
    const camposTramite = localStorage.getItem("campos-valores");

    const jsonCamposGenerales = JSON.parse(camposGeneralesTramite);
    const jsonCamposTramite = JSON.parse(camposTramite);

    const result = {
      ...jsonCamposGenerales,
      steps: jsonCamposTramite,
    };

    console.log(result);
  };
  return (
    <section className="w-10/12 flex flex-col justify-center items-center mx-auto my-10 gap-10">
      <hgroup className="w-full border border-gray-300 rounded-lg p-6 shadow-lg bg-white">
        <h1 className="font-bold text-2xl">
          Realiza tus configuraciones de trámites
        </h1>
        <span>Dudas puedes consultar en el grupo</span>
      </hgroup>

      <section className="w-10/12 flex justify-center items-center mx-auto my-10 bg-white border border-gray-300 rounded-lg p-6 gap-4">
        <h3 className="text-xl text-center">
          Para editar campos generales del tramite
        </h3>

        <button
          type="button"
          onClick={() => handleEditarCamposGenerales(true)}
          className="text-xl bg-amber-300 rounded-full p-2 text-white hover:bg-amber-700 transition duration-300 ease-in-out flex items-center gap-2 hover:cursor-pointer"
        >
          <img src="/svg/plus-icon.svg" className="w-5 h-5" alt="plus" />
          <span>Editar Campos Generales</span>
        </button>
      </section>

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
                      onClick={() => handleEditarCampo(campo, index)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEliminarCampo(campo, index)}
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
            indexConfigure={{ index, setIndex }}
          />
        </Modal>
      )}

      {showModalTramiteNuevo && (
        <TramiteIniciar
          setShowModalTramiteNuevo={setShowModalTramiteNuevo}
          instituciones={institucionesList}
          modelo={dataGeneral}
          redirigir={false}
        />
      )}

      <button
        type="button"
        onClick={() => handleFinalizarTramite(true)}
        className="text-xl bg-green-500 rounded-full p-2 text-white hover:bg-amber-700 transition duration-300 ease-in-out flex items-center gap-2 hover:cursor-pointer"
      >
        <span>Finalizar configuracion tramite</span>
      </button>
    </section>
  );
};

export default SeccionFormulario;
