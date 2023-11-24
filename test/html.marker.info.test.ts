import {
  type FeaturePlace,
  getHtmlMarkerInfo,
} from "../src/components/map/html-marker-info";
import { expect, test, describe } from "vitest";

describe("getHtmlMarkerInfo Suite", () => {
  const title = "SOME TITLE";
  const slug = "abirradero";

  test("should return a LINK with a TITLE and NO icons when there are NOT features", async () => {
    const featuresPlace: FeaturePlace[] = [];
    const htmlMarkerInfo = await getHtmlMarkerInfo(featuresPlace, slug, title);
    expect(htmlMarkerInfo).toMatchSnapshot();
    expect(htmlMarkerInfo).toContain(slug);
    expect(htmlMarkerInfo).toContain(title);
    expect(htmlMarkerInfo).not.toContain("icon");
  });

  test("should return a LINK with a TITLE and some icons when there are some features", async () => {
    const value1 = 1;
    const value2 = 11;
    const getFeature = (value: number): FeaturePlace => ({
      feature: {
        collection: "features",
        slug: "drafts",
      },
      value,
    });
    const featuresPlace: FeaturePlace[] = [
      getFeature(value1),
      getFeature(value2),
    ];
    const htmlMarkerInfo = await getHtmlMarkerInfo(featuresPlace, slug, title);
    expect(htmlMarkerInfo).toMatchSnapshot();
    expect(htmlMarkerInfo).toContain(slug);
    expect(htmlMarkerInfo).toContain(title);
    expect(htmlMarkerInfo).toContain("icon");
    expect(htmlMarkerInfo).toContain(value1);
    expect(htmlMarkerInfo).toContain(value2);
  });
});
