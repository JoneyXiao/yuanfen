"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: "services", label: "服务项目", name: "Services" },
    { id: "gallery", label: "案例展示", name: "Gallery" },
    { id: "about", label: "关于我们", name: "About" },
    { id: "contact", label: "联系我们", name: "Contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <h1 className="text-2xl md:text-3xl font-header font-semibold text-wedding-secondary">
              缘份婚庆
            </h1>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-wedding-dark hover:text-wedding-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            <a 
              href="tel:13800138000"
              className="bg-wedding-primary text-white px-6 py-2 rounded-full hover:bg-wedding-accent transition-colors duration-200 font-medium"
            >
              立即咨询
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-wedding-dark">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] bg-white border-l border-gray-200"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="text-2xl font-header text-wedding-secondary">
                    缘份婚庆
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col mt-8 space-y-6">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-lg font-medium text-wedding-dark hover:text-wedding-primary transition-colors duration-200 py-2"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="pt-6 border-t border-gray-200">
                    <a 
                      href="tel:13800138000"
                      className="flex items-center gap-3 bg-wedding-primary text-white px-6 py-3 rounded-full hover:bg-wedding-accent transition-colors duration-200 font-medium"
                    >
                      <Phone className="h-5 w-5" />
                      立即咨询
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 