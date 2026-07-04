import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0E0F0C",     // oil black-green
        panel: "#1A1D16",    // raised panel
        panel2: "#23271D",   // hover / nested
        rust: "#C24B22",     // rust-oxide accent
        rust2: "#E0632F",    // brighter rust for hover
        olive: "#8B9A46",    // faded military green
        bone: "#E8E4D8",     // primary text
        ash: "#9A9788",      // muted text
        line: "#33372B",     // hairline borders
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { content: "72rem" },
    },
  },
  plugins: [],
};
export default config;
