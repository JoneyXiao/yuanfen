"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, Star, HandHeart } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneIcon } from "@/components/ui/icons/iconify-icons";
import prefix from "@/lib/prefix";

const HeroBanner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  // const [imageSrc, setImageSrc] = useState(`${prefix}/home-bg.avif`);
  const [imageSrc, setImageSrc] = useState("https://img.picui.cn/free/2025/06/12/684a6b175cb54.jpg");
  const [isClient, setIsClient] = useState(false);
  const [textAnimated, setTextAnimated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Trigger text animation immediately for better loading performance
    const timer = setTimeout(() => setTextAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100" data-lcp-section="true">
      {/* Debug info - remove in production */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
          <div>Image Src: {imageSrc}</div>
          <div>Image Loaded: {imageLoaded ? '✅' : '❌'}</div>
          <div>Image Error: {imageError ? '❌' : '✅'}</div>
        </div>
      )} */}

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="Romantic Wedding Scene - Hero Background"
          fill
          priority
          className={cn(
            "object-cover transition-all duration-1000",
            imageLoaded && !imageError ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          sizes="100vw"
          onLoad={() => {
            setImageLoaded(true);
            setImageError(false);
          }}
          onError={() => {
            if (imageSrc.includes("img.picui.cn")) {
              // Try fallback to local image
              setImageSrc(`${prefix}/home-bg.jpg`);
              setImageError(false);
              console.warn('External image failed to load, trying local fallback');
            } else {
              setImageError(true);
              setImageLoaded(false);
              console.error('Failed to load hero background image');
            }
          }}
        />
        {/* Fallback background color in case image fails to load */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-wedding-primary via-wedding-secondary to-wedding-primary" />
        )}
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Floating Elements Animation */}
      {isClient && (
        <>
          {/* Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={`heart-${i}`}
                className="absolute animate-petal-fall opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${12 + Math.random() * 6}s`
                }}
              >
                <Heart 
                  className="text-pink-200 w-3 h-3 md:w-5 md:h-5" 
                  fill="currentColor" 
                />
              </div>
            ))}
          </div>

          {/* Floating Sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute animate-sparkle opacity-30"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: `${4 + Math.random() * 2}s`
                }}
              >
                <Sparkles className="text-yellow-200 w-4 h-4 md:w-6 md:h-6" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 md:space-y-8">
          {/* Enhanced Badge */}
          <div className={cn(
            "inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white transition-all duration-1000 delay-300",
            textAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-medium">十二年专业婚庆策划经验</span>
          </div>

          {/* Main Headline with staggered animation */}
          <div className="space-y-2 md:space-y-4">
            <h1 className={cn(
              "text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-header font-bold text-white leading-tight transition-all duration-1000 delay-500",
              textAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              Create Unforgettable
            </h1>
            <h1 className={cn(
              "text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-header font-bold leading-tight transition-all duration-1000 delay-700",
              textAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="bg-gradient-to-r from-wedding-secondary via-pink-300 to-wedding-primary bg-clip-text text-transparent">
                Lifetime Moments
              </span>
            </h1>
          </div>

          {/* Enhanced Subheadline */}
          <p className={cn(
            "text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-900",
            textAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            从梦想到现实，我们为您打造独一无二的完美婚礼
            <br />
            <span className="text-base sm:text-lg text-white/70 mt-2 block">
              让每一个细节都诉说着您的爱情故事
            </span>
          </p>

          {/* Enhanced CTA Buttons */}
          <div className={cn(
            "flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 transition-all duration-1000 delay-1100",
            textAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="w-full sm:w-auto bg-white text-wedding-primary hover:bg-white/95 hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold px-8 py-6 text-lg rounded-full shadow-xl group min-h-[56px]"
            >
              <Heart className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
              免费咨询方案
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="tel:13800138000"
                className="flex items-center justify-center gap-2 bg-wedding-primary/20 backdrop-blur-sm border border-white/30 text-white hover:bg-wedding-primary/30 hover:scale-105 transition-all duration-300 font-semibold px-6 py-4 text-base rounded-full min-h-[56px]"
              >
                <PhoneIcon className="w-5 h-5" />
                138-0013-8000
              </a>
              <a
                onClick={scrollToServices}
                className="flex items-center justify-center gap-2 backdrop-blur-sm border border-white/30 text-white hover:text-wedding-primary hover:scale-105 transition-all duration-300 font-semibold px-6 py-4 text-base rounded-full min-h-[56px]"
              >
                <HandHeart className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                查看服务
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className={cn(
            "flex flex-wrap justify-center items-center gap-6 pt-8 text-white/70 text-sm transition-all duration-1000 delay-1300",
            textAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-wedding-secondary" fill="currentColor" />
              <span>1000+ 对新人选择</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>100% 满意保证</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span>5星级服务体验</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator - Hidden on mobile, positioned at bottom of section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block z-20">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-center justify-center hover:border-white/60 transition-colors cursor-pointer" onClick={scrollToServices}>
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
          <p className="text-white/60 text-xs font-medium text-center">探索更多</p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner; 