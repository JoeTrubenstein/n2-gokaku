import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImages";

export async function getStaticPaths() {
  // get all non‐draft vocabulary entries
  const vocabEntries = await getCollection("vocabulary")
    .then((all) => all.filter((entry) => !entry.data.draft));

  return vocabEntries.map((entry) => ({
    params: { slug: entry.slug },
    // wrap your entry in its own prop
    props: { entry },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  // now props.entry is known to be a vocabulary entry
  const { entry } = props as { entry: CollectionEntry<"vocabulary"> };

  // if generateOgImageForPost's signature still doesn't allow "vocabulary",
  // you can force‐cast here:
  const imageBuffer = await generateOgImageForPost(entry as any);

  return new Response(imageBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};
