import React, { useState } from "react";
import LoginModal from "./LoginModal";
import CreateAccountModal from "./CreateAccountModal";

export default function AuthModalController({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => {
    setIsLogin(true); // Reset to login for next open
    onClose();
  };

  return (
    <>
      {isLogin ? (
        <LoginModal
          onClose={handleClose}
          switchToCreate={() => setIsLogin(false)} // Switch to Create Account
        />
      ) : (
        // This is where you paste the CreateAccountModal
        <CreateAccountModal
          onClose={handleClose}
          switchToLogin={() => setIsLogin(true)} // Switch back to Login
        />
      )}
    </>
  );
}
