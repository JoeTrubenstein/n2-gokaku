import { SITE } from "@config";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      reg: z.string().optional().nullable(),
      slug: z.string(), 
      alt: z.string().optional().nullable(),
      fob: z.string().optional().nullable(),
      miles: z.string().optional().nullable(),
      pubDatetime: z.date().optional().nullable(),
      modDatetime: z.date().optional().nullable(),
      title: z.string().optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string().optional().nullable(),
      canonicalURL: z.string().optional(),
    }),
});

const articles = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author).optional().nullable(),
      reg: z.string().optional().nullable(),
      fob: z.string().optional().nullable(),
      miles: z.string().optional().nullable(),
      pubDatetime: z.date().optional().nullable(),
      modDatetime: z.date().optional().nullable(),
      title: z.string().optional().nullable(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string().optional().nullable(),
      canonicalURL: z.string().optional(),
    }),
});

export const collections = { blog, articles };
