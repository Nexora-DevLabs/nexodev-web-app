/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export const alt = "Nexora DevLabs - Building smart. Shipping fast.";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0F2A3F 0%, #1EB5BF 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "#1EB5BF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              N
            </span>
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Nexora DevLabs
          </span>
        </div>

        {/* Main text */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            margin: "0 0 20px 0",
            lineHeight: 1.1,
          }}
        >
          Build smart.
          <br />
          Ship fast.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "28px",
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            margin: "0",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          We craft lean, modern software for teams who value clarity, velocity,
          and reliability.
        </p>
      </div>
    ),
    {
      ...size,
    },
  );
}
