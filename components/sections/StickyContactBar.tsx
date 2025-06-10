"use client";

import { Phone, MessageCircle, Heart, Copy, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const StickyContactBar = () => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const copyWeChatId = async () => {
    try {
      await navigator.clipboard.writeText("yuanfen_hunqing");
      setCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      console.log("Clipboard not supported" + err);
    }
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-in-out",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
      {/* Background with blur effect */}
      <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl">
        <div className="flex">
          {/* WeChat Button */}
          <button
            onClick={copyWeChatId}
            className="flex-1 flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 border-r border-gray-200/50 group relative overflow-hidden"
            style={{ minHeight: '72px' }}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-700" />
            
            <div className="relative z-10 flex flex-col items-center">
              {copied ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600 mb-1 animate-in zoom-in duration-200" />
                  <span className="text-xs font-medium text-green-600 animate-in fade-in duration-200">
                    已复制微信号
                  </span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1 mb-1">
                    <MessageCircle className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                    <Copy className="w-3 h-3 text-green-500 opacity-60" />
                  </div>
                  <span className="text-xs font-medium text-green-700">
                    微信咨询
                  </span>
                  <span className="text-xs text-green-600 opacity-80 mt-0.5">
                    yuanfen_hunqing
                  </span>
                </>
              )}
            </div>
          </button>

          {/* Call Button */}
          <a
            href="tel:13800138000"
            className="flex-1 flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-br from-wedding-primary to-wedding-accent hover:from-wedding-accent hover:to-wedding-primary transition-all duration-300 text-white group relative overflow-hidden"
            style={{ minHeight: '72px' }}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-700" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <Phone className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                <Heart className="w-3 h-3 animate-pulse" fill="currentColor" />
              </div>
              <span className="text-xs font-medium">
                立即致电
              </span>
              <span className="text-xs opacity-90 mt-0.5">
                138-0013-8000
              </span>
            </div>
          </a>
        </div>

        {/* Success indicator for copied WeChat */}
        {copied && (
          <div className="absolute -top-12 left-1/4 transform -translate-x-1/2 bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg animate-in slide-in-from-bottom-2 duration-300">
            微信号已复制到剪贴板
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600" />
          </div>
        )}

        {/* Floating hearts animation on tap */}
        <div className="absolute inset-0 pointer-events-none">
          {/* These would be dynamically generated on touch */}
        </div>
      </div>

      {/* Safe area padding for newer phones */}
      <div className="bg-white/95 backdrop-blur-lg h-safe-area-inset-bottom" />
    </div>
  );
};

export default StickyContactBar; 