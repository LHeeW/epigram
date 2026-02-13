declare module "*.svg" {
  import type React from "react";
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module "*.svg?url" {
  const content: string;
  export default content;
}
