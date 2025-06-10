"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const HeroBanner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/home-bg.avif"
          alt="Romantic Wedding Scene"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Floating Petals Animation */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-petal-fall opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            >
              <Heart className="text-pink-200 w-4 h-4 md:w-6 md:h-6" fill="currentColor" />
            </div>
          ))}
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white">
            <Heart className="w-4 h-4" fill="currentColor" />
            <span className="text-sm font-medium">Premium Wedding Planning Since 2012</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-header font-bold text-white leading-tight">
            Create Unforgettable
            <br />
            <span className="text-wedding-secondary">Lifetime Moments</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            从梦想到现实，我们为您打造独一无二的完美婚礼
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-white text-wedding-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 font-semibold px-8 py-6 text-lg rounded-full shadow-xl group"
            >
              免费咨询
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <a
              href="tel:13800138000"
              className="bg-wedding-primary/20 backdrop-blur-sm border border-white/30 text-white hover:bg-wedding-primary/30 transition-all duration-300 font-semibold px-8 py-6 text-lg rounded-full"
            >
              立即致电：138-0013-8000
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>


    </section>
  );
};

export default HeroBanner; 