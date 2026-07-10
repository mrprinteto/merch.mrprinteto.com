import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categoria: z.enum(['reunion', 'regalo', 'evento', 'personalizacion']),
    imagen: z.string().optional(),
    destacado: z.boolean().default(false),
    unidades: z.number().optional(),
    material: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    nombre: z.string(),
    empresa: z.string().optional(),
    cargo: z.string().optional(),
    texto: z.string(),
    stars: z.number().min(1).max(5).default(5),
  }),
});

export const collections = { projects, testimonials };
