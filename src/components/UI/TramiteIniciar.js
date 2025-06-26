import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../Globales/Modal";
import ConfiguracionCampos from "../Formularios/ConfiguracionCampos";
import {
  camposFijosReglasGenerales,
  camposGeneralesReglaSchemas,
} from "@/constants/reglas-campos";
import { useNotification } from "@/contexts/Notify";

const TramiteIniciar = ({ setShowModalTramiteNuevo, instituciones }) => {
  const [loadingRedirect, setLoadingRedirect] = useState(false);
  const router = useRouter();
  const { addNotification } = useNotification();
  const [valores, setValores] = useState([]);

  const labels = instituciones.map((i) => i.label);

  const onSubmit = () => {
    const errores = [];

    if (!("estado" in valores)) {
      setValores((prev) => ({ ...prev, estado: false }));
    }

    if (!valores["tramite-id"]) {
      errores.push("Debe ingresar un ID de trámite válido.");
    }

    if (!valores.nombre || valores.nombre.trim() === "") {
      errores.push("El campo 'nombre' es obligatorio.");
    }

    if (!valores.label || valores.label.trim() === "") {
      errores.push("El campo 'label' es obligatorio.");
    }

    if (!valores.slug || valores.slug.trim() === "") {
      errores.push("El campo 'slug' es obligatorio.");
    }

    if (typeof valores.estado !== "boolean") {
      errores.push("Debe indicar un estado (activo o inactivo).");
    }

    if (
      !valores.institucion ||
      !Array.isArray(valores.institucion) ||
      valores.institucion.length === 0
    ) {
      errores.push("Debe asignar al menos una institución.");
    }

    if (errores.length > 0) {
      errores.forEach((error) => addNotification(error, "warning"));
      return;
    }

    localStorage.setItem("tramite-valores", JSON.stringify(valores));
    addNotification("Trámite guardado correctamente", "success");
    addNotification(
      "Se le redigira a otra pagina para la continuacion de Ingreso de los campos",
      "info"
    );

    setLoadingRedirect(true);

    setTimeout(() => {
      router.push(`/tramites/${valores["tramite-id"]}`);
    }, 2500);
  };

  if (loadingRedirect) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-white z-50 absolute">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-700">
            Redirigiendo, por favor espere...
          </p>
        </div>
      </section>
    );
  }

  return (
    <Modal onClose={() => setShowModalTramiteNuevo(false)}>
      <section className="w-full min-h-96 h-auto border border-black rounded-md flex flex-col justify-center items-center p-10">
        <h3 className="text-2xl font-bold">
          Inicio de ingreso de informacion general del tramite
        </h3>

        <article className="w-full min-h-96 h-auto p-4 rounded-md">
          <ConfiguracionCampos
            setValores={setValores}
            titulo={"Campos Generales"}
            schema={camposGeneralesReglaSchemas(labels)}
            campos={camposFijosReglasGenerales}
            camposExtras={false}
          />
        </article>

        <button
          type="button"
          className="w-full hover:cursor-pointer bg-blue-800 text-white p-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700"
          onClick={onSubmit}
        >
          Guardar Configuración
        </button>
      </section>
    </Modal>
  );
};

export default TramiteIniciar;
