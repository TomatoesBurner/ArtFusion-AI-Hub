import React from "react";

export default function VideoPage() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
