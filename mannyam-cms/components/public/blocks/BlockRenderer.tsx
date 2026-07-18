import React from "react";
import { HeroBlock } from "./HeroBlock";
import { FeatureGridBlock } from "./FeatureGridBlock";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { CtaBannerBlock } from "./CtaBannerBlock";
import { TestimonialBlock } from "./TestimonialBlock";
import { ConciergeContactBlock } from "./ConciergeContactBlock";
import { TilesBlock } from "./TilesBlock";
import { FactBarBlock } from "./FactBarBlock";
import { PlaceChipsBlock } from "./PlaceChipsBlock";
import { FaqBlock } from "./FaqBlock";

export type BlockType =
  | "Hero"
  | "Text Block"
  | "Feature Grid"
  | "Image Block"
  | "CTA Banner"
  | "Testimonial"
  | "Concierge Contact"
  | "Tiles"
  | "Fact Bar"
  | "Place Chips"
  | "FAQ";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BlockData {
  [key: string]: any;
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  data: BlockData;
}

interface BlockRendererProps {
  blocks: ContentBlock[] | unknown;
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <div className="w-full flex flex-col">
      {blocks.map((block: ContentBlock) => {
        if (!block || !block.type || !block.data) {
          return null;
        }

        switch (block.type) {
          case "Hero":
            return <HeroBlock key={block.id} data={block.data} />;
          case "Feature Grid":
            return <FeatureGridBlock key={block.id} data={block.data} />;
          case "Text Block":
            return <TextBlock key={block.id} data={block.data} />;
          case "Image Block":
            return <ImageBlock key={block.id} data={block.data} />;
          case "CTA Banner":
            return <CtaBannerBlock key={block.id} data={block.data} />;
          case "Testimonial":
            return <TestimonialBlock key={block.id} data={block.data} />;
          case "Concierge Contact":
            return <ConciergeContactBlock key={block.id} data={block.data} />;
          case "Tiles":
            return <TilesBlock key={block.id} data={block.data} />;
          case "Fact Bar":
            return <FactBarBlock key={block.id} data={block.data} />;
          case "Place Chips":
            return <PlaceChipsBlock key={block.id} data={block.data} />;
          case "FAQ":
            return <FaqBlock key={block.id} data={block.data} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
