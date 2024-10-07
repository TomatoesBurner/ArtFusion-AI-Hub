import React from "react";
import Profile from "@/components/Profile";

const DashboardProfilePage = () => {
  const handleClose = () => {
    // Logic to handle closing profile, e.g., navigating away
    console.log("Profile closed");
  };

  return <Profile onClose={handleClose} />;
};

export default DashboardProfilePage;
