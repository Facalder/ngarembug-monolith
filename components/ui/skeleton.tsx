import * as React from "react";
import { cn } from "@/lib/utils";

const Skeleton = React.memo(function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted rounded-md animate-pulse", className)}
      {...props}
    />
  );
});

export { Skeleton };
