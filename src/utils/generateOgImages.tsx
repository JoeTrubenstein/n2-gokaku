import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import kanjiOgImage from "./og-templates/kanji"; 

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForKanji(post: CollectionEntry<"kanji">) {
  // use the kanji template, not the blog one:
  const svg = await kanjiOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForVocabulary(post: CollectionEntry<"vocabulary">) {
  // use the kanji template, not the blog one:
  const svg = await kanjiOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForGrammar(post: CollectionEntry<"grammar">) {
  // use the kanji template, not the blog one:
  const svg = await kanjiOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}
