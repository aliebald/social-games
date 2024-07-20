import NextImage, { ImageProps as NextImageProps } from "next/image";
import {
  Image as MantineImage,
  ImageProps as MantineImageProps,
} from "@mantine/core";

interface ImageProps
  extends Omit<MantineImageProps, "component" | "style">,
    NextImageProps {
  alt: string;
  src: MantineImageProps["src"];
}

/** Image for use with images not fetched from firebase */
export default function Image(props: ImageProps) {
  return <MantineImage component={NextImage} {...props} />;
}
