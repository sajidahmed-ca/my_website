import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-config-next 15 still ships eslintrc-style presets, so bridge them into
// the flat config that ESLint 9 expects.
const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/**",
      "scripts/**",
      "next.config.ts",
    ],
  },
  {
    rules: {
      // Artwork is served as SVG and every <img> is the Next Image component.
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;