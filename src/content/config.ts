import { defineCollection, reference, z } from "astro:content";

export const collections = {
  features: defineCollection({
    schema: z.object({
      title: z.string(),
      iconCss: z.string(),
    }),
  }),
  places: defineCollection({
    schema: z.object({
      title: z.string(),
      image: z.string(),
      localImage: z.string(),
      address: z.string(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      phone: z.number(),
      featuresPlace: z.array(
        z.object({
          feature: reference("features"),
          value: z.number().optional(),
        }),
      ),
    }),
  }),
};
