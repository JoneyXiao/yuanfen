"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const [isQrHovered, setIsQrHovered] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { name: "服务项目", href: "#services" },
    { name: "案例展示", href: "#gallery" },
    { name: "关于我们", href: "#about" },
    { name: "联系我们", href: "#contact" }
  ];

  const services = [
    "婚礼策划",
    "场地布置", 
    "婚纱礼服",
    "婚车服务",
    "婚礼摄影",
    "化妆造型"
  ];

  const contactInfo = [
    { icon: Phone, text: "138-0013-8000", href: "tel:13800138000" },
    { icon: MessageCircle, text: "yuanfen_hunqing", href: "#" },
    { icon: Mail, text: "info@yuanfen-wedding.com", href: "mailto:info@yuanfen-wedding.com" },
    { icon: MapPin, text: "北京市朝阳区三里屯SOHO", href: "#" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-wedding-dark text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-header font-bold text-wedding-secondary mb-3">
                缘份婚庆
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                专业婚庆服务十余年，致力于为每对新人打造独一无二的完美婚礼。从策划到执行，我们用心记录每一个珍贵时刻。
              </p>
              <div className="flex items-center gap-2 text-wedding-secondary">
                <Heart className="w-4 h-4" fill="currentColor" />
                <span className="text-sm font-medium">Since 2012</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-wedding-secondary">
              快速导航
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-wedding-primary transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-wedding-secondary">
              服务项目
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & WeChat */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-wedding-secondary">
              联系我们
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <IconComponent className="w-4 h-4 text-wedding-primary flex-shrink-0" />
                    {info.href === "#" ? (
                      <span className="text-gray-300 text-sm">{info.text}</span>
                    ) : (
                      <a
                        href={info.href}
                        className="text-gray-300 hover:text-wedding-primary transition-colors duration-200 text-sm"
                      >
                        {info.text}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            {/* WeChat QR Code */}
            <div className="relative">
              <div 
                className="w-24 h-24 bg-white rounded-lg p-2 cursor-pointer transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setIsQrHovered(true)}
                onMouseLeave={() => setIsQrHovered(false)}
              >
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                微信扫码咨询
              </p>

              {/* Hover Zoom Effect */}
              {isQrHovered && (
                <div className="absolute -top-16 -left-8 w-40 h-40 bg-white rounded-lg p-3 shadow-2xl border border-gray-200 z-10 transition-all duration-300">
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                    <MessageCircle className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} 缘份婚庆策划有限公司 (Yuanfen Wedding Planning Co., Ltd)
              </p>
              <p className="text-gray-500 text-xs mt-1">
                营业执照号：91110000123456789X | ICP备案号：京ICP备2024000001号
              </p>
            </div>

            {/* Social Links / Additional Info */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>隐私政策</span>
              <span>•</span>
              <span>服务条款</span>
              <span>•</span>
              <a 
                href="tel:13800138000"
                className="text-wedding-primary hover:text-wedding-secondary transition-colors duration-200 font-medium"
              >
                24小时咨询热线
              </a>
            </div>
          </div>
          
          {/* Love Message */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              用心记录每一份爱情
              <Heart className="w-4 h-4 text-wedding-primary animate-pulse" fill="currentColor" />
              让幸福成为永恒
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 