// src/components/Footer.jsx
"use client";

import React from 'react';

const Footer = () => {
    return (
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
                        <a href="#" className="footer-link">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="footer-link">Terms of Service</a>
                    </li>
                    <li>
                        <a href="#" className="footer-link">Support</a>
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
    );
};

export default Footer;
