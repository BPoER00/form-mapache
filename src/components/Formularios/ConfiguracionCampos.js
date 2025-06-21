import { AutoForm, AutoField, ErrorsField } from "uniforms-antd";
import { useEffect, useState } from "react";

const ConfiguracionCampos = ({
  setValores,
  titulo,
  schema,
  campos,
  extras,
}) => {
  const [tipoCampo, setTipoCampo] = useState("");

  return (
    <section className="w-11/12 flex flex-col justify-center items-center mx-auto my-10">
      <h3 className="text-xl font-bold">{titulo}</h3>

      <div className="w-full p-2">
        <AutoForm
          schema={schema}
          onChange={(key, value) => {
            setValores((prev) => ({ ...prev, [key]: value }));
            if (key === "tipo") setTipoCampo(value);
          }}
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
