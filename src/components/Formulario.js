import { AutoForm } from "uniforms-antd";
import { ZodBridge } from "uniforms-bridge-zod";
import { z } from "zod";

const userSchema = z.object({
  username: z.string(),
});

const schema = new ZodBridge({ schema: userSchema });

const Formulario = () => {
  return (
    <section className="w-9/12 flex justify-center items-center mx-auto my-10">
      <AutoForm
        schema={schema}
        onSubmit={(model) => window.alert(JSON.stringify(model))}
      />
    </section>
  );
};

export default Formulario;
