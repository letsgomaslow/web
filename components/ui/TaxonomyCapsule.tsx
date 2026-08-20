import type { ReactNode } from "react";
import styles from "./TaxonomyCapsule.module.css";

export type TaxonomyCapsuleTone =
  | "plum"
  | "gold"
  | "outline"
  | "navy"
  | "soft"
  | "inverse"
  | "illustrative"
  | "teal";

type DataAttributes = Readonly<
  Record<`data-${string}`, string | undefined>
>;

type TaxonomyCapsuleProps = {
  children: ReactNode;
  tone?: TaxonomyCapsuleTone;
  size?: "default" | "compact";
  className?: string;
  data?: DataAttributes;
};

export function TaxonomyCapsule({
  children,
  tone = "outline",
  size = "default",
  className,
  data,
}: TaxonomyCapsuleProps) {
  const classes = className ? `${styles.root} ${className}` : styles.root;

  return (
    <span
      {...data}
      className={classes}
      data-taxonomy-label
      data-tone={tone}
      data-size={size}
    >
      {children}
    </span>
  );
}
