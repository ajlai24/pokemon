import { Skeleton } from "@/components/ui/skeleton";
import Image, { ImageProps } from "next/image";

interface PokemonImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  className?: string;
}

export function PokemonImage({
  src,
  alt = "",
  width = 96,
  height = 96,
  className = "",
  ...rest
}: PokemonImageProps) {
  if (!src) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[96px] w-[96px] rounded-xl animate-none" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-xl ${className}`}
      {...rest}
    />
  );
}
