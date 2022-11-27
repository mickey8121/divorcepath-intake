export const encodeValueForLink = (str: string | undefined): string | undefined =>
  str && encodeURIComponent(str.toLowerCase());

export const decodeValueFromLink = (str: string | undefined): string | undefined =>
  str && decodeURIComponent(str);
