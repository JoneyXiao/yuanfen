"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const galleryItems = [
    {
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      title: "Garden Wedding",
      date: "2023.05.20",
      description: "户外花园主题婚礼"
    },
    {
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Church Ceremony",
      date: "2023.04.15",
      description: "神圣教堂婚礼仪式"
    },
    {
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2123&q=80",
      title: "Beach Wedding",
      date: "2023.06.08",
      description: "浪漫海滩婚礼"
    },
    {
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2108&q=80",
      title: "Grand Ballroom",
      date: "2023.03.25",
      description: "豪华酒店宴会厅"
    },
    {
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Villa Wedding",
      date: "2023.07.12",
      description: "别墅庭院婚礼"
    },
    {
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Traditional Chinese",
      date: "2023.08.18",
      description: "中式传统婚礼"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, galleryItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-wedding-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-wedding-accent text-wedding-accent">
            Our Work
          </Badge>
          <h2 className="text-3xl md:text-5xl font-header font-bold text-wedding-dark mb-6">
            精彩案例展示
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            每一场婚礼都是独一无二的故事，让我们用镜头记录下这些珍贵的幸福时刻
          </p>
        </div>

        {/* Main Gallery Slider */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            {/* Image Container */}
            <div className="relative w-full h-full">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Caption */}
                  <div className="absolute bottom-6 left-6 text-white z-20">
                    <h3 className="text-2xl md:text-3xl font-header font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-wedding-secondary font-medium mb-1">
                      {item.date}
                    </p>
                    <p className="text-white/90">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 z-30"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 z-30"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-0 z-30"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-wedding-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails Grid */}
        <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-4">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                index === currentSlide
                  ? "ring-4 ring-wedding-primary scale-105"
                  : "hover:scale-105 hover:shadow-lg"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            想要了解更多案例详情或预约实地参观？
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:13800138000"
              className="bg-wedding-primary text-white px-8 py-3 rounded-full hover:bg-wedding-accent transition-colors duration-300 font-medium"
            >
              联系我们看更多案例
            </a>
            <Button
              variant="outline"
              className="border-wedding-secondary text-wedding-secondary hover:bg-wedding-secondary hover:text-white px-8 py-3 rounded-full"
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              预约实地参观
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery; 