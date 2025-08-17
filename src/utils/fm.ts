export const toArray = (v: unknown): string[] =>
  Array.isArray(v) ? (v as string[]) : v == null ? [] : [String(v)];

export const text = (v: unknown, fallback = "—"): string => {
  const s = (v ?? "").toString().trim();
  return s.length ? s : fallback;
};
