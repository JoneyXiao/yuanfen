"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    weddingDate: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "请输入您的姓名";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "请输入您的手机号码";
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "请输入正确的手机号码";
    }

    if (!formData.weddingDate) {
      newErrors.weddingDate = "请选择预计婚期";
    }

    if (!formData.message.trim()) {
      newErrors.message = "请简单描述您的需求";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Add shake animation to form
      const form = e.target as HTMLFormElement;
      form.classList.add("animate-shake");
      setTimeout(() => form.classList.remove("animate-shake"), 600);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", weddingDate: "", message: "" });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const copyWeChatId = () => {
    navigator.clipboard.writeText("yuanfen_hunqing");
    // Show toast or feedback
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "联系电话",
      content: "138-0013-8000",
      action: "tel:13800138000",
      description: "7×24小时服务热线"
    },
    {
      icon: MessageCircle,
      title: "微信咨询",
      content: "yuanfen_hunqing",
      action: copyWeChatId,
      description: "点击复制微信号"
    },
    {
      icon: MapPin,
      title: "公司地址",
      content: "北京市朝阳区三里屯SOHO",
      action: "",
      description: "欢迎预约实地参观"
    },
    {
      icon: Clock,
      title: "营业时间",
      content: "周一至周日 9:00-21:00",
      action: "",
      description: "节假日正常营业"
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-wedding-primary text-wedding-primary">
            Contact Us
          </Badge>
          <h2 className="text-3xl md:text-5xl font-header font-bold text-wedding-dark mb-6">
            联系我们
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            准备好开始您的完美婚礼了吗？请填写下方表单，我们的专业顾问将在24小时内与您联系
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-header text-wedding-dark text-center">
                  免费婚礼咨询
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      提交成功！
                    </h3>
                    <p className="text-gray-600">
                      我们已收到您的咨询，专业顾问将在24小时内联系您
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          您的姓名 *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="请输入您的姓名"
                          className={`h-12 ${errors.name ? "border-red-500 animate-shake" : ""}`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          联系电话 *
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="请输入您的手机号"
                          className={`h-12 ${errors.phone ? "border-red-500 animate-shake" : ""}`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Wedding Date Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        预计婚期 *
                      </label>
                      <Input
                        type="date"
                        value={formData.weddingDate}
                        onChange={(e) => handleInputChange("weddingDate", e.target.value)}
                        className={`h-12 ${errors.weddingDate ? "border-red-500 animate-shake" : ""}`}
                      />
                      {errors.weddingDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.weddingDate}</p>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        您的需求 *
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="请简单描述您的婚礼需求，比如预算范围、人数规模、风格偏好等..."
                        rows={4}
                        className={`${errors.message ? "border-red-500 animate-shake" : ""}`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full h-14 text-lg font-semibold rounded-full transition-all duration-300 ${
                        isSubmitting 
                          ? "bg-gray-400" 
                          : "gradient-wedding hover:scale-105 hover:shadow-lg active:scale-95"
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          提交中...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          免费获取婚礼方案
                        </div>
                      )}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      提交即表示您同意我们的隐私政策，我们承诺保护您的个人信息
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-header font-semibold text-wedding-dark mb-6">
              联系方式
            </h3>
            
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-wedding-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-wedding-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-wedding-dark mb-1">
                          {info.title}
                        </h4>
                        {info.action ? (
                          <button
                            onClick={typeof info.action === "function" ? info.action : () => window.open(info.action as string)}
                            className="text-wedding-primary hover:text-wedding-accent font-medium transition-colors duration-200"
                            data-wechat={info.title === "微信咨询" ? "yuanfen_hunqing" : undefined}
                          >
                            {info.content}
                          </button>
                        ) : (
                          <p className="text-gray-900 font-medium">
                            {info.content}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* WeChat QR Code */}
            <Card className="bg-wedding-light border-wedding-primary/20">
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold text-wedding-dark mb-3">
                  微信扫码咨询
                </h4>
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
                  {/* Placeholder for QR code */}
                  <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  扫描二维码添加微信
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 