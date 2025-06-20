import { ZodBridge } from "uniforms-bridge-zod";
import { string, z } from "zod";

const schemaReglasPrincipales = new ZodBridge({
  schema: z.object({
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
