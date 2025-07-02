import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForKanji } from "@utils/generateOgImages";

export async function getStaticPaths() {
  // Generate an OG image for each kanji entry that isn't marked as draft
  const kanjiEntries = await getCollection("kanji")
    .then((all) => all.filter((entry) => !entry.data.draft));

return kanjiEntries.map((entry) => ({
  params: { slug: entry.slug },
  props: { entry },
}));
}

export const GET: APIRoute = async ({ props }) => {
  // props.entry is now your CollectionEntry<"kanji">
  const entry = (props as { entry: CollectionEntry<"kanji"> }).entry;
  const imageBuffer = await generateOgImageForKanji(entry);
  return new Response(imageBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};
