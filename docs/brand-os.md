# Brand OS integration

The website consumes `@maslow-ai/brand-os` as its token and approved-asset authority. Existing `--color-*` variables remain as a compatibility layer and map to generated `--maslow-*` variables in `app/globals.css`.

The repository currently commits a generated package snapshot at `vendor/maslow-brand-os` so local and deployment builds remain reproducible before the Brand OS release tag exists. `brand-os.lock.json` records the source hashes, immutable designer-logo hashes, asset hashes, and the intended `github:letsgomaslow/mai-design-system#v1.1.0` release dependency.

After the Design System release is committed and tagged:

1. Replace the file dependency with the recorded Git dependency.
2. Run `npm install`.
3. Run `npm run brand:check` and the full website verification suite.

For a local update from the sibling Design System repository, first run its build and then run `npm run brand:sync` here. Never edit files under `vendor/maslow-brand-os` by hand.
