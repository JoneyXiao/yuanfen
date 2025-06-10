"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Phone, Mail, MapPin, Star, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { YuanfenIcon } from "@/components/ui/icons/iconify-icons";

const Footer = () => {
  const [isQrHovered, setIsQrHovered] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { name: "服务项目", href: "#services", icon: Sparkles },
    { name: "案例展示", href: "#gallery", icon: Heart },
    { name: "关于我们", href: "#about", icon: Star },
    { name: "联系我们", href: "#contact", icon: Phone }
  ];

  const services = [
    { name: "婚礼策划", desc: "专业定制方案" },
    { name: "场地布置", desc: "浪漫场景营造" }, 
    { name: "婚纱礼服", desc: "精选优质礼服" },
    { name: "婚车服务", desc: "豪华车队护航" },
    { name: "婚礼摄影", desc: "记录美好瞬间" },
    { name: "化妆造型", desc: "专业造型团队" }
  ];

  const contactInfo = [
    { icon: Phone, text: "138-0013-8000", href: "tel:13800138000", label: "24小时咨询热线" },
    { icon: MessageCircle, text: "yuanfen_hunqing", href: "#", label: "微信号" },
    { icon: Mail, text: "info@yuanfen-wedding.com", href: "mailto:info@yuanfen-wedding.com", label: "邮箱地址" },
    { icon: MapPin, text: "湖南省衡东县吴集镇", href: "#", label: "公司地址" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const CollapsibleSection = ({ 
    title, 
    icon: IconComponent, 
    sectionKey, 
    children, 
    defaultExpanded = false 
  }: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    sectionKey: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
  }) => {
    const isExpanded = expandedSection === sectionKey || (expandedSection === null && defaultExpanded);
    
    return (
      <div className="space-y-3">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-left lg:cursor-default"
        >
          <h4 className="text-base lg:text-lg font-semibold text-wedding-secondary flex items-center gap-2">
            <IconComponent className="w-4 h-4" />
            {title}
          </h4>
          <div className="lg:hidden">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </button>
        <div className={cn(
          "transition-all duration-300 overflow-hidden",
          "lg:block lg:opacity-100 lg:max-h-none",
          isExpanded ? "block opacity-100 max-h-96" : "hidden opacity-0 max-h-0 lg:block lg:opacity-100"
        )}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-gradient-to-br from-wedding-dark via-gray-900 to-wedding-dark text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3 lg:mb-4">
                <YuanfenIcon className="w-10 h-10 text-wedding-secondary"/>
                <h3 className="text-2xl font-header font-bold text-wedding-secondary">
                  缘份婚庆
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4 lg:mb-6 text-sm lg:text-base line-clamp-3 lg:line-clamp-none">
                专业婚庆服务十余年，致力于为每对新人打造独一无二的完美婚礼。从策划到执行，我们用心记录每一个珍贵时刻。
              </p>
              <div className="flex items-center gap-2 text-wedding-secondary">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-medium">Since 2012</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:space-y-6">
            <CollapsibleSection
              title="快速导航"
              icon={Sparkles}
              sectionKey="navigation"
              defaultExpanded={true}
            >
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                {quickLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="flex items-center gap-2 lg:gap-3 text-gray-300 hover:text-wedding-primary transition-all duration-300 text-left group py-2 px-2 lg:px-3 -mx-2 lg:-mx-3 rounded-lg hover:bg-white/5 w-full text-sm lg:text-base"
                      >
                        <IconComponent className="w-3 h-3 lg:w-4 lg:h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                        <span className="group-hover:translate-x-1 transition-transform truncate">
                          {link.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleSection>
          </div>

          {/* Services */}
          <div className="lg:space-y-6">
            <CollapsibleSection
              title="服务项目"
              icon={Heart}
              sectionKey="services"
            >
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                {services.map((service, index) => (
                  <li 
                    key={index} 
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div className={cn(
                      "p-2 lg:p-3 -mx-2 lg:-mx-3 rounded-lg transition-all duration-300",
                      hoveredService === index ? "bg-white/5 lg:translate-x-2" : ""
                    )}>
                      <div className="text-gray-300 text-xs lg:text-sm font-medium group-hover:text-wedding-primary transition-colors truncate">
                        {service.name}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5 lg:mt-1 group-hover:text-gray-400 transition-colors truncate lg:block hidden">
                        {service.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          </div>

          {/* Contact & WeChat */}
          <div className="lg:space-y-6">
            <CollapsibleSection
              title="联系我们"
              icon={Phone}
              sectionKey="contact"
            >
              {/* Contact Info */}
              <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="group">
                      <div className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 -mx-2 lg:-mx-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-wedding-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-wedding-primary/30 transition-colors">
                          <IconComponent className="w-3 h-3 lg:w-4 lg:h-4 text-wedding-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-400 mb-0.5 lg:mb-1 hidden lg:block">{info.label}</div>
                          {info.href === "#" ? (
                            <span className="text-gray-300 text-xs lg:text-sm font-medium group-hover:text-wedding-primary transition-colors break-all">
                              {info.text}
                            </span>
                          ) : (
                            <a
                              href={info.href}
                              className="text-gray-300 hover:text-wedding-primary transition-colors text-xs lg:text-sm font-medium group-hover:underline break-all"
                            >
                              {info.text}
                            </a>
                          )}
                          <div className="text-xs text-gray-400 lg:hidden">{info.label}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* WeChat QR Code */}
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 lg:p-4 border border-white/10">
                  <div 
                    className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-lg p-2 cursor-pointer transition-all duration-300 hover:scale-110 mx-auto"
                    onMouseEnter={() => setIsQrHovered(true)}
                    onMouseLeave={() => setIsQrHovered(false)}
                    onTouchStart={() => setIsQrHovered(true)}
                    onTouchEnd={() => setIsQrHovered(false)}
                  >
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 lg:mt-3 text-center font-medium">
                    微信扫码咨询
                  </p>

                  {/* Hover/Touch Zoom Effect */}
                  {isQrHovered && (
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-lg p-2 lg:p-3 shadow-2xl border border-gray-200 z-10 transition-all duration-300">
                      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                        <MessageCircle className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  )}
                </div>
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-4">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-xs lg:text-sm">
                © {currentYear} 缘份婚庆(衡东•吴集)
              </p>
              {/* <p className="text-gray-500 text-xs mt-0.5 lg:mt-1 hidden lg:block">
                营业执照号：0000000000000000X | ICP备案号：京ICP备2024000001号
              </p> */}
            </div>

            {/* Social Links / Additional Info */}
            <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 text-xs lg:text-sm text-gray-400">
              <button className="hover:text-wedding-primary transition-colors duration-200 py-1 lg:py-2">
                隐私政策
              </button>
              <span className="hidden lg:inline">•</span>
              <button className="hover:text-wedding-primary transition-colors duration-200 py-1 lg:py-2">
                服务条款
              </button>
              <span className="hidden lg:inline">•</span>
              <a 
                href="tel:13800138000"
                className="text-wedding-primary hover:text-wedding-secondary transition-colors duration-200 font-medium py-1 lg:py-2 px-2 lg:px-3 rounded-full hover:bg-wedding-primary/10"
              >
                24小时咨询
              </a>
            </div>
          </div>
          
          {/* Love Message */}
          <div className="text-center mt-3 lg:mt-6 pt-3 lg:pt-6 border-t border-gray-700/50">
            <p className="text-gray-500 text-xs lg:text-sm flex items-center justify-center gap-2 flex-wrap">
              <span className="flex items-center gap-2">
                用心记录每一份爱情
                <Heart className="w-3 h-3 lg:w-4 lg:h-4 text-wedding-primary animate-pulse" fill="currentColor" />
              </span>
              <span>让幸福成为永恒</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
