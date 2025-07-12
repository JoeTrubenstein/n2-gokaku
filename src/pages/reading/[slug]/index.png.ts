// src/pages/reading/[slug]/index.png.ts
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForReading } from "@utils/generateOgImages";

export async function getStaticPaths() {
  // Grab every reading entry that isn’t a draft
  const readingEntries = await getCollection("reading")
    .then((all) => all.filter((entry) => !entry.data.draft));

  return readingEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  // props.entry is now your CollectionEntry<"reading">
  const entry = (props as { entry: CollectionEntry<"reading"> }).entry;
  const imageBuffer = await generateOgImageForReading(entry);
  return new Response(imageBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};
