import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import manifest from "@maslow-ai/brand-os/manifest";
import { actionTheme, brandVersion, tokens } from "@maslow-ai/brand-os/tokens";
import { describe, expect, it } from "vitest";

const lock = JSON.parse(readFileSync("brand-os.lock.json", "utf8")) as {
  version: string;
  sourceHashes: Record<string, string>;
  assetHashes: Record<string, string>;
};

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

describe("Brand OS consumer contract", () => {
  it("pins one version and source hash set", () => {
    expect(brandVersion).toBe("1.0.0");
    expect(tokens.version).toBe(brandVersion);
    expect(manifest.version).toBe(brandVersion);
    expect(lock.version).toBe(brandVersion);
    expect(lock.sourceHashes).toEqual(manifest.sourceHashes);
  });

  it("inherits action and radius policy through compatibility variables", () => {
    expect(actionTheme).toMatchObject({
      primary: "#192332",
      primaryInk: "#FFFFFF",
      inverse: "#FFFFFF",
      inverseInk: "#192332",
      signal: "#EE7BB3",
      link: "#9D4B8E",
      focus: "#401877",
    });
    expect(tokens.radius.structural).toBe("0px");
    const globals = readFileSync(join("app", "globals.css"), "utf8");
    expect(globals).toContain('@import "@maslow-ai/brand-os/tokens.css";');
    expect(globals).toMatch(/--color-action-primary:\s*var\(--maslow-action-primary\)/);
    expect(globals).toMatch(/--radius-structural:\s*var\(--maslow-radius-structural\)/);
  });

  it("keeps every public Maslow logo byte-identical to the approved asset", () => {
    for (const [name, expected] of Object.entries(manifest.assetHashes)) {
      if (!name.endsWith(".svg")) continue;
      expect(lock.assetHashes[name]).toBe(expected);
      expect(sha256(join("public", "assets", name))).toBe(expected);
    }
  });
});
