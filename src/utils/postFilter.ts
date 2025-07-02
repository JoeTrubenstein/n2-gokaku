import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog"> | CollectionEntry<"articles">;

const postFilter = (post: Post) => {
  const { data } = post;

  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime ?? 0).getTime() - SITE.scheduledPostMargin;

  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
