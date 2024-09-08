import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, reg, fob, ogImage, miles } =
    frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <div className="group relative">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
          <img
            src={ogImage?.toString()}
            alt="Front of men's Basic Tee in black."
            className="lg:h-full lg:w-full h-full w-full object-cover object-center"
          />
        </div>
        <h2 {...headerProps}>{title}</h2>
      </a>
      {reg ? (<div>      <p>First Registered: {reg}</p>
      <p>Odometer: {miles} kms</p>
      <p>FOB: <b>{fob}</b> USD</p></div>):(<div><p>{description}</p></div>)}
      {/* <p>First Registered: {reg}</p>
      <p>Odometer: {miles} kms</p>
      <p>FOB: <b>{fob}</b> USD</p> */}

      {/* <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} /> */}
      {/* <p>{description}</p> */}
    </div>
  );
}
