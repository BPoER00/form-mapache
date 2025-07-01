import React, { useEffect, useState, useMemo } from "react";
import { TABS } from "@/constants/deploys";
import { instituciones } from "@/constants/objetos";
import { getAll } from "@/services/Configure-Memory";
import Tabs from "./UI/Tabs";

const SeccionDeploys = () => {
  const [tab, setTab] = useState(TABS[0]);
  const [institucionesList, setInstitucionesList] = useState([]);

  const props = { tab, setTab, opciones: TABS };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const institucionesData = await getAll(instituciones);

        if (isMounted) {
          setInstitucionesList(institucionesData);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const institucionesFiltradas = useMemo(() => {
    return institucionesList.filter(
      (inst) =>
        inst.tipo?.toLowerCase() ===
        (tab === TABS[0] ? "municipalidad" : "gobernacion")
    );
  }, [tab, institucionesList]);

  const handleDeploy = (id) => {
    alert(id);
  };

  return (
    <section className="w-full h-auto min-h-screen flex flex-col items-center py-10 ">
      <h1 className="text-2xl text-black">
        Seccion deploys: <strong className="text-[#30a5e9]">{tab}</strong>
      </h1>

      <Tabs {...props} />

      <article className="mt-10 w-full max-w-5xl space-y-6">
        {institucionesFiltradas.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No hay instituciones para este tipo.
          </p>
        ) : (
          institucionesFiltradas.map((inst) => (
            <div
              key={inst.id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full md:w-2/3 flex flex-col items-start md:items-start gap-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {inst.nombre}
                </h2>
                <p className="text-sm text-gray-600">Tipo: {inst.tipo}</p>
              </div>

              <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                <button
                  onClick={() => handleDeploy(inst.id)}
                  className="w-full md:w-auto px-6 py-2 bg-[#30A5E9] text-white rounded-md font-medium hover:bg-[#2690ce] transition-colors duration-200 shadow-sm hover:cursor-pointer"
                >
                  Deployar
                </button>
              </div>
            </div>
          ))
        )}
      </article>
    </section>
  );
};

export default SeccionDeploys;
