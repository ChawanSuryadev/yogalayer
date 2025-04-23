import React, { useEffect, useRef } from "react";

export default function LoginTooltip({ visible, onClick, dismiss }) {
  const tooltipRef = useRef();

  useEffect(() => {
    const handleDismiss = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        dismiss();
      }
    };
    const handleScroll = () => {
      dismiss();
    };
    document.addEventListener("mousedown", handleDismiss);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleDismiss);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      ref={tooltipRef}
      className="absolute top-[30px] right-1.5 z-50 animate-bob"
    >
      {/* Triangle Pointer */}
      <div className="flex justify-end pr-6">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-blue-600"></div>
      </div>

      {/* Tooltip Box */}
      <div
        onClick={onClick}
        className="bg-blue-600 text-white text-base px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all hover:scale-105 active:scale-95"
        style={{
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
          transform: "translateZ(0)", // slight 3D
        }}
      >
        Login
      </div>
    </div>
  );
}
