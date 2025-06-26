import { ZodBridge } from "uniforms-bridge-zod";
import { object, z } from "zod";

const camposFijosReglasPrincipales = [
  "label",
  "nombre",
  "tipo",
  "nota",
  "holder",
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

const schemaReglasPrincipales = new ZodBridge({
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
      opciones: z.string().optional(),
      documentos: z.string().optional(),
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

      if (
        data.tipo === "archivo" &&
        (!data.documentos || data.documentos.length === 0)
      ) {
        ctx.addIssue({
          path: ["documentos"],
          code: z.ZodIssueCode.custom,
          message: "Debe ingresar al menos un documento.",
        });
      }
    }),
});

const schemaReglasValidacion = new ZodBridge({
  schema: z.object({
    requerido: z.oboolean(),
    minimo: z.number().int().optional(),
    maximo: z.number().int().optional(),
    regex: z.string().optional(),
    mensajeError: z.string().optional(),
  }),
});

const reglaSchema = z.object({
  valor: z.string().optional(),
  condicion: z.enum(["igual", "diferente", "mayor", "menor"]),
  campo: z.string().optional(),
});

const schemaDependencias = new ZodBridge({
  schema: z.object({
    reglas: z.array(reglaSchema),
  }),
});

const schemaPosicionamiento = new ZodBridge({
  schema: z.object({
    columna: z.number().int(),
    columnaOffset: z.number().int().optional(),
  }),
});

const camposGeneralesReglaSchemas = (instituciones) => {
  const schemaCamposGenerales = new ZodBridge({
    schema: z.object({
      "tramite-id": z.number().int(),
      nombre: z.string(),
      estado: z.boolean(),
      institucion: z.array(z.enum(instituciones)),
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
    schema: schemaReglasPrincipales,
    camposFijos: camposFijosReglasPrincipales,
    camposExtras: true,
  },
  {
    valor: "Validacion",
    nombre: "Validacion",
    schema: schemaReglasValidacion,
    camposFijos: camposFijosReglasValidacion,
    camposExtras: false,
  },
  {
    valor: "Dependencias",
    nombre: "Dependencias",
    schema: schemaDependencias,
    camposFijos: camposFijosReglasDependencias,
    camposExtras: false,
  },
  {
    valor: "Posicionamiento",
    nombre: "Posicionamiento",
    schema: schemaPosicionamiento,
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
