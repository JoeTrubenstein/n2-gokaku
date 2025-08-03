import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, slug, alt, description, reg, fob, ogImage, miles } =
    frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(slug) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <div className="group relative">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <div className="mb-8 aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
          {/* <img
            src={typeof ogImage === "string" ? ogImage : (ogImage?.src ?? "")}
            alt={alt ?? ""}
            decoding="async"
            className="lg:h-full lg:w-full object-cente h-full w-full max-w-lg object-cover"
          /> */}
        </div>
        <h2 {...headerProps}>{title}</h2>
      </a>

      <div>
        <p>{description}</p>
      </div>
    </div>
  );
}
