import { productImageSizes } from "@/content/media";

export default function ProductImage({
  path,
  alt,
  eager = false,
  className = "",
  ...props
}) {
  const dimensions = productImageSizes[path.split("/").pop()];
  return (
    <img
      src={`${path}-1600.webp`}
      srcSet={`${path}-640.webp ${dimensions.small}w, ${path}-1600.webp ${dimensions.width}w`}
      width={dimensions.width}
      height={dimensions.height}
      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 90vw, 55vw"
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      className={className}
      {...props}
    />
  );
}
