const getCorrectTextColor = (color?: string): string | null => {
  if (!color) return null;

  const threshold = 130;

  const cutHex = (hex: string): string => (hex.charAt(0) === '#' ? hex.substring(1, 7) : hex);

  const hexToR = (hex: string): number => parseInt(cutHex(hex).substring(0, 2), 16);

  const hexToG = (hex: string): number => parseInt(cutHex(hex).substring(2, 4), 16);

  const hexToB = (hex: string): number => parseInt(cutHex(hex).substring(4, 6), 16);

  const hRed = hexToR(color);
  const hGreen = hexToG(color);
  const hBlue = hexToB(color);

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;

  if (cBrightness > threshold) return '#000000';

  return '#ffffff';
};

export default getCorrectTextColor;
