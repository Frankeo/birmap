import { defineCollection, z } from "astro:content";

export const collections = {
  places: defineCollection({
    schema: z.object({
      title: z.string(),
      summary: z.string().max(200),
      image: z.string(),
      address: z.string(),
      lat: z.number(),
      lng: z.number(),
      phone: z.number(),
    }),
  }),
};
