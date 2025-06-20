import { AutoForm, AutoField, ErrorsField } from "uniforms-antd";
import { useEffect, useState } from "react";

const ConfiguracionCampos = ({ setValores, titulo, schema, values }) => {
  const [tipoCampo, setTipoCampo] = useState(values?.tipo || "");

  useEffect(() => {
    if (values?.tipo) {
      setTipoCampo(values.tipo);
    }
  }, [values?.tipo]);

  return (
    <section className="w-11/12 flex flex-col justify-center items-center mx-auto my-10">
      <h3 className="text-xl font-bold">{titulo}</h3>

      <div className="w-full p-2">
        <AutoForm
          schema={schema}
          model={values}
          onChange={(key, value) => {
            setValores((prev) => ({ ...prev, [key]: value }));
            if (key === "tipo") setTipoCampo(value);
          }}
          showInlineError={false}
          submitField={() => null}
        >
          <AutoField name="label" />
          <AutoField name="nombre" />
          <AutoField name="tipo" />
          <AutoField name="nota" />

          {tipoCampo === "opciones" && <AutoField name="opciones" />}
          {tipoCampo === "archivo" && <AutoField name="documentos" />}
        </AutoForm>
      </div>
    </section>
  );
};

export default ConfiguracionCampos;
