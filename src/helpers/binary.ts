export const fromBinaryArrayToString = (bytes: ArrayBuffer) => {
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
};
