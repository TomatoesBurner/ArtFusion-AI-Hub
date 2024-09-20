"use client";
import React from "react";

export default function VideoPage() {
  return (
    <div style={{ width: "100%", height: "300vh" }}>
      {/* First Section: Video with text overlay */}
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

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            Tools for Human Imagination
          </h1>
          <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
            Fast and controllable tools that allow you to create high-fidelity
            content in a way that’s never been possible before.
          </p>
          <a
            href="/login"
            style={{
              padding: "1rem 2rem",
              fontSize: "1.25rem",
              color: "#fff",
              backgroundColor: "#000",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Try ArtFusion Now
          </a>
        </div>
      </div>

      {/* Second Section: Large title, subtitle, and a new video */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5rem 0",
          textAlign: "center",
          color: "#333",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "3rem",  marginTop: "3rem" }}>
          Generate Anything
        </h1>
        <p style={{ fontSize: "1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
          We import advanced AI tool APIs allowing you to explore ideas in near
          real-time, using the most advanced text-to-image and text-to-video
          generation models ever.
        </p>
      </div>
      {/* Third Section: Large title */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem 0",
          textAlign: "center",
          color: "#333",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "3rem" }}>
          Execution is the new ideation.

        </h1>
        
      </div>

      {/* Second video without text */}
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
          <source src="/videos/background2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      
     {/* Footer */}
<footer
  style={{
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    padding: "1rem 0",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 2rem" }}>
    <a
      href="mailto:info@artfusion.com"
      style={{
        fontSize: "1rem",
        color: "#FFFFFF",
        textDecoration: "none",
        borderBottom: "2px solid #FFFFFF",
        paddingBottom: "0.2rem",
        transition: "border-color 0.3s",
      }}
      className="contact-link"
    >
      Contact Us: info@artfusion.com
    </a>
    <ul
      style={{
        listStyleType: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        gap: "2rem",
      }}
    >
      <li>
        <a
          href="#"
          className="footer-link"
        >
          Privacy Policy
        </a>
      </li>
      <li>
        <a
          href="#"
          className="footer-link"
        >
          Terms of Service
        </a>
      </li>
      <li>
        <a
          href="#"
          className="footer-link"
        >
          Support
        </a>
      </li>
    </ul>
  </div>

  <p style={{ fontSize: "0.7rem", marginTop: "0.8rem" }}>
    © 2024 GTL ArtFusion. All rights reserved.
  </p>

  {/* Add CSS styles for hover effects */}
  <style jsx>{`
    .contact-link:hover {
      border-color: #FFD700;
    }
    .footer-link {
      color: #FFFFFF;
      text-decoration: none;
      transition: color 0.3s;
    }
    .footer-link:hover {
      color: #FFD700;
    }
  `}</style>
</footer>



    </div>
  );
}
