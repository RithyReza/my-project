export function money(num) {
  if (!num) return "0 ៛";
  return Number(num).toLocaleString("en-US") + " ៛";
}
