import { AutoForm, AutoField } from "uniforms-antd";
import { useEffect, useState } from "react";

const ConfiguracionCampos = ({
  setValores,
  titulo,
  schema,
  campos,
  extras,
  values,
}) => {
  const [tipoCampo, setTipoCampo] = useState("");

  const configureData = (key, value) => {
    setValores((prev) => {
      const newState = { ...prev };

      if (key.includes(".")) {
        const parts = key.split(".");
        const arrayKey = parts[0];
        const index = parseInt(parts[1], 10);

        if (!Array.isArray(newState[arrayKey])) {
          newState[arrayKey] = [];
        }

        // Asegurarse de que el índice tenga un objeto inicial
        if (!newState[arrayKey][index]) {
          newState[arrayKey][index] = {};
        }

        if (parts.length === 2) {
          // Caso simple: variable.0
          newState[arrayKey][index] = value;
        } else if (parts.length === 3) {
          // Caso anidado: variable.0.valor
          const field = parts[2];
          if (typeof newState[arrayKey][index] !== "object") {
            newState[arrayKey][index] = {};
          }
          newState[arrayKey][index][field] = value;
        }
      } else {
        newState[key] = value;
      }

      return newState;
    });

    if (key === "tipo") setTipoCampo(value);
  };

  return (
    <section className="w-11/12 flex flex-col justify-center items-center mx-auto my-10">
      <h3 className="text-xl font-bold">{titulo}</h3>

      <div className="w-full p-2">
        <AutoForm
          schema={schema}
          model={values}
          onChange={(key, value) => configureData(key, value)}
          showInlineError={false}
          submitField={() => null}
        >
          {campos.map((campo) => (
            <AutoField key={campo} name={campo} />
          ))}

          {tipoCampo === "opciones" && extras && <AutoField name="opciones" />}
        </AutoForm>
      </div>
    </section>
  );
};

export default ConfiguracionCampos;
