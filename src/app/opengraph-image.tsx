import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { portfolio } from "@/content";

// Social preview card for link shares (LinkedIn, WhatsApp, X). Rendered once
// at build time from data.json, in the light-mode brand palette.
export const alt = `${portfolio.profile.name}: ${portfolio.profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { profile } = portfolio;
  const svg = await readFile(join(process.cwd(), "public/brand/logomark.svg"), "utf8");
  const logomark = `data:image/svg+xml;base64,${Buffer.from(
    svg.replaceAll("currentColor", "#2176AE")
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#FDFDFD",
          color: "#0F1C2E",
          borderTop: "14px solid #89CFF0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
          <img src={logomark} width={82} height={66} alt="" />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {profile.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.045em",
              maxWidth: 940,
            }}
          >
            {profile.headline}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#5A6B7F", maxWidth: 940 }}>
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#2176AE",
            fontWeight: 700,
          }}
        >
          <span>{profile.location}</span>
          <span>{profile.availability}</span>
        </div>
      </div>
    ),
    size
  );
}
