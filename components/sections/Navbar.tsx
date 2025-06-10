"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { YuanfenIcon, PhoneIcon } from "@/components/ui/icons/iconify-icons";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      // Update active section based on scroll position
      const sections = ["hero", "services", "gallery", "about", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    // Check initial scroll position on mount
    handleScroll();

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
    { id: "services", label: "服务项目", name: "Services", icon: Sparkles },
    { id: "gallery", label: "案例展示", name: "Gallery", icon: Heart },
    { id: "about", label: "关于我们", name: "About", icon: Heart },
    { id: "contact", label: "联系我们", name: "Contact", icon: PhoneIcon },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group transition-transform duration-300 hover:scale-105"
            onClick={() => scrollToSection("hero")}
          >
            <div className="flex items-center gap-2">
            <YuanfenIcon className="w-12 h-12 text-wedding-secondary" size={24} />
              <h1 className={cn(
                "text-2xl md:text-3xl font-header font-semibold transition-colors duration-300",
                isScrolled ? "text-wedding-secondary" : "text-white"
              )}>
                缘份婚庆
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105",
                  activeSection === item.id
                    ? "text-wedding-primary bg-wedding-primary/10"
                    : isScrolled
                      ? "text-wedding-dark hover:text-wedding-primary hover:bg-wedding-primary/5"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-wedding-primary rounded-full" />
                )}
              </button>
            ))}
            <a 
              href="tel:13800138000"
              className="ml-4 bg-gradient-to-r from-wedding-primary to-wedding-accent text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium flex items-center gap-2"
            >
              <PhoneIcon className="w-4 h-4" />
              立即咨询
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "relative w-12 h-12 rounded-full transition-all duration-300",
                    isScrolled 
                      ? "text-wedding-dark hover:bg-wedding-primary/10" 
                      : "text-white hover:bg-white/10"
                  )}
                >
                  <Menu className="h-6 w-6 transition-transform duration-300" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[320px] bg-white/95 backdrop-blur-xl border-l border-gray-200/50 p-0"
              >
                <div className="h-full flex flex-col">
                  <SheetHeader className="p-6 border-b border-gray-100">
                    <SheetTitle className="flex items-center gap-3 text-left">
                      <YuanfenIcon className="w-12 h-12 text-wedding-secondary" size={24} />
                      <span className="text-2xl font-header text-wedding-secondary">
                        缘份婚庆
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <nav className="flex-1 p-6">
                    <div className="space-y-2">
                      {navItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={cn(
                              "w-full flex items-center gap-4 p-4 rounded-xl font-medium transition-all duration-300 text-left group",
                              activeSection === item.id
                                ? "bg-wedding-primary/10 text-wedding-primary"
                                : "text-wedding-dark hover:bg-wedding-primary/5 hover:text-wedding-primary"
                            )}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                              activeSection === item.id
                                ? "bg-wedding-primary text-white"
                                : "bg-gray-100 text-gray-400 group-hover:bg-wedding-primary/20 group-hover:text-wedding-primary"
                            )}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-lg">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </nav>

                  <div className="p-6 border-t border-gray-100">
                    <a 
                      href="tel:13800138000"
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-wedding-primary to-wedding-accent text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-sm"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      立即咨询 138-0013-8000
                    </a>
                    <p className="text-center text-sm text-gray-500 mt-4">
                      24小时专业婚庆咨询服务
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 