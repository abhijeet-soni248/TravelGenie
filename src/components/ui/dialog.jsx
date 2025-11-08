"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "./utils.js";

// Root can be exported directly
const Dialog = DialogPrimitive.Root;

const DialogTrigger = React.forwardRef(({ children, ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref} data-slot="dialog-trigger" {...props}>
    {children}
  </DialogPrimitive.Trigger>
));
DialogTrigger.displayName = "DialogTrigger";

const DialogPortal = ({ children, ...props }) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props}>
    {children}
  </DialogPrimitive.Portal>
);

const DialogClose = React.forwardRef(({ children, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props}>
    {children}
  </DialogPrimitive.Close>
));
DialogClose.displayName = "DialogClose";

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
});
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { ["aria-describedby"]: ariaDesc, ...rest } = props;
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed inset-4 z-50 grid w-full gap-4 rounded-lg border p-6 shadow-lg duration-200 max-w-[min(1400px,95vw)] mx-auto my-6 max-h-[95vh] overflow-hidden",
          className,
        )}
        {...(ariaDesc ? { ["aria-describedby"]: ariaDesc } : {})}
        {...rest}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = "DialogContent";

// Fullscreen variant for large complex modals
const DialogContentFullscreen = React.forwardRef(({ className, children, ...props }, ref) => {
  const { ["aria-describedby"]: ariaDesc, ...rest } = props;
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content-fullscreen"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-50 grid w-full h-full gap-4 rounded-none p-6 shadow-lg duration-200 overflow-hidden",
          className,
        )}
        {...(ariaDesc ? { ["aria-describedby"]: ariaDesc } : {})}
        {...rest}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContentFullscreen.displayName = "DialogContentFullscreen";

const DialogHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="dialog-header"
    className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="dialog-footer"
    className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} data-slot="dialog-title" className={cn("text-lg leading-none font-semibold", className)} {...props} />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} data-slot="dialog-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogContentFullscreen,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};