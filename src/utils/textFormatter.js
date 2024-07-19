function capitalizeText(text) {
  if (!text) return text; // Boş veya null metinler için
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
export { capitalizeText };
