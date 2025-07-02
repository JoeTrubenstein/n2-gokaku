import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedArticles = (articles: CollectionEntry<"articles">[]) => {
  return articles
    .filter(postFilter)
    .sort((a, b) => {
      const dateA = new Date(a.data.pubDatetime ?? 0).getTime() / 1000;
      const dateB = new Date(b.data.pubDatetime ?? 0).getTime() / 1000;
      return Math.floor(dateB - dateA);
    });
};

export default getSortedArticles;
