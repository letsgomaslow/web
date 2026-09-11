import Image from "next/image";
import { toolBrands, type ToolKey } from "@/lib/content/ai-os-home";
import styles from "./AIOSHome.module.css";

export function ToolMark({
  tool,
  size = 24,
}: {
  tool: ToolKey;
  size?: number;
}) {
  const brand = toolBrands[tool];

  if (!brand.logo) {
    return (
      <span className={styles.textMark} aria-hidden="true">
        {brand.name.slice(0, 1)}
      </span>
    );
  }

  return (
    <Image
      className={styles.toolMark}
      src={brand.logo}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      unoptimized
    />
  );
}
