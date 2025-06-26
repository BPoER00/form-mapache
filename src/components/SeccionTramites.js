"use client";
import { tramites, instituciones } from "@/constants/objetos";
import { getAll } from "@/services/Configure-Memory";
import React, { useEffect, useState } from "react";
import Modal from "./Globales/Modal";
import TramiteIniciar from "./UI/TramiteIniciar";

const SeccionTramites = () => {
  const [listado, setListado] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [showModal, setShowModal] = useState(false);
  const [showModalTramiteNuevo, setShowModalTramiteNuevo] = useState(false);
  const [tramiteSeleccionado, setTramiteSeleccionado] = useState(null);
  const [institucionesList, setInstitucionesList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const result = await getAll(tramites);
      const institucionesData = await getAll(instituciones);

      if (isMounted) {
        setListado(result);
        setInstitucionesList(institucionesData);
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const listadoFiltrado = listado.filter((item) => {
    const coincideTexto =
      item["tramite-id"]?.toString().includes(filtroTexto.toLowerCase()) ||
      item.nombre?.toLowerCase().includes(filtroTexto.toLowerCase());

    const coincideEstado =
      filtroEstado === "todos" ||
      (filtroEstado === "activos" && item.estado) ||
      (filtroEstado === "inactivos" && !item.estado);

    return coincideTexto && coincideEstado;
  });

  const abrirModalInstituciones = (tramite) => {
    setTramiteSeleccionado(tramite);
    setShowModal(true);
  };

  const obtenerInstitucionesAsignadas = (ids) => {
    if (!Array.isArray(ids)) return [];
    return ids
      .map((id) => institucionesList.find((inst) => inst.id === id))
      .filter(Boolean);
  };

  const handleOpenModal = () => {
    setShowModalTramiteNuevo(true);
  };

  return (
    <section className="w-full flex justify-center items-center mt-10">
      <section className="w-10/12">
        <hgroup className="mb-4">
          <h3 className="text-xl font-bold">Trámites en la Base de Datos</h3>
          <span className="text-gray-600">
            Listado de trámites para Sirtagob o Sigmun
          </span>
        </hgroup>

        {/* 🔍 Filtros */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por ID o Nombre"
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/2"
          />

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="inactivos">Inactivos</option>
          </select>

          <button
            onClick={handleOpenModal}
            className="border border-gray-300 hover:bg-gray-300 hover:cursor-pointer transition ease-in-out duration-1000 rounded px-3 py-2 w-full md:w-1/10"
          >
            Nuevo Tramite
          </button>
        </div>

        <article className="bg-white p-4 rounded shadow">
          {isLoading ? (
            <p>Cargando...</p>
          ) : listadoFiltrado.length === 0 ? (
            <p>No se encontraron datos.</p>
          ) : (
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Trámite ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Instituciones
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Editar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {listadoFiltrado.map((item, index) => (
                    <tr key={index}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        {item["tramite-id"]}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.nombre}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                          onClick={() => abrirModalInstituciones(item)}
                        >
                          Ver Instituciones Asignada
                        </button>
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.estado ? "Activo" : "Inactivo"}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </section>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Instituciones Asignadas
          </h2>

          {tramiteSeleccionado?.institucion?.length > 0 ? (
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Nombre
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {obtenerInstitucionesAsignadas(
                    tramiteSeleccionado.institucion
                  ).map((inst, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                        {inst.nombre}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                        {inst.tipo}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                        {inst.estado ? (
                          <span className="text-green-600 font-medium">
                            Activa
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Inactiva
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No tiene instituciones asignadas.</p>
          )}
        </Modal>
      )}

      {showModalTramiteNuevo && (
        <TramiteIniciar
          setShowModalTramiteNuevo={setShowModalTramiteNuevo}
          instituciones={institucionesList}
        />
      )}
    </section>
  );
};

export default SeccionTramites;
