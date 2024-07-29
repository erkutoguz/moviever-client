function capitalizeText(text) {
  if (!text) return text;

  const words = text.split("_");

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
export { capitalizeText };
