type LoaderProps = { src: string; width: number };

function photoName(src: string) {
  const file = src.split("/").pop() ?? src;
  return file.split(".")[0];
}

export default function photoVariantLoader({ src, width }: LoaderProps) {
  return `/photos/variants/${photoName(src)}-${width}.webp`;
}
