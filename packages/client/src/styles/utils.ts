export const convertHex = (hex: string, opacity?: number) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return opacity != null && opacity > 0 ? `rgba(${r},${g},${b},${opacity})` : `rgb(${r},${g},${b})`;
};

export const onePxGif =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
