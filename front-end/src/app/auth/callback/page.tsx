"use client";

import React, { useEffect, useState } from "react";

const CallbackPage = () => {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setStatus("Success");
          } else {
            setStatus("Failed");
          }
        })
        .catch(() => {
          setStatus("Failed");
        });
    } else {
      setStatus("Failed");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === null && <p>Loading...</p>}
      {status === "Success" && <p>Authentication Successful!</p>}
      {status === "Failed" && <p>Authentication Failed.</p>}
    </div>
  );
};

export default CallbackPage;
