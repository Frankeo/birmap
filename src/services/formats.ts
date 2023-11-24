export const formatAddress = (address: string): string => address.split(",")[0];
export const replaceValue = (text: string, value?: number): string =>
  value !== undefined ? text.replace("$VALUE", value.toString()) : text;
