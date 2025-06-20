import { ZodBridge } from "uniforms-bridge-zod";
import { z } from "zod";

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
        "switch",
        "checkbox",
      ]),
      nota: z.string(),
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
    requerido: z.boolean().optional(),
    minimo: z.number().optional(),
    maximo: z.number().optional(),
    regex: z.string().optional(),
  }),
});

const schemaDependencias = new ZodBridge({
  schema: z.object({
    valor: z.string(),
    condicion: z.enum(["igual", "diferente", "mayor", "menor"]),
    campo: z.string(),
  }),
});

const schemaPosicionamiento = new ZodBridge({
  schema: z.object({
    columna: z.number(),
    columnaOfset: z.number().optional(),
  }),
});

const TABS = [
  {
    valor: "Principales",
    nombre: "Campos Principales",
    schema: schemaReglasPrincipales,
  },
  {
    valor: "Validacion",
    nombre: "Validacion",
    schema: schemaReglasValidacion,
  },
  {
    valor: "Dependencias",
    nombre: "Dependencias",
    schema: schemaDependencias,
  },
  {
    valor: "Posicionamiento",
    nombre: "Posicionamiento",
    schema: schemaPosicionamiento,
  },
];

export { TABS };
