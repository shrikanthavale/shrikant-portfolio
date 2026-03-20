import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          background: "#0b1220",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 64 64">
          <path
            d="M42 18H31c-4 0-6 2-6 5 0 2.8 1.8 4.3 5.4 5.2l3.4.8c5.3 1.3 8.2 4 8.2 8.5 0 5.4-4.3 8.9-11.4 8.9h-8.6"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
