import { getCollection } from "astro:content";

const toSlug = (s: string) => {
  return s
    .trim()
    .replace(/\s+/g, "-") // collapse spaces to hyphen
    .replace(/[^\p{Letter}\p{Number}-]/gu, ""); // keep all letters/numbers/hyphen (Unicode-safe)
};

export type TagInfo = { tag: string; tagName: string; count: number };

export default async function getAllTags(): Promise<TagInfo[]> {
  const [blog, vocabulary, grammar] = await Promise.all([
    getCollection("blog", ({ data }) => !data.draft),
    getCollection("vocabulary", ({ data }) => !data.draft).catch(() => []),
    getCollection("grammar", ({ data }) => !data.draft).catch(() => []),
  ]);

  const all = [...blog, ...vocabulary, ...grammar];
  const map = new Map<string, TagInfo>();

  for (const item of all) {
    const tags = Array.isArray(item.data?.tags) ? item.data.tags : [];
    for (const raw of tags) {
      const name = String(raw ?? "").trim();
      if (!name) continue;
      const slug = toSlug(name);
      if (!slug) continue; // defensive: skip if it somehow still empties
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { tag: slug, tagName: name, count: 1 });
    }
  }

  return Array.from(map.values()).sort((a, b) =>
    a.tagName.localeCompare(b.tagName, "en")
  );
}
