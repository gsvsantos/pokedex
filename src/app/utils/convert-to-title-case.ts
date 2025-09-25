export function convertToTitleCase(text: string): string {
  if (text.length < 1) return text;

  const newString = text[0].toUpperCase() + text.substring(1).toLowerCase();

  return newString;
}
