"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, ShirtIcon, Car, Sparkles, Users, Camera, Music, ArrowRight, CheckCircle, Star, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { YuanfenIcon } from "@/components/ui/icons/iconify-icons";

const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: CalendarDays,
      title: "婚礼策划",
      englishTitle: "Wedding Planning",
      description: "专业团队为您量身定制完美婚礼方案，从创意到执行全程无忧",
      features: ["个性化策划", "全程跟踪", "专业团队", "创意方案"],
      color: "text-pink-600",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
      borderColor: "border-pink-200",
      accentColor: "bg-pink-500",
      details: "从初步构思到完美执行，我们为每对新人提供个性化的婚礼策划服务。专业策划师将深入了解您的需求，为您打造独一无二的婚礼体验。"
    },
    {
      icon: MapPin,
      title: "场地布置",
      englishTitle: "Venue Setup",
      description: "精美场地布置设计，打造梦幻浪漫的婚礼现场氛围",
      features: ["梦幻布置", "鲜花装饰", "灯光设计", "主题定制"],
      color: "text-amber-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
      borderColor: "border-amber-200",
      accentColor: "bg-amber-500",
      details: "运用专业的设计理念，结合您的喜好和主题，打造梦幻浪漫的婚礼现场。从鲜花装饰到灯光设计，每一个细节都精心安排。"
    },
    {
      icon: ShirtIcon,
      title: "婚纱礼服",
      englishTitle: "Wedding Dress",
      description: "精选国际品牌婚纱礼服，让新娘在最重要的日子光彩夺目",
      features: ["品牌婚纱", "量身定制", "配饰齐全", "专业搭配"],
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      accentColor: "bg-purple-500",
      details: "精选来自世界各地的知名品牌婚纱，提供专业的试穿和搭配服务。我们的造型师将根据您的身材和喜好，为您选择最完美的婚纱。"
    },
    {
      icon: Car,
      title: "婚车服务",
      englishTitle: "Wedding Transport",
      description: "豪华婚车队伍，专业司机服务，为您的婚礼增添尊贵体验",
      features: ["豪华车队", "专业司机", "装饰服务", "准时到达"],
      color: "text-slate-600",
      bgColor: "bg-gradient-to-br from-slate-50 to-gray-50",
      borderColor: "border-slate-200",
      accentColor: "bg-slate-500",
      details: "提供各类豪华婚车选择，从经典劳斯莱斯到现代奔驰，配备专业司机和精美装饰，确保您的婚礼出行完美无瑕。"
    }
  ];

  const additionalServices = [
    { icon: Camera, name: "婚礼摄影", description: "专业摄影师全程记录", color: "text-blue-600", bgColor: "bg-blue-50" },
    { icon: Music, name: "音响设备", description: "高品质音响系统", color: "text-green-600", bgColor: "bg-green-50" },
    { icon: Sparkles, name: "化妆造型", description: "专业化妆造型师", color: "text-pink-600", bgColor: "bg-pink-50" },
    { icon: Users, name: "司仪主持", description: "经验丰富婚礼司仪", color: "text-orange-600", bgColor: "bg-orange-50" }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-white via-wedding-light/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-wedding-primary text-wedding-primary animate-fade-in-up">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-5xl font-header font-bold text-wedding-dark mb-6 animate-fade-in-up">
            专业婚庆服务
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            从策划到执行，从创意到细节，我们为您提供全方位的专业婚庆服务，让您的婚礼成为永恒的美好回忆
          </p>
        </div>

        {/* Enhanced Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isSelected = selectedService === index;
            const isHovered = hoveredService === index;
            
            return (
              <Card 
                key={index}
                className={cn(
                  "group cursor-pointer transition-all duration-500 border-2 overflow-hidden relative",
                  service.bgColor,
                  isSelected || isHovered 
                    ? `shadow-2xl scale-105 ${service.borderColor}` 
                    : "hover:shadow-xl hover:scale-102 border-gray-200"
                )}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => setSelectedService(isSelected ? null : index)}
              >
                {/* Animated background overlay */}
                <div className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-500",
                  isSelected || isHovered ? "opacity-5" : ""
                )}>
                  <div className={cn("w-full h-full", service.accentColor)} />
                </div>

                <CardHeader className="text-center pb-4 relative z-10">
                  <div className={cn(
                    "mx-auto mb-4 w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-500",
                    "bg-white border-2",
                    isSelected || isHovered ? `scale-110 ${service.borderColor}` : "border-gray-200"
                  )}>
                    <IconComponent className={cn("w-8 h-8 transition-colors duration-300", service.color)} />
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-header font-semibold text-wedding-dark mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 font-medium">
                    {service.englishTitle}
                  </p>
                </CardHeader>

                <CardContent className="text-center relative z-10">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex}
                        variant="secondary"
                        className="text-xs bg-white/80 text-gray-700 hover:bg-white transition-colors duration-200"
                      >
                        <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Expandable details */}
                  <div className={cn(
                    "transition-all duration-500 overflow-hidden",
                    isSelected ? "max-h-32 opacity-100 mb-4" : "max-h-0 opacity-0"
                  )}>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                      {service.details}
                    </div>
                  </div>

                  {/* Action button */}
                  <Button
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "transition-all duration-300 flex items-center gap-2",
                      isSelected 
                        ? "bg-wedding-primary hover:bg-wedding-accent text-white"
                        : "border-gray-300 hover:border-wedding-primary hover:text-wedding-primary"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToContact();
                    }}
                  >
                    {isSelected ? "立即咨询" : "了解更多"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-wedding-primary rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Enhanced Additional Services */}
        <div className="bg-gradient-to-br from-wedding-light/50 via-white/80 to-wedding-light/30 rounded-2xl p-8 md:p-12 border border-wedding-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark mb-4 flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-wedding-secondary" fill="currentColor" />
              更多专业服务
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              除了核心服务外，我们还提供全方位的婚礼相关服务，确保您的婚礼完美无瑕
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="group flex flex-col items-center p-4 md:p-6 rounded-xl bg-white/60 hover:bg-white border border-gray-100 hover:border-wedding-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className={cn(
                    "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300",
                    service.bgColor,
                    "group-hover:scale-110"
                  )}>
                    <IconComponent className={cn("w-6 h-6", service.color)} />
                  </div>
                  <span className="text-sm md:text-base font-medium text-wedding-dark text-center mb-1 group-hover:text-wedding-primary transition-colors duration-300">
                    {service.name}
                  </span>
                  <span className="text-xs text-gray-500 text-center">
                    {service.description}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Enhanced CTA */}
          <div className="text-center">
            <div className="flex items-center justify-center mx-auto mb-4">
              <YuanfenIcon className="w-12 h-12 text-wedding-primary animate-pulse" />
            </div>
            <h4 className="text-xl font-semibold text-wedding-dark mb-4">
              想了解更多服务详情？
            </h4>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              我们的专业团队随时为您提供详细的服务介绍和定制化方案建议
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:13800138000"
                className="group bg-gradient-to-r from-wedding-primary to-wedding-accent text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:scale-105"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                立即咨询更多服务
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={scrollToContact}
                className="group border-2 border-wedding-secondary text-wedding-secondary hover:bg-wedding-secondary hover:text-white px-8 py-4 rounded-full transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                获取定制方案
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 