import { objetos } from "@/constants/objetos";
import { getAll, post, put } from "@/services/Configure-Memory";
import { useEffect, useState } from "react";
import Modal from "./Globales/Modal";
import ConfiguracionCampos from "./Formularios/ConfiguracionCampos";
import { camposObjetos, schemasCamposObjetos } from "@/constants/reglas-campos";
import { useNotification } from "@/contexts/Notify";
import { ordenObjeto } from "@/helpers/ordenar-datos";

const SeccionObjetos = () => {
  const { addNotification } = useNotification();
  const [listado, setListado] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalOpciones, setShowModalOpciones] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [valores, setValores] = useState({});
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const result = await getAll(objetos);

      if (isMounted) {
        setListado(result);
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const listadoFiltrado = listado.filter((item) => {
    const coincideTexto = item.nombre
      ?.toLowerCase()
      .includes(filtroTexto.toLowerCase());

    const coincideEstado =
      filtroEstado === "todos" ||
      (filtroEstado === "activos" && item.estado) ||
      (filtroEstado === "inactivos" && !item.estado);

    return coincideTexto && coincideEstado;
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const onSubmit = async () => {
    const errores = [];

    if (!("estado" in valores)) {
      setValores((prev) => ({ ...prev, estado: false }));
    }

    if (!("otros" in valores)) {
      setValores((prev) => ({ ...prev, otros: false }));
    }

    if (!valores.nombre || valores.nombre.trim() === "") {
      errores.push("El campo 'nombre' es obligatorio.");
    }

    if (
      !valores.opciones ||
      !Array.isArray(valores.opciones) ||
      valores.opciones.length === 0
    ) {
      errores.push("Debe asignar al menos una opcion.");
    }

    if (errores.length > 0) {
      errores.forEach((error) => addNotification(error, "warning"));
      return;
    }

    if (valores.id) {
      await put(objetos, valores, "id", valores.id);
      addNotification("Objeto editado correctamente", "success");
    } else {
      const resultObject = ordenObjeto(valores);
      await post(objetos, resultObject);
      addNotification("Objeto guardado correctamente", "success");
    }

    setShowModal(false);
  };

  const abrirModalOpciones = (opciones) => {
    setShowModalOpciones(true);
    setOpciones(opciones);
  };

  const handleEditarObjeto = (tramite) => {
    setValores(tramite);
    setShowModal(true);
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
            Nuevo Objeto
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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Opciones
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Otros
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
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.nombre}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                          onClick={() => abrirModalOpciones(item)}
                        >
                          Ver Opciones
                        </button>
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        Agregar otros: {item.otros ? "Activo" : "Inactivo"}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.estado ? "Activo" : "Inactivo"}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <button
                          onClick={() => handleEditarObjeto(item)}
                          className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                        >
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
          <h2 className="text-lg font-semibold mb-4">Cree su objeto</h2>

          <section className="w-full h-auto max-h-96 overflow-y-auto border border-gray-300 rounded-md p-3">
            <ConfiguracionCampos
              setValores={setValores}
              titulo={"Campos para objetos"}
              schema={camposObjetos}
              campos={schemasCamposObjetos}
              camposExtras={false}
              values={valores}
            />
          </section>

          <button
            type="button"
            className="w-full hover:cursor-pointer bg-blue-800 text-white p-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700"
            onClick={onSubmit}
          >
            Guardar Configuración
          </button>
        </Modal>
      )}

      {showModalOpciones && (
        <Modal onClose={() => setShowModalOpciones(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Listado de opciones: {opciones.nombre}
          </h2>
          <section className="w-full h-auto max-h-96 overflow-y-auto border border-gray-300 rounded-md p-3">
            {opciones?.opciones?.length > 0 ? (
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-gray-900 text-center font-bold text-md">
                        nombre
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {opciones.opciones.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap text-center">
                          {item.trim() === "" ? "-- vacío --" : item}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No tiene opciones asignadas.</p>
            )}
          </section>
        </Modal>
      )}
    </section>
  );
};

export default SeccionObjetos;
