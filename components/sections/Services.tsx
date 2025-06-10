"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, ShirtIcon, Car, Sparkles, Users, Camera, Music } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: CalendarDays,
      title: "婚礼策划",
      englishTitle: "Wedding Planning",
      description: "专业团队为您量身定制完美婚礼方案，从创意到执行全程无忧",
      features: ["个性化策划", "全程跟踪", "专业团队", "创意方案"],
      color: "text-wedding-primary",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50"
    },
    {
      icon: MapPin,
      title: "场地布置",
      englishTitle: "Venue Setup",
      description: "精美场地布置设计，打造梦幻浪漫的婚礼现场氛围",
      features: ["梦幻布置", "鲜花装饰", "灯光设计", "主题定制"],
      color: "text-wedding-secondary",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50"
    },
    {
      icon: ShirtIcon,
      title: "婚纱礼服",
      englishTitle: "Wedding Dress",
      description: "精选国际品牌婚纱礼服，让新娘在最重要的日子光彩夺目",
      features: ["品牌婚纱", "量身定制", "配饰齐全", "专业搭配"],
      color: "text-wedding-accent",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50"
    },
    {
      icon: Car,
      title: "婚车服务",
      englishTitle: "Wedding Transport",
      description: "豪华婚车队伍，专业司机服务，为您的婚礼增添尊贵体验",
      features: ["豪华车队", "专业司机", "装饰服务", "准时到达"],
      color: "text-gray-600",
      bgColor: "bg-gradient-to-br from-gray-50 to-slate-50"
    }
  ];

  const additionalServices = [
    { icon: Camera, name: "婚礼摄影" },
    { icon: Music, name: "音响设备" },
    { icon: Sparkles, name: "化妆造型" },
    { icon: Users, name: "司仪主持" }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-wedding-primary text-wedding-primary">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-5xl font-header font-bold text-wedding-dark mb-6">
            专业婚庆服务
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            从策划到执行，从创意到细节，我们为您提供全方位的专业婚庆服务，让您的婚礼成为永恒的美好回忆
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-wedding-secondary border-2 ${service.bgColor} overflow-hidden`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-header font-semibold text-wedding-dark mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 font-medium">
                    {service.englishTitle}
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex}
                        variant="secondary"
                        className="text-xs bg-white/80 text-gray-700"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="bg-wedding-light rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark text-center mb-8">
            更多专业服务
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center p-4 rounded-xl bg-white/60 hover:bg-white hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-wedding-primary/10 flex items-center justify-center mb-3 group-hover:bg-wedding-primary/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-wedding-primary" />
                  </div>
                  <span className="text-sm font-medium text-wedding-dark text-center">
                    {service.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              想了解更多服务详情？
            </p>
            <a 
              href="tel:13800138000"
              className="inline-flex items-center bg-wedding-primary text-white px-6 py-3 rounded-full hover:bg-wedding-accent transition-colors duration-300 font-medium"
            >
              立即咨询更多服务
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 