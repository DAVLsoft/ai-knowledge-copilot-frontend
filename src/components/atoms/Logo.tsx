import type { ComponentProps } from "react";
import { cn } from "cn";

type LogoProps = ComponentProps<"img">;

export function Logo({
  alt = "Logo",
  className,
  src = "/Logo.png",
  ...props
}: LogoProps) {
  return (
    <img alt={alt} className={cn("h-8 w-8", className)} src={src} {...props} />
  );
}
