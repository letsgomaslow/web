#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(process.argv[2] || join(root, "../Maslow Design System"));
const sourcePackage = JSON.parse(readFileSync(join(source, "package.json"), "utf8"));
const sourceDist = join(source, "dist/npm");
const destination = join(root, "vendor/maslow-brand-os");

if (!existsSync(join(sourceDist, "manifest.json"))) {
  throw new Error(`Build Brand OS before syncing: ${sourceDist}`);
}

rmSync(destination, { recursive: true, force: true });
mkdirSync(destination, { recursive: true });
cpSync(sourceDist, destination, { recursive: true });

const vendorPackage = {
  name: "@maslow-ai/brand-os",
  version: sourcePackage.version,
  type: "module",
  sideEffects: ["./tokens.css"],
  exports: {
    "./tokens.css": "./tokens.css",
    "./tokens": { types: "./tokens.d.ts", import: "./tokens.js" },
    "./assets/*": "./assets/*",
    "./manifest": { types: "./manifest.d.ts", default: "./manifest.json" },
  },
};
writeFileSync(join(destination, "package.json"), JSON.stringify(vendorPackage, null, 2) + "\n");
writeFileSync(join(destination, "manifest.d.ts"), `declare const manifest: {
  packageName: string;
  version: string;
  contractVersion: string;
  sourceHashes: Record<string, string>;
  assetHashes: Record<string, string>;
};
export default manifest;
`);

const manifest = JSON.parse(readFileSync(join(destination, "manifest.json"), "utf8"));
const lock = {
  package: sourcePackage.name,
  version: sourcePackage.version,
  activeDependency: "file:vendor/maslow-brand-os",
  releaseDependency: `github:letsgomaslow/mai-design-system#v${sourcePackage.version}`,
  sourceHashes: manifest.sourceHashes,
  assetHashes: manifest.assetHashes,
};
writeFileSync(join(root, "brand-os.lock.json"), JSON.stringify(lock, null, 2) + "\n");
console.log(`Synced ${sourcePackage.name} ${sourcePackage.version} into vendor/maslow-brand-os`);
