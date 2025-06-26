"use server";
import MemoryDB from "common/src/memory-db.node";

const path = `.[?(@.{{key}}=="{{value}}")]`;

const getAll = async (tabla) => {
  const configure = new MemoryDB(tabla);

  const db = await configure.listar();

  return db;
};

const getId = async (tabla, value) => {
  const key = "id";
  const configure = new MemoryDB(tabla);

  const pathPrepare = path.replace("{{key}}", key).replace("{{value}}", value);

  const db = await configure.buscar(pathPrepare);

  return db;
};

export { getAll, getId };
