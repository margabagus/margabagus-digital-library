
import React from "react";
import PWAInstallPrompt from "./PWAInstallPrompt";
import ConnectionStatus from "./ConnectionStatus";

const PWAManager: React.FC = () => {
  return (
    <>
      <PWAInstallPrompt />
      <ConnectionStatus />
    </>
  );
};

export default PWAManager;
