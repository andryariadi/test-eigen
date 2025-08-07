"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const NavbarUser = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 z-50 w-full h-[64px] md:h-[5rem] flex items-center ${isScrolled && "backdrop-blur-md shadow-md"} `}>
      <nav className="container mx-auto px-4 md:px-10 lg:px-0 xl:px-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" width={160} height={160} alt="Logo" className="w-[122px] md:w-40" />
        </Link>

        {/* Button Modal Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/avatar.jpg" width={40} height={40} alt="Avatar" className="rounded-full" />
          <span>Andry Ariadi</span>
        </div>
      </nav>
    </header>
  );
};

export default NavbarUser;
