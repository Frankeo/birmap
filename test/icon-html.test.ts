import { getIconHtml } from "../src/components/icon/icon-html";
import { expect, test, describe } from "vitest";

describe("Test Suite for getIconHtml", () => {
  const iconCss = "CSS";
  const value = 12;
  test("getIconHtml for boolean features", () => {
    const iconHtml = getIconHtml(iconCss);
    expect(iconHtml).toMatchSnapshot();
    expect(iconHtml).toContain("fa-xl");
    expect(iconHtml).toContain("margin: 0 0.25rem;");
  });
  test("getIconHtml for numeric features", () => {
    const iconHtml = getIconHtml(iconCss, value);
    expect(iconHtml).toMatchSnapshot();
    expect(iconHtml).toContain("fa-xl");
    expect(iconHtml).toContain(value);
    expect(iconHtml).toContain("margin: 0 0.25rem;");
  });
  test("getIconHtml for boolean features and small icons", () => {
    const iconHtml = getIconHtml(iconCss, undefined, true);
    expect(iconHtml).toMatchSnapshot();
    expect(iconHtml).not.toContain("fa-xl");
    expect(iconHtml).toContain("margin: 0;");
  });
  test("getIconHtml for numeric features and small icons", () => {
    const iconHtml = getIconHtml(iconCss, value, true);
    expect(iconHtml).toMatchSnapshot();
    expect(iconHtml).not.toContain("fa-xl");
    expect(iconHtml).toContain(value);
    expect(iconHtml).toContain("margin: 0;");
  });
});
