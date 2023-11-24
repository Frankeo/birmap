import { expect, test, describe } from "vitest";
import { formatAddress, replaceValue } from "../src/services/formats";

describe("formatAddress Suite", () => {
  const onlyAddress = "Calle Falsa 123";
  const city = "Barcelona";
  const country = "Spain";
  const address = `${onlyAddress}, ${city}, ${country}`;

  test("should return the address without cities", () => {
    const formattedAddress = formatAddress(address);
    expect(formattedAddress).toBe(onlyAddress);
    expect(formattedAddress).not.toContain(city);
  });
  test("should return the address without country", () => {
    const formattedAddress = formatAddress(address);
    expect(formattedAddress).toBe(onlyAddress);
    expect(formattedAddress).not.toContain(country);
  });
});

describe("replaceValue Suite", () => {
  const value = 12;
  const variableToReplace = "$VALUE";
  const text = `Some text with ${variableToReplace} lines`;
  const wrongText = "Some text with $value lines";
  test("should return same text if there is no value to replace", () => {
    const textReplaced = replaceValue(text);
    expect(textReplaced).toBe(text);
  });
  test("should return replaced text if there is a value to replace", () => {
    const textReplaced = replaceValue(text, value);
    expect(textReplaced).toContain(value);
    expect(textReplaced).not.toContain(variableToReplace);
  });
  test(`should return the same text when the text does not contain ${variableToReplace} even if there is a value`, () => {
    const textReplaced = replaceValue(wrongText, value);
    expect(textReplaced).not.toContain(value);
    expect(textReplaced).not.toContain(variableToReplace);
    expect(textReplaced).toBe(wrongText);
  });
});
