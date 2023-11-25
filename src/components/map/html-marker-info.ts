import { type CollectionEntry, getEntry } from "astro:content";
import { getIconHtml } from "../icon/icon-html";

export interface FeaturePlace {
  feature: {
    collection: CollectionEntry<"features">["collection"];
    slug: CollectionEntry<"features">["slug"];
  };
  value?: number | undefined;
}

export const getHtmlMarkerInfo = async (
  featuresPlace: FeaturePlace[],
  slug: CollectionEntry<"places">["slug"],
  title: string,
): Promise<string> => {
  let featuresHtml = "";
  for (const fp of featuresPlace) {
    const feature = await getEntry(fp.feature.collection, fp.feature.slug);
    featuresHtml = `${featuresHtml}${getIconHtml(
      feature.data.iconCss,
      fp.value,
      true,
    )}`;
  }
  return /* html */ `        
  <a href="/places/${slug}" class="has-text-primary">
    <p class="has-text-weight-bold">${title}</p>
    ${featuresHtml}
  </a>
  `;
};
