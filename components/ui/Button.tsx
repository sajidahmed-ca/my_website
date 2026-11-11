import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_10px_24px_-12px_rgba(200,64,47,0.9)] hover:bg-accent-dark hover:shadow-[0_16px_34px_-14px_rgba(200,64,47,0.95)]",
  outline: "border border-line bg-surface text-ink hover:border-ink/30 hover:bg-surface-sunk",
  ghost: "text-ink hover:bg-ink/5",
  ink: "bg-ink text-canvas shadow-[0_10px_24px_-12px_rgba(26,22,20,0.8)] hover:bg-ink-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem] sm:h-[3.25rem] sm:px-7 sm:text-base",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonLinkProps = SharedProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonNativeProps = SharedProps &
  { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = ButtonLinkProps | ButtonNativeProps;

type StyleProps = Pick<SharedProps, "variant" | "size" | "className">;

function classes({ variant = "primary", size = "md", className }: StyleProps) {
  return cn(base, variants[variant], sizes[size], className);
}

function ButtonLink({ variant, size, className, children, href, ...rest }: ButtonLinkProps) {
  return (
    <Link href={href} className={classes({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

function NativeButton({ variant, size, className, children, type = "button", ...rest }: ButtonNativeProps) {
  return (
    <button type={type} className={classes({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

/**
 * One visual button with two real elements: a `<Link>` when `href` is given,
 * otherwise a native `<button>` that keeps its own `type` and handlers.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) return <ButtonLink {...props} />;
  return <NativeButton {...props} />;
}