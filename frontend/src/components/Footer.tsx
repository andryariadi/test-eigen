import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-sky-500 w-full h-[6.5rem] md:h-[4.5rem] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 bg-opacity-90 backdrop-blur-md shadow-lg">
      {/* Logo */}
      <Image src="/logofooter.png" width={140} height={140} alt="Logo" />

      {/* Description */}
      <p className="text-white text-center">&copy; 2023 Eigen Articles. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
