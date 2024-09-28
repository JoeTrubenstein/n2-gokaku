import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function articleCard({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, reg, fob, ogImage, miles } =
    frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  console.log(ogImage)

  return (
    <div className="group relative">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
          {/* trying to properly size images */}

          <img
            src={ogImage.src}
            alt={title}
            decoding="async"
            className="lg:h-full lg:w-full h-full w-full object-cover object-center max-w-lg"
          />
        </div>
        <h2 {...headerProps}>{title}</h2>
      </a>
      {/* <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} /> */}
      <p>{description}</p>
    </div>
  );
}

