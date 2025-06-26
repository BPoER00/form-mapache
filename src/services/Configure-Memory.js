"use server";
import MemoryDB from "common/src/memory-db.node";

const path = `.[?(@.{{key}}=="{{value}}")]`;

const remplazarValores = (key, value) => {
  return path.replace("{{key}}", key).replace("{{value}}", value);
};

const getAll = async (tabla) => {
  const configure = new MemoryDB(tabla);

  const db = await configure.listar();

  return db;
};

const getId = async (tabla, value) => {
  const key = "id";
  const configure = new MemoryDB(tabla);

  const pathPrepare = remplazarValores(key, value);

  const db = await configure.buscar(pathPrepare);

  return db;
};

const post = async (tabla, value) => {
  const configure = new MemoryDB(tabla);

  await configure.guardar(value);
};

const put = async (tabla, value, key, keyValue) => {
  const configure = new MemoryDB(tabla);

  const pathPrepare = remplazarValores(key, keyValue);
  await configure.editar(pathPrepare, value);
};

export { getAll, getId, post, put };
