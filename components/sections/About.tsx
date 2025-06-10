"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Clock, Star, CheckCircle } from "lucide-react";

const About = () => {
  const achievements = [
    { icon: Users, number: "2000+", label: "幸福新人", description: "成功举办婚礼" },
    { icon: Award, number: "50+", label: "行业奖项", description: "专业认可" },
    { icon: Clock, number: "12", label: "服务年限", description: "专业经验" },
    { icon: Star, number: "98%", label: "满意度", description: "客户好评" }
  ];

  const features = [
    "一对一专属婚礼顾问",
    "24小时全程服务保障", 
    "国际化团队专业服务",
    "个性化定制婚礼方案",
    "完善的售后服务体系",
    "透明化价格无隐形消费"
  ];

  const teamMembers = [
    {
      name: "李雅婷",
      position: "首席婚礼策划师",
      experience: "10年经验",
      specialty: "户外婚礼策划"
    },
    {
      name: "王浩然",
      position: "创意总监",
      experience: "8年经验", 
      specialty: "主题婚礼设计"
    },
    {
      name: "张美琳",
      position: "客户服务经理",
      experience: "6年经验",
      specialty: "客户关系管理"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-wedding-accent text-wedding-accent">
            About Us
          </Badge>
          <h2 className="text-3xl md:text-5xl font-header font-bold text-wedding-dark mb-6">
            关于缘份婚庆
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            十二年来，我们见证了无数对新人的幸福时刻。从一个小小的工作室成长为行业领先的婚庆公司，
            我们始终坚持用心服务每一对新人，用专业打造每一场完美婚礼。
          </p>
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark mb-6">
              我们的故事
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                2012年，怀着对美好爱情的憧憬和对完美婚礼的追求，缘份婚庆正式成立。
                创始团队由几位热爱婚庆行业的年轻人组成，他们相信每一场婚礼都应该是独一无二的。
              </p>
              <p>
                从最初的小团队到现在拥有50多位专业员工，从简单的婚礼布置到全方位的婚庆服务，
                我们不断学习、成长，只为给新人们带来更好的服务体验。
              </p>
              <p>
                我们深知婚礼对于每对新人的重要意义，因此我们将每一次服务都当作艺术品来精心雕琢，
                用专业的态度和贴心的服务，让每一对新人都能拥有属于自己的完美婚礼。
              </p>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                alt="Our Wedding Planning Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-semibold">用心记录每一份爱情</p>
                <p className="text-wedding-secondary">Since 2012</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark text-center mb-12">
            我们的成就
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-wedding-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-wedding-primary" />
                    </div>
                    <div className="text-3xl font-bold text-wedding-dark mb-2">
                      {achievement.number}
                    </div>
                    <div className="font-semibold text-wedding-dark mb-1">
                      {achievement.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {achievement.description}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark text-center mb-12">
            为什么选择我们
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-wedding-light hover:bg-wedding-light/80 transition-colors duration-300">
                <CheckCircle className="w-5 h-5 text-wedding-primary flex-shrink-0" />
                <span className="text-wedding-dark font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-2xl md:text-3xl font-header font-semibold text-wedding-dark text-center mb-12">
            专业团队
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-wedding-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-wedding-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-wedding-dark mb-2">
                    {member.name}
                  </h4>
                  <p className="text-wedding-secondary font-medium mb-1">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {member.experience}
                  </p>
                  <p className="text-sm text-gray-600">
                    擅长：{member.specialty}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-wedding-light rounded-2xl">
          <h3 className="text-2xl font-header font-semibold text-wedding-dark mb-4">
            准备开始您的完美婚礼了吗？
          </h3>
          <p className="text-gray-600 mb-6">
            让我们的专业团队为您量身定制独一无二的婚礼方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:13800138000"
              className="bg-wedding-primary text-white px-8 py-3 rounded-full hover:bg-wedding-accent transition-colors duration-300 font-medium"
            >
              立即咨询
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-wedding-secondary text-wedding-secondary hover:bg-wedding-secondary hover:text-white px-8 py-3 rounded-full transition-colors duration-300 font-medium"
            >
              在线预约
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 