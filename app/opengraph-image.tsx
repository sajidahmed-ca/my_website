import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — illustrated stickers`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Built from the same tokens as the site so the OG image
 * never drifts from the brand.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf7f1",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: "#c8402f" }} />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", color: "#1a1614" }}>
            {site.wordmark}
            <span style={{ color: "#c8402f" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "#1a1614",
            }}
          >
            Cities, culture &amp; stories turned into stickers.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#5f564f" }}>
            {site.role} · Illustrated sticker shop
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["#c8402f", "#2f7d74", "#d9a521", "#8a6a95", "#7d8f6a"].map((colour) => (
            <div key={colour} style={{ width: 84, height: 14, borderRadius: 7, background: colour }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}