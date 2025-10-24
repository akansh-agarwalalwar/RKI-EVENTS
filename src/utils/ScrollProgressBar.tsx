import React, { useState, useEffect } from "react";

export function ScrollProgressBar() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(docHeight > 0 ? (scrolled / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-rose via-gold to-rose transition-all duration-300"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
}
