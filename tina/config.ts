import { defineConfig, Form, TinaCMS } from "tinacms";
import { getGeocode } from "./geo-code";

interface BeforeSubmitArgs {
  form: Form;
  cms: TinaCMS;
  values: Record<string, any>;
}

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        ui: {
          beforeSubmit: async ({ cms, form, values} : BeforeSubmitArgs) => {
            const position = await getGeocode(values["address"])
            return { ...values, "coordinates": position }
          }
        },
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
            type: "rich-text",
            name: "summary",
            label: "Summary",
            isBody: true,
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
            type: "object",
            list: true,
            name: "featuresPlace",
            label: "Features at Place",
            ui: {
              itemProps: (item) => {
                return { label: item?.feature };
              },
            },
            fields: [
              {
                label: 'Feature',
                name: "feature",
                type: "reference",
                collections: ['features'],
                required: true,
                ui: {
                  parse: (val: string) => val.split("/").slice(-1)[0].split(".")[0],
                  format: (val: string) => `src/content/features/${val}.md`
                }
              },
              {
                label: 'Value',
                name: "value",
                type: "number",
                ui: {
                  parse: (val: string) => val === "" ? undefined : Number(val)
                }
              }
            ],
          },
          {
            type: "object",
            name: "coordinates",
            label: "Coordinates",
            fields: [
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
            ]
          }
        ],
      },
      {
        name: "features",
        label: "Features",
        path: "src/content/features",
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
            type: "rich-text",
            name: "text",
            label: "Text",
            isBody: true,
            required: true,
          },
          {
            type: "string",
            name: "iconCss",
            label: "CSS Icon",
            required: true,
          },
        ]
      }
    ],
  },
});
