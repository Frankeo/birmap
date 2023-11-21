import { defineCollection, z } from "astro:content";

export const collections = {
  places: defineCollection({
    schema: z.object({
      title: z.string(),
      summary: z.string().max(300),
      image: z.string(),
      localImage: z.string(),
      address: z.string(),
      lat: z.number(),
      lng: z.number(),
      phone: z.number(),
      drafts: z.optional(z.number()),
      differentBeers: z.optional(z.number()),
      isGluteenFree: z.optional(z.boolean()),
      hasBurgers: z.optional(z.boolean()),
      hasAsianFood: z.optional(z.boolean()),
      hasTapas: z.optional(z.boolean()),
      isRestaurant: z.optional(z.boolean()),
      hasVeganFood: z.optional(z.boolean()),
      hasLiveMusic: z.optional(z.boolean()),
      hasSportsTv: z.optional(z.boolean()),
      isShop: z.optional(z.boolean()),
      isBrewery: z.optional(z.boolean()),
      isPetFriendly: z.optional(z.boolean()),
      hasBeerTasting: z.optional(z.boolean()),
    }),
  }),
};
