import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "places",
        label: "Places",
        path: "src/content/places",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "address",
            label: "Address",
            required: true,
          },
          {
            type: "number",
            name: "lat",
            label: "Latitude",
            required: true,
          },
          {
            type: "number",
            name: "lng",
            label: "Longitud",
            required: true,
          },
          {
            type: "number",
            name: "phone",
            label: "Phone",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true,
          },
          {
            type: "image",
            name: "localImage",
            label: "Local Image",
            required: true,
          },
          {
            type: "number",
            name: "drafts",
            label: "Drafts",
          },
          {
            type: "number",
            name: "differentBeers",
            label: "Different type of beers",
          },
          {
            type: "boolean",
            name: "isGluteenFree",
            label: "Is gluteen free?",
          },
          {
            type: "boolean",
            name: "hasBurgers",
            label: "Has burgers?",
          },
          {
            type: "boolean",
            name: "hasAsianFood",
            label: "Has asian food?",
          },
          {
            type: "boolean",
            name: "hasTapas",
            label: "Has tapas?",
          },
          {
            type: "boolean",
            name: "isRestaurant",
            label: "Is a restaurant?",
          },
          {
            type: "boolean",
            name: "hasVeganFood",
            label: "Has vegan food?",
          },
          {
            type: "boolean",
            name: "hasLiveMusic",
            label: "Has live music?",
          },
          {
            type: "boolean",
            name: "hasSportsTv",
            label: "Has sports TV?",
          },
          {
            type: "boolean",
            name: "isShop",
            label: "Is a beer shop?",
          },
          {
            type: "boolean",
            name: "isBrewery",
            label: "Is a brewery?",
          },
          {
            type: "boolean",
            name: "isPetFriendly",
            label: "Is pet friendly?",
          },
          {
            type: "boolean",
            name: "hasBeerTasting",
            label: "Has beer tasting?",
          },
        ],
      },
    ],
  },
});
