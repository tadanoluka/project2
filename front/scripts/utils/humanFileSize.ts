export default function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " Б";
  }

  const units = si
    ? ["кБ", "мБ", "гБ", "тБ", "пБ", "эБ", "зБ", "иБ"]
    : ["КБ", "МБ", "ГБ", "ТБ", "ПБ", "ЭБ", "ЗБ", "ИБ"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}
