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
          background: "#0f0f0d",
          color: "#f3f0e8",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, letterSpacing: "0.16em", textTransform: "uppercase", color: "#b3ad9f" }}>
              Amateur
            </div>
            <div style={{ fontSize: 120, lineHeight: 0.86, letterSpacing: "-0.05em", marginTop: 16 }}>
              DJ TY
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
