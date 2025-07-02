// src/pages/grammar/[slug]/index.png.ts
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForGrammar } from "@utils/generateOgImages";

export async function getStaticPaths() {
  // Grab every grammar entry that isn’t a draft
  const grammarEntries = await getCollection("grammar")
    .then((all) => all.filter((entry) => !entry.data.draft));

  return grammarEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  // props.entry is now your CollectionEntry<"grammar">
  const entry = (props as { entry: CollectionEntry<"grammar"> }).entry;
  const imageBuffer = await generateOgImageForGrammar(entry);
  return new Response(imageBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};
