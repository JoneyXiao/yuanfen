"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Clock, Star, CheckCircle, Sparkles, ArrowRight, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { YuanfenIcon } from "@/components/ui/icons/iconify-icons";
import Image from "next/image";
import prefix from "@/lib/prefix";

const About = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);
  const [counters, setCounters] = useState({ users: 0, awards: 0, years: 0, satisfaction: 0 });

  useEffect(() => {
    // Animate cards on scroll or load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe achievement cards
    document.querySelectorAll('[data-achievement-card]').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Animate counters
    const animateCounter = (target: number, key: keyof typeof counters, duration: number = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
      }, 16);
    };

    if (visibleCards.length > 0) {
      animateCounter(2000, 'users');
      animateCounter(50, 'awards');
      animateCounter(12, 'years');
      animateCounter(98, 'satisfaction');
    }
  }, [visibleCards]);

  const achievements = [
    { icon: Users, number: "2000+", label: "幸福新人", description: "成功举办婚礼", color: "text-pink-600", bgColor: "bg-pink-100", counter: counters.users },
    { icon: Award, number: "50+", label: "行业奖项", description: "专业认可", color: "text-yellow-600", bgColor: "bg-yellow-100", counter: counters.awards },
    { icon: Clock, number: "12", label: "服务年限", description: "专业经验", color: "text-blue-600", bgColor: "bg-blue-100", counter: counters.years },
    { icon: Star, number: "98%", label: "满意度", description: "客户好评", color: "text-green-600", bgColor: "bg-green-100", counter: counters.satisfaction }
  ];

  const features = [
    { text: "一对一专属婚礼顾问", icon: Users },
    { text: "24小时全程服务保障", icon: Clock }, 
    { text: "国际化团队专业服务", icon: Award },
    { text: "个性化定制婚礼方案", icon: Sparkles },
    { text: "完善的售后服务体系", icon: CheckCircle },
    { text: "透明化价格无隐形消费", icon: Heart }
  ];

  const teamMembers = [
    {
      name: "李雅婷",
      position: "首席婚礼策划师",
      experience: "10年经验",
      specialty: "户外婚礼策划",
      avatar: `${prefix}/avatar-001.avif`
    },
    {
      name: "王浩然",
      position: "创意总监",
      experience: "8年经验", 
      specialty: "主题婚礼设计",
      avatar: `${prefix}/avatar-002.avif`
    },
    {
      name: "张美琳",
      position: "客户服务经理",
      experience: "6年经验",
      specialty: "客户关系管理",
      avatar: `${prefix}/avatar-003.avif`
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-white via-wedding-light/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-wedding-accent text-wedding-accent animate-fade-in-up">
            About Us
          </Badge>
          <h2 className="text-3xl md:text-5xl font-header font-bold text-wedding-dark mb-6 animate-fade-in-up">
            关于缘份婚庆
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            十二年来，我们见证了无数对新人的幸福时刻。从一个小小的工作室成长为行业领先的婚庆公司，
            我们始终坚持用心服务每一对新人，用专业打造每一场完美婚礼。
          </p>
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            {/* <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark mb-6 flex items-center gap-3">
              <YuanfenIcon className="w-10 h-10 text-wedding-primary" />
              我们的故事
            </h3> */}
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-wedding-accent/10 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-wedding-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-wedding-primary" />
                  </div>
                  <p>
                    2012年，怀着对美好爱情的憧憬和对完美婚礼的追求，缘份婚庆正式成立。
                    创始团队由几位热爱婚庆行业的年轻人组成，他们相信每一场婚礼都应该是独一无二的。
                  </p>
                </div>
              </div>
              
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-wedding-accent/10 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-wedding-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-wedding-secondary" />
                  </div>
                  <p>
                    从最初的小团队到现在拥有50多位专业员工，从简单的婚礼布置到全方位的婚庆服务，
                    我们不断学习、成长，只为给新人们带来更好的服务体验。
                  </p>
                </div>
              </div>
              
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-wedding-accent/10 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-wedding-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-wedding-accent" />
                  </div>
                  <p>
                    我们深知婚礼对于每对新人的重要意义，因此我们将每一次服务都当作艺术品来精心雕琢，
                    用专业的态度和贴心的服务，让每一对新人都能拥有属于自己的完美婚礼。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Image */}
          <div className="relative group">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 relative">
              <Image
                src={`${prefix}/garden-wedding.jpg`}
                alt="Our Wedding Planning Team"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-wedding-secondary" />
                  用心记录每一份爱情
                </p>
                <p className="text-wedding-secondary font-medium">Since 2012</p>
              </div>
              
              {/* Floating badges */}
              <div className="absolute top-6 right-6 space-y-2">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium text-wedding-dark">
                  12年专业经验
                </div>
                <div className="bg-wedding-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium text-white">
                  2000+ 成功案例
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Achievements */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark text-center mb-12 flex items-center justify-center gap-3">
            <Award className="w-8 h-8 text-wedding-secondary" />
            我们的成就
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              const isVisible = visibleCards.includes(index);
              return (
                <Card 
                  key={index} 
                  data-index={index}
                  data-achievement-card
                  className={cn(
                    "text-center hover:shadow-xl transition-all duration-500 group cursor-pointer border-wedding-primary/10 hover:border-wedding-primary/30 hover:scale-105",
                    isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredAchievement(index)}
                  onMouseLeave={() => setHoveredAchievement(null)}
                >
                  <CardContent className="p-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300",
                      achievement.bgColor,
                      hoveredAchievement === index ? "scale-110 rotate-3" : ""
                    )}>
                      <IconComponent className={cn("w-8 h-8", achievement.color)} />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-wedding-dark mb-2 transition-all duration-300">
                      {index < 2 ? `${achievement.counter}+` : index === 2 ? achievement.counter : `${achievement.counter}%`}
                    </div>
                    <div className="font-semibold text-wedding-dark mb-1">
                      {achievement.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {achievement.description}
                    </div>
                    
                    {/* Hover effect overlay */}
                    {hoveredAchievement === index && (
                      <div className="absolute inset-0 bg-wedding-primary/5 rounded-lg animate-pulse" />
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Enhanced Features */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark text-center mb-12 flex items-center justify-center gap-3">
            <CheckCircle className="w-8 h-8 text-wedding-primary" />
            为什么选择我们
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className="group p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-wedding-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-wedding-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-wedding-primary/20 transition-colors duration-300">
                      <IconComponent className="w-5 h-5 text-wedding-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-wedding-dark font-medium group-hover:text-wedding-primary transition-colors duration-300">
                      {feature.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Team */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark text-center mb-12 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-wedding-accent" />
            专业团队
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-xl transition-all duration-500 group border-wedding-primary/50 hover:border-wedding-primary hover:scale-105 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-wedding-primary/20 group-hover:border-wedding-primary/40 transition-all duration-300 relative">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="96px"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-wedding-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                      {member.experience}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-wedding-dark mb-2 group-hover:text-wedding-primary transition-colors duration-300">
                    {member.name}
                  </h4>
                  <p className="text-wedding-secondary font-medium mb-3">
                    {member.position}
                  </p>
                  <div className="bg-wedding-light/50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-wedding-primary" />
                      擅长：{member.specialty}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="bg-gradient-to-br from-wedding-light via-white to-wedding-light/50 rounded-2xl p-8 md:p-12 border-2 border-wedding-primary/10 shadow-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mx-auto mb-6">
              <YuanfenIcon className="w-12 h-12 text-wedding-primary animate-pulse" />
            </div>
            <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark mb-4">
              准备开始您的完美婚礼了吗？
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              让我们的专业团队为您量身定制独一无二的婚礼方案，用心记录每一个珍贵时刻
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:13800138000"
                className="group bg-gradient-to-r from-wedding-primary to-wedding-accent text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:scale-105"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                立即咨询
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={scrollToContact}
                className="group border-2 border-wedding-secondary text-wedding-secondary hover:bg-wedding-secondary hover:text-white px-8 py-4 rounded-full transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                在线预约
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 