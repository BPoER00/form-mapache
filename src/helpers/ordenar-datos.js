import { v4 as uuidv4 } from "uuid";

const comprobarId = (objeto) => {
  const id = "id" in objeto ? objeto.id : uuidv4();

  return {
    ...objeto,
    id,
  };
};

const ordenObjeto = (objeto) => {
  const comprobacion = comprobarId(objeto);
  return comprobacion;
};

export { ordenObjeto };
