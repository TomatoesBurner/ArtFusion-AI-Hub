import React from "react";
import { Container } from "@mui/material";
import Settings from "@/views/Settings/SettingView";

const SettingsPage: React.FC = () => {
  const handleClose = () => {
    // 在这里处理关闭设置视图的逻辑，例如重定向到其他页面或关闭模态框
    console.log("Settings closed");
  };

  return <Settings onClose={handleClose} />;
};

export default SettingsPage;
