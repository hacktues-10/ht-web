import Image, { ImageProps } from "next/image";

import ht3line1 from "../HackTUES3_line1.png";
import ht3line2 from "../HackTUES3_line2.png";
import ht3line3 from "../HackTUES3_line3.png";

export function HT3Line1(props: Omit<ImageProps, "src" | "alt">) {
  return <Image src={ht3line1} alt="" {...props} />;
}

export function HT3Line2(props: Omit<ImageProps, "src" | "alt">) {
  return <Image src={ht3line2} alt="" {...props} />;
}

export function HT3Line3(props: Omit<ImageProps, "src" | "alt">) {
  return <Image src={ht3line3} alt="" {...props} />;
}
