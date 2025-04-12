import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[rgba(218,205,208,1)] shadow-[0px_2px_2px_rgba(0,0,0,0.15)] border-black border-solid border-2 text-black",
        secondary:
          "bg-[rgba(242,242,242,1)] shadow-[0px_2px_2px_rgba(0,0,0,0.15)] border-black border-solid border-2 text-black",
        link: "text-black underline-offset-4 hover:underline",
        icon: "flex items-center gap-2 overflow-hidden justify-center rounded-md",
      },
      size: {
        default: "px-6 py-2.5",
        sm: "px-5 py-2",
        lg: "px-8 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
