import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
});

export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export type PropertiesSchemaType = z.infer<typeof propertiesSchema>;
