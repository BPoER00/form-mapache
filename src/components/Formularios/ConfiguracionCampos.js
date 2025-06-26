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
        const [arrayKey, indexStr] = key.split(".");
        const index = parseInt(indexStr, 10);

        if (!Array.isArray(newState[arrayKey])) {
          newState[arrayKey] = [];
        }

        newState[arrayKey][index] = value;
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
          {tipoCampo === "archivo" && extras && <AutoField name="documentos" />}
        </AutoForm>
      </div>
    </section>
  );
};

export default ConfiguracionCampos;
