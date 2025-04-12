
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button-shadcn-fixed"

const sidebarVariants = cva(
  "fixed top-0 h-full bg-background shadow-lg transition-transform duration-300 ease-in-out z-50",
  {
    variants: {
      position: {
        left: "left-0 -translate-x-full data-[state=open]:translate-x-0",
        right: "right-0 translate-x-full data-[state=open]:translate-x-0",
      },
      size: {
        default: "w-72",
        sm: "w-56",
        lg: "w-80",
        xl: "w-96",
      },
    },
    defaultVariants: {
      position: "left",
      size: "default",
    },
  }
)

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, position, size, open = false, onOpenChange, ...props }, ref) => {
    return (
      <>
        {open && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => onOpenChange?.(false)}
          />
        )}
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          className={cn(sidebarVariants({ position, size }), className)}
          {...props}
        />
      </>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-3 border-b flex justify-between items-center", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 overflow-auto h-[calc(100%-4rem)]", className)}
    {...props}
  />
))
SidebarBody.displayName = "SidebarBody"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-3 border-t", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
  }
>(({ className, variant, size, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
))
SidebarTrigger.displayName = "SidebarTrigger"

export { Sidebar, SidebarHeader, SidebarBody, SidebarFooter, SidebarTrigger }
