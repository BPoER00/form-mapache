import React, { useState } from "react";
import ConfiguracionCampos from "./ConfiguracionCampos";
import { TABS } from "@/constants/reglas-campos";
import { useNotification } from "@/contexts/Notify";

const FormularioGeneral = ({
  configuracion,
  setConfiguracion,
  closeModal,
  valoresEditar,
  indexConfigure,
  valoresExtras,
}) => {
  const [tab, setTab] = useState("Principales");
  const [valores, setValores] = useState(valoresEditar || {});
  const { addNotification } = useNotification();

  const onSubmit = () => {
    const { index, setIndex } = indexConfigure;

    const {
      label,
      nombre,
      tipo,
      grupo,
      step,
      opciones,
      columna,
      columnaOffset,
    } = valores;

    const errores = [];

    if (!label || label.trim() === "") {
      errores.push("El campo 'label' es obligatorio.");
    }

    if (!nombre || nombre.trim() === "") {
      errores.push("El campo 'nombre' es obligatorio.");
    }

    if (!tipo || tipo.trim() === "") {
      errores.push("El campo 'tipo' es obligatorio.");
    }

    if (!grupo || grupo.trim() === "") {
      errores.push("El campo 'grupo' es obligatorio.");
    }

    if (!step || isNaN(Number(step))) {
      errores.push("El campo 'step' es obligatorio y debe ser un número.");
    }

    const sumaColumnas = Number(columna || 0) + Number(columnaOffset || 0);
    if (sumaColumnas > 12) {
      errores.push(
        "La suma de columna y columnaOffset no puede ser mayor a 12."
      );
    }

    if (tipo === "opciones") {
      if (!opciones || opciones.trim() === "") {
        errores.push("Debe ingresar el nombre del grupo de opciones.");
      }
    }

    if (errores.length > 0) {
      errores.forEach((msg) => addNotification(msg, "error"));
      return;
    }

    if (index !== null && index !== undefined) {
      setConfiguracion((prev) => {
        const newConfig = [...prev];
        newConfig[index] = valores;
        return newConfig;
      });

      const newConfiguracion = [...configuracion];
      newConfiguracion[index] = valores;
      localStorage.setItem("campos-valores", JSON.stringify(newConfiguracion));

      addNotification("Campo Editado Correctamente", "success");
      setIndex(null);
    } else {
      setConfiguracion((prev) => [...prev, valores]);
      localStorage.setItem(
        "campos-valores",
        JSON.stringify([...configuracion, valores])
      );
      addNotification("Campo Agregado Correctamente", "success");
    }

    closeModal(false);
  };

  const currentTab = TABS.find((item) => item.valor === tab);

  return (
    <section className="w-full min-h-48 h-auto p-3">
      <ul className="flex justify-center items-center gap-4 text-sm font-semibold text-center border-b border-b-red-200 p-4">
        {TABS.map((item, index) => (
          <React.Fragment key={item.valor}>
            <li
              onClick={() => setTab(item.valor)}
              className={`${
                tab === item.valor ? "bg-blue-800 text-white" : ""
              } p-2 rounded-lg hover:bg-gray-300 cursor-pointer`}
            >
              {item.nombre}
            </li>
            {index < TABS.length - 1 && <span>|</span>}
          </React.Fragment>
        ))}
      </ul>

      <article className="w-full min-h-96 max-h-[550px] overflow-y-auto h-auto p-4 rounded-md">
        {currentTab && (
          <ConfiguracionCampos
            setValores={setValores}
            titulo={currentTab.nombre}
            schema={currentTab.schema(valoresExtras)}
            campos={currentTab.camposFijos}
            extras={currentTab.camposExtras}
            values={valoresEditar}
          />
        )}
      </article>

      <button
        type="button"
        className="w-full hover:cursor-pointer bg-blue-800 text-white p-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700"
        onClick={onSubmit}
      >
        Guardar Configuración
      </button>
    </section>
  );
};

export default FormularioGeneral;
