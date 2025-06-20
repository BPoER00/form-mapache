import { AutoForm } from "uniforms-antd";

const ConfiguracionCampos = ({ setValores, titulo, schema, values }) => {
  return (
    <section className="w-11/12 flex flex-col justify-center items-center mx-auto my-10">
      <h3 className="text-xl font-bold">{titulo}</h3>

      <div className="w-full p-2">
        <AutoForm
          schema={schema}
          onChange={(key, value) =>
            setValores((prev) => ({ ...prev, [key]: value }))
          }
          showInlineError={false}
          submitField={() => null}
        />
      </div>
    </section>
  );
};

export default ConfiguracionCampos;
