import { SITE } from "@config";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/** Helpers */
const zStrArr = z.union([z.string(), z.array(z.string())]).transform(v =>
  Array.isArray(v) ? v : (v ? [v] : [])
);

/** Shared fields */
const shared = (image: any) =>
  z.object({
    slug: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    pubDatetime: z.date().optional().nullable(),
    modDatetime: z.date().optional().nullable(),
    author: z.string().default(SITE.author).optional(),
    ogImage: image()
      .refine((img: { width: number; height: number }) => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph image must be at least 1200 x 630",
      })
      .or(z.string())
      .optional(),
  });

/** Blog */
const blog = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    shared(image).extend({
      title: z.string(),
      excerpt: z.string().optional(),
    }),
});

/** Vocabulary */
const vocabulary = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/vocabulary" }),
  schema: ({ image }) =>
    shared(image).extend({
      headword: z.string(),         // 傾く
      reading: zStrArr,             // ["かたむく"]
      meaning: zStrArr,             // ["to tilt","to lean","to incline"]
      pos: z.enum([
        "noun","verb","i-adj","na-adj","adverb","conjunction",
        "suru-noun","prefix","suffix","counter"
      ]).optional(),
      verb_class: z.enum(["ichidan","godan","irregular"]).optional(),
      transitivity: z.enum(["transitive","intransitive","pair"]).optional(),
    }),
});

/** Grammar */
const grammar = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/grammar" }),
  schema: ({ image }) =>
    shared(image).extend({
      pattern: z.string(),          // 〜だけあって
      connection: z.string().optional(),
      meaning: zStrArr,
    }),
});

export const collections = { blog, vocabulary, grammar };
