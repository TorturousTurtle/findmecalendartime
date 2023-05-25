import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-rapdev-cyan to-rapdev-green px-4 py-4">
      <div className="flex items-center">
        <div className="relative w-15 h-15 mr-2 rounded-full overflow-hidden">
          <Image
            src="/calendar-logo.png"
            alt="Calendar Logo"
            width={60}
            height={60}
            layout="fixed"
            style={{ objectFit: "contain" }}
          />
        </div>
        <h1 className="text-white font-bold text-4xl">Calendar Free Time</h1>
      </div>
    </header>
  );
};

export default Header;
