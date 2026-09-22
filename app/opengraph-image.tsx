import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "DJ TY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f0eeeb",
          color: "#111111",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, color: "#5c5854" }}>Bedroom DJ</div>
            <div style={{ fontSize: 120, lineHeight: 0.9, letterSpacing: "-0.01em", marginTop: 16 }}>DJ TY</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
