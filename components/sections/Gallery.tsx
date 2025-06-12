"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause, Heart, Eye, Calendar, Maximize, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { YuanfenIcon } from "@/components/ui/icons/iconify-icons";
import prefix from "@/lib/prefix";

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);
  const [imageSources, setImageSources] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<boolean[]>([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const galleryItems = useMemo(() => [
    {
      image: "https://img.picui.cn/free/2025/06/12/684a9050ae79a.jpg",
      fallbackImage: `${prefix}/garden-wedding.jpg`,
      title: "Garden Wedding",
      date: "2023.05.20",
      description: "户外花园主题婚礼",
      details: "在绿意盎然的花园中举办的浪漫婚礼，鲜花装饰与自然景观完美融合"
    },
    {
      image: "https://img.picui.cn/free/2025/06/12/684a917683ca1.jpg",
      fallbackImage: `${prefix}/wedding-ring.jpg`,
      title: "Church Ceremony",
      date: "2023.04.15",
      description: "神圣教堂婚礼仪式",
      details: "庄严神圣的教堂婚礼，见证新人在上帝面前许下永恒誓言"
    },
    {
      image: "https://img.picui.cn/free/2025/06/12/684a9050780c5.jpg",
      fallbackImage: `${prefix}/beach-wedding.jpg`,
      title: "Beach Wedding",
      date: "2023.06.08",
      description: "浪漫海滩婚礼",
      details: "在碧海蓝天下举行的海滨婚礼，浪漫与自由并存的完美仪式"
    },
    {
      image: "https://img.picui.cn/free/2025/06/12/684a917689a96.jpeg",
      fallbackImage: `${prefix}/grand-ballroom-wedding.jpeg`,
      title: "Grand Ballroom",
      date: "2023.03.25",
      description: "豪华酒店宴会厅",
      details: "奢华典雅的宴会厅婚礼，金碧辉煌的装饰营造完美仪式感"
    },
    {
      image: "https://img.picui.cn/free/2025/06/12/684a917697e12.jpg",
      fallbackImage: `${prefix}/villa-wedding.jpg`,
      title: "Villa Wedding",
      date: "2023.07.12",
      description: "别墅庭院婚礼",
      details: "私密温馨的别墅庭院婚礼，亲朋好友齐聚共同见证幸福时刻"
    },
    {
      image: `${prefix}/traditional-chinese-wedding.jpeg`,
      fallbackImage: `${prefix}/traditional-chinese-wedding.avif`,
      title: "Traditional Chinese",
      date: "2023.08.18",
      description: "中式传统婚礼",
      details: "传承千年的中式传统婚礼，红色主调彰显喜庆与祝福"
    }
  ], []);

  // Initialize image states
  useEffect(() => {
    setImageLoaded(new Array(galleryItems.length).fill(false));
    setImageErrors(new Array(galleryItems.length).fill(false));
    setImageSources(galleryItems.map(item => item.image));
  }, [galleryItems]);

  // Auto-rotate slides
  useEffect(() => {
    if (!isPlaying || isFullscreen) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, isFullscreen, galleryItems.length]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isFullscreen, isPlaying, nextSlide, prevSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    setImageErrors(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  const handleImageError = (index: number) => {
    const currentSrc = imageSources[index];
    const fallbackSrc = galleryItems[index].fallbackImage;
    
    if (currentSrc !== fallbackSrc) {
      // Try fallback image
      setImageSources(prev => {
        const newState = [...prev];
        newState[index] = fallbackSrc;
        return newState;
      });
      setImageErrors(prev => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
      console.warn(`Gallery image ${galleryItems[index].title} failed to load, trying fallback`);
    } else {
      // Both primary and fallback failed
      setImageErrors(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
      console.error(`Gallery image ${galleryItems[index].title} failed to load (both primary and fallback)`);
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gradient-to-br from-wedding-light/30 via-white to-wedding-light/20">
      {/* Debug info - remove in production */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 left-4 z-50 bg-black/80 text-white p-2 rounded text-xs max-w-sm">
          <div className="font-semibold mb-2">Gallery Debug Info:</div>
          <div>Current Slide: {currentSlide + 1}/{galleryItems.length}</div>
          <div>Current Image: {imageSources[currentSlide] || 'loading...'}</div>
          <div>Image Loaded: {imageLoaded[currentSlide] ? '✅' : '❌'}</div>
          <div>Image Error: {imageErrors[currentSlide] ? '❌' : '✅'}</div>
        </div>
      )} */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-wedding-accent text-wedding-accent animate-fade-in-up">
            Our Work
          </Badge>
          <h2 className="text-3xl md:text-5xl font-header font-bold text-wedding-dark mb-6 animate-fade-in-up">
            精彩案例展示
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            每一场婚礼都是独一无二的故事，让我们用镜头记录下这些珍贵的幸福时刻
          </p>
        </div>

        {/* Enhanced Main Gallery Slider */}
        <div className="relative max-w-5xl mx-auto mb-8">
          <div 
            ref={slideRef}
            className="relative aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 group"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Image Container */}
            <div className="relative w-full h-full">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000",
                    index === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
                  )}
                >
                  {/* Loading skeleton */}
                  {!imageLoaded[index] && !imageErrors[index] && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-400/20 to-transparent" />
                    </div>
                  )}
                  
                  {/* Error fallback */}
                  {imageErrors[index] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-wedding-light/50 to-wedding-light/30 flex items-center justify-center">
                      <div className="text-center text-wedding-dark">
                        <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm opacity-70">图片加载中...</p>
                      </div>
                    </div>
                  )}
                  
                  <Image
                    src={imageSources[index] || item.image}
                    alt={item.title}
                    fill
                    className={cn(
                      "object-cover transition-all duration-700",
                      imageLoaded[index] && !imageErrors[index] ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    loading="lazy"
                    fetchPriority="low"
                  />
                  
                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Enhanced Caption */}
                  <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-header font-semibold mb-2 flex items-center gap-3">
                          <Heart className="w-6 h-6 text-wedding-secondary" fill="currentColor" />
                          {item.title}
                        </h3>
                        <p className="text-wedding-secondary font-medium mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {item.date}
                        </p>
                        <p className="text-white/90 text-sm md:text-base">
                          {item.description}
                        </p>
                        <p className="text-white/70 text-sm mt-2 hidden md:block">
                          {item.details}
                        </p>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setIsFullscreen(true)}
                          size="sm"
                          variant="ghost"
                          className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                        >
                                                     <Maximize className="w-4 h-4 mr-2" />
                          查看大图
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white border-0 z-30 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white border-0 z-30 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Enhanced Control Panel */}
            <div className="absolute top-4 right-4 flex gap-2 z-30">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm font-medium">
                {currentSlide + 1} / {galleryItems.length}
              </div>
            </div>

            {/* Touch indicator for mobile */}
            <div className="absolute bottom-4 right-4 md:hidden bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
              👈 滑动切换
            </div>
          </div>

          {/* Enhanced Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  index === currentSlide
                    ? "w-8 h-3 bg-wedding-primary scale-125"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-110"
                )}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Thumbnails Grid */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-wedding-dark mb-6 text-center flex items-center justify-center gap-2">
            <Eye className="w-5 h-5 text-wedding-primary" />
            更多精彩瞬间
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group",
                  index === currentSlide
                    ? "ring-4 ring-wedding-primary scale-105 shadow-lg"
                    : "hover:scale-105 hover:shadow-lg"
                )}
              >
                <Image
                  src={imageSources[index] || item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 16vw, 200px"
                />
                <div className={cn(
                  "absolute inset-0 transition-colors duration-300",
                  index === currentSlide
                    ? "bg-wedding-primary/20"
                    : "bg-black/20 hover:bg-black/10"
                )} />
                
                {/* Thumbnail overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Eye className="w-4 h-4 text-wedding-dark" />
                  </div>
                </div>
                
                {/* Current indicator */}
                {index === currentSlide && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-wedding-primary rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center bg-gradient-to-r from-wedding-light/50 to-wedding-light/30 rounded-2xl p-8 md:p-12">
          <div className="flex items-center justify-center mx-auto mb-6">
            <YuanfenIcon className="w-12 h-12 text-wedding-primary animate-pulse" />
          </div>
          <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark mb-4">
            想要了解更多案例详情？
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            每一场婚礼都有独特的故事，我们用专业的镜头记录下每一个珍贵瞬间。
            联系我们了解更多案例或预约实地参观。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:13800138000"
              className="group bg-gradient-to-r from-wedding-primary to-wedding-accent text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:scale-105"
            >
              <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
              联系我们看更多案例
            </a>
            <button
              className="group border-2 border-wedding-secondary text-wedding-secondary hover:bg-wedding-secondary hover:text-white px-8 py-4 rounded-full transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:scale-105"
              onClick={scrollToContact}
            >
              <Calendar className="w-5 h-5" />
              预约实地参观
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-full">
            <Image
              src={imageSources[currentSlide] || galleryItems[currentSlide].image}
              alt={galleryItems[currentSlide].title}
              fill
              className="object-contain"
              sizes="100vw"
            />
            
            {/* Fullscreen controls */}
            <Button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
              size="icon"
            >
              <X className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
              size="icon"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
              size="icon"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Fullscreen info */}
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <h3 className="text-xl font-semibold mb-2">{galleryItems[currentSlide].title}</h3>
              <p className="text-sm opacity-80">{galleryItems[currentSlide].details}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 