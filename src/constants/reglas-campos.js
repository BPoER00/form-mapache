import { ZodBridge } from "uniforms-bridge-zod";
import { object, z } from "zod";

const camposFijosReglasPrincipales = [
  "label",
  "nombre",
  "tipo",
  "nota",
  "holder",
  "confirmacion",
  "grupo",
  "step",
];

const camposFijosReglasValidacion = ["requerido", "minimo", "maximo", "regex"];

const camposFijosReglasDependencias = ["reglas"];

const camposFijosReglasPosicionamiento = ["columna", "columnaOffset"];

const camposFijosReglasGenerales = [
  "tramite-id",
  "nombre",
  "estado",
  "institucion",
];

const schemasCamposObjetos = ["nombre", "otros", "estado", "opciones"];

const schemaCamposPrincipalesDatosCargados = (opciones) => {
  const result = opciones.map((x) => x.nombre);

  return new ZodBridge({
    schema: z
      .object({
        label: z.string(),
        nombre: z.string(),
        tipo: z.enum([
          "texto",
          "numero",
          "booleano",
          "fecha",
          "opciones",
          "archivo",
          "email",
        ]),
        nota: z.string(),
        holder: z.string().optional(),
        confirmacion: z.boolean(),
        grupo: z.enum(["datosPersonales", "tramites", "requisitos"]),
        step: z.enum([1, 2, 3]),
        opciones: z.enum(result),
      })
      .superRefine((data, ctx) => {
        if (
          data.tipo === "opciones" &&
          (!data.opciones || data.opciones.length === 0)
        ) {
          ctx.addIssue({
            path: ["opciones"],
            code: z.ZodIssueCode.custom,
            message: "Debe ingresar al menos una opción.",
          });
        }
      }),
  });
};

const schemaReglasValidacion = () => {
  return new ZodBridge({
    schema: z.object({
      requerido: z.oboolean(),
      minimo: z.number().int().optional(),
      maximo: z.number().int().optional(),
      regex: z.string().optional(),
      mensajeError: z.string().optional(),
    }),
  });
};

const reglaSchema = z.object({
  campo: z.string().optional(),
  condicion: z.enum(["igual", "diferente", "mayor", "menor"]),
  valor: z.string().optional(),
});

const schemaDependencias = () => {
  return new ZodBridge({
    schema: z.object({
      reglas: z.array(reglaSchema),
    }),
  });
};

const schemaPosicionamiento = () => {
  return new ZodBridge({
    schema: z.object({
      columna: z.number().int(),
      columnaOffset: z.number().int().optional(),
    }),
  });
};

const camposGeneralesReglaSchemas = (instituciones) => {
  const schemaCamposGenerales = new ZodBridge({
    schema: z.object({
      "tramite-id": z.number().int(),
      nombre: z.string(),
      estado: z.boolean(),
      institucion: z.enum(instituciones),
    }),
  });

  return schemaCamposGenerales;
};

const camposObjetos = new ZodBridge({
  schema: z.object({
    nombre: z.string(),
    otros: z.boolean(),
    estado: z.boolean(),
    opciones: z.array(z.string()),
  }),
});

const TABS = [
  {
    valor: "Principales",
    nombre: "Campos Principales",
    schema: (opcion) => schemaCamposPrincipalesDatosCargados(opcion),
    camposFijos: camposFijosReglasPrincipales,
    camposExtras: true,
  },
  {
    valor: "Validacion",
    nombre: "Validacion",
    schema: () => schemaReglasValidacion(),
    camposFijos: camposFijosReglasValidacion,
    camposExtras: false,
  },
  {
    valor: "Dependencias",
    nombre: "Dependencias",
    schema: () => schemaDependencias(),
    camposFijos: camposFijosReglasDependencias,
    camposExtras: false,
  },
  {
    valor: "Posicionamiento",
    nombre: "Posicionamiento",
    schema: () => schemaPosicionamiento(),
    camposFijos: camposFijosReglasPosicionamiento,
    camposExtras: false,
  },
];

export {
  TABS,
  camposGeneralesReglaSchemas,
  camposFijosReglasGenerales,
  camposObjetos,
  schemasCamposObjetos,
};
