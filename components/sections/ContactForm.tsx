"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle, Heart, Star, Copy, X, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { YuanfenIcon, PhoneIcon } from "@/components/ui/icons/iconify-icons";

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
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showWeChatToast, setShowWeChatToast] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Calculate form completion progress
  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim() !== "").length;
    setFormProgress((filledFields / fields.length) * 100);
  }, [formData]);

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        return !value.trim() ? "请输入您的姓名" : "";
      case "phone":
        if (!value.trim()) return "请输入您的手机号码";
        if (!/^1[3-9]\d{9}$/.test(value)) return "请输入正确的手机号码";
        return "";
      case "weddingDate":
        if (!value) return "请选择预计婚期";
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate < today) return "婚期不能是过去的日期";
        return "";
      case "message":
        if (!value.trim()) return "请简单描述您的需求";
        if (value.trim().length < 10) return "请详细描述您的需求（至少10个字）";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });
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

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", weddingDate: "", message: "" });
      setTouched({});
      setFormProgress(0);
    }, 5000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Real-time validation
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const copyWeChatId = async () => {
    try {
      await navigator.clipboard.writeText("yuanfen_hunqing");
      setShowWeChatToast(true);
      setTimeout(() => setShowWeChatToast(false), 3000);
    } catch (err) {
      console.log("Clipboard not supported" + err);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "联系电话",
      content: "138-0013-8000",
      action: "tel:13800138000",
      description: "7x24小时服务热线",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: MessageCircle,
      title: "微信咨询",
      content: "yuanfen_hunqing",
      action: copyWeChatId,
      description: "点击复制微信号",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: MapPin,
      title: "公司地址",
      content: "衡东县吴集镇",
      action: "",
      description: "欢迎预约实地参观",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Clock,
      title: "营业时间",
      content: "周一至周日 9:00-21:00",
      action: "",
      description: "节假日正常营业",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <section id="contact" className="py-12 md:py-20 bg-gradient-to-br from-white via-wedding-light/30 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 border-wedding-primary text-wedding-primary animate-fade-in-up bg-wedding-primary/5">
            Contact Us
          </Badge>
          <h2 className="text-3xl md:text-5xl font-header font-bold text-wedding-dark mb-6 animate-fade-in-up">
            联系我们
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            准备好开始您的完美婚礼了吗？请填写下方表单，我们的专业顾问将在24小时内与您联系
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm py-0">
              <CardHeader className="bg-gradient-to-r from-wedding-primary/5 to-wedding-secondary/5 border-b border-wedding-primary/10 pb-6">
                <CardTitle className="text-xl font-header text-wedding-dark text-center flex items-center justify-center gap-3 mb-4">
                  <YuanfenIcon className="w-8 h-8 text-wedding-primary"/>
                  免费婚礼咨询
                </CardTitle>
                {/* Enhanced Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">完成进度</span>
                    <span className="font-semibold text-wedding-primary">{Math.round(formProgress)}%</span>
                  </div>
                  <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-wedding-primary to-wedding-secondary rounded-full transition-all duration-500 ease-out shadow-sm"
                      style={{ width: `${formProgress}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
                  </div>
                  {formProgress > 0 && (
                    <p className="text-xs text-gray-500 text-center">
                      {formProgress < 25 ? "继续填写信息" : 
                       formProgress < 50 ? "进展顺利！" :
                       formProgress < 75 ? "快完成了！" :
                       formProgress < 100 ? "最后一步！" : "信息完整，可以提交了！"}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-12 animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      提交成功！
                    </h3>
                    <p className="text-gray-600 mb-6">
                      我们已收到您的咨询，专业顾问将在24小时内联系您
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      感谢您选择缘份婚庆
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Enhanced Name Input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4 text-wedding-primary" />
                          您的姓名 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="请输入新郎或新娘姓名"
                            className={cn(
                              "h-12 pl-4 pr-4 text-base transition-all duration-300 focus:ring-2 focus:ring-wedding-primary/30 border-2",
                              errors.name ? "border-red-400 bg-red-50/50" : 
                              focusedField === "name" ? "border-wedding-primary/50 bg-wedding-primary/5" :
                              "border-gray-200 hover:border-wedding-primary/30"
                            )}
                          />
                          {focusedField === "name" && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="w-2 h-2 bg-wedding-primary rounded-full animate-pulse" />
                            </div>
                          )}
                        </div>
                        {errors.name && (
                          <p className="text-red-500 text-sm animate-fade-in-up flex items-center gap-1 mt-1">
                            <X className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Enhanced Phone Input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-wedding-primary" />
                          联系电话 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="请输入您的手机号"
                            className={cn(
                              "h-12 pl-4 pr-4 text-base transition-all duration-300 focus:ring-2 focus:ring-wedding-primary/30 border-2",
                              errors.phone ? "border-red-400 bg-red-50/50" : 
                              focusedField === "phone" ? "border-wedding-primary/50 bg-wedding-primary/5" :
                              "border-gray-200 hover:border-wedding-primary/30"
                            )}
                          />
                          {focusedField === "phone" && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="w-2 h-2 bg-wedding-primary rounded-full animate-pulse" />
                            </div>
                          )}
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm animate-fade-in-up flex items-center gap-1 mt-1">
                            <X className="w-3 h-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Wedding Date Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-wedding-primary" />
                        预计婚期 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          type="date"
                          value={formData.weddingDate}
                          onChange={(e) => handleInputChange("weddingDate", e.target.value)}
                          onFocus={() => setFocusedField("weddingDate")}
                          onBlur={() => setFocusedField(null)}
                          min={new Date().toISOString().split('T')[0]}
                          className={cn(
                            "h-12 pl-4 pr-4 text-base transition-all duration-300 focus:ring-2 focus:ring-wedding-primary/30 border-2",
                            errors.weddingDate ? "border-red-400 bg-red-50/50" : 
                            focusedField === "weddingDate" ? "border-wedding-primary/50 bg-wedding-primary/5" :
                            "border-gray-200 hover:border-wedding-primary/30"
                          )}
                        />
                        {focusedField === "weddingDate" && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-2 h-2 bg-wedding-primary rounded-full animate-pulse" />
                          </div>
                        )}
                      </div>
                      {errors.weddingDate && (
                        <p className="text-red-500 text-sm animate-fade-in-up flex items-center gap-1 mt-1">
                          <X className="w-3 h-3" />
                          {errors.weddingDate}
                        </p>
                      )}
                    </div>

                    {/* Enhanced Message Textarea */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-wedding-primary" />
                        您的需求 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="请详细描述您的婚礼需求，比如：&#10;• 预算范围（如：10-20万）&#10;• 宾客人数（如：100人左右）&#10;• 风格偏好（如：简约现代、浪漫唯美）&#10;• 特殊要求等..."
                          rows={5}
                          className={cn(
                            "p-4 text-base transition-all duration-300 focus:ring-2 focus:ring-wedding-primary/30 resize-none border-2",
                            errors.message ? "border-red-400 bg-red-50/50" : 
                            focusedField === "message" ? "border-wedding-primary/50 bg-wedding-primary/5" :
                            "border-gray-200 hover:border-wedding-primary/30"
                          )}
                        />
                        {focusedField === "message" && (
                          <div className="absolute right-3 top-3">
                            <div className="w-2 h-2 bg-wedding-primary rounded-full animate-pulse" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        {errors.message ? (
                          <p className="text-red-500 text-sm animate-fade-in-up flex items-center gap-1">
                            <X className="w-3 h-3" />
                            {errors.message}
                          </p>
                        ) : (
                          <p className="text-gray-400 text-sm">
                            {formData.message.length}/200 字符
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting || formProgress < 100}
                      className={cn(
                        "w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group",
                        isSubmitting 
                          ? "bg-gray-400 cursor-not-allowed" 
                          : formProgress === 100
                            ? "bg-gradient-to-r from-wedding-primary to-wedding-accent hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] shadow-lg"
                            : "bg-gray-300 cursor-not-allowed"
                      )}
                    >
                      {/* Button shimmer effect */}
                      {!isSubmitting && formProgress === 100 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      )}
                      
                      <div className="relative flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            提交中...
                          </>
                        ) : formProgress === 100 ? (
                          <>
                            <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            免费获取婚礼方案
                            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" />
                          </>
                        ) : (
                          <>
                            请完善表单信息
                            <span className="text-sm opacity-80">({Math.round(formProgress)}%)</span>
                          </>
                        )}
                      </div>
                    </Button>

                    <div className="pt-1 md:pt-3 px-2">
                      <p className="text-xs text-gray-500 text-center leading-relaxed">
                        <span className="inline-flex items-start gap-1.5 justify-center flex-wrap">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0 hidden md:block" />
                          <span className="inline-block text-center sm:text-left">
                            提交即表示您同意我们的隐私政策，我们承诺保护您的个人信息
                          </span>
                        </span>
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Contact Information */}
          <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <PhoneIcon className="w-6 h-6 text-wedding-primary" />
              <h3 className="text-xl md:text-2xl font-header font-semibold text-wedding-dark">
                联系方式
              </h3>
            </div>
            
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card 
                  key={index} 
                  className={cn(
                    "hover:shadow-xl transition-all duration-300 border-2 hover:scale-[1.02] group overflow-hidden",
                    info.borderColor,
                    "hover:border-opacity-50"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                        info.bgColor,
                        "group-hover:scale-110 shadow-sm"
                      )}>
                        <IconComponent className={cn("w-6 h-6", info.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-wedding-dark mb-2 group-hover:text-wedding-primary transition-colors duration-300">
                          {info.title}
                        </h4>
                        {info.action ? (
                          <button
                            onClick={typeof info.action === "function" ? info.action : () => window.open(info.action as string)}
                            className="text-wedding-primary hover:text-wedding-accent font-medium transition-colors duration-200 break-all text-left group/btn"
                          >
                            <div className="flex items-center gap-2">
                              {info.title === "微信咨询" && <Copy className="w-4 h-4" />}
                              <span className="group-hover/btn:underline">{info.content}</span>
                            </div>
                          </button>
                        ) : (
                          <p className="text-gray-900 font-medium break-all">
                            {info.content}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Enhanced WeChat QR Code */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold text-wedding-dark mb-4 flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  微信扫码咨询
                </h4>
                <div className="w-32 h-32 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-green-100 hover:border-green-200 transition-colors duration-300">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  扫描二维码添加微信
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    onClick={copyWeChatId}
                    variant="outline"
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-700 hover:text-white flex items-center gap-2 hover:scale-105 transition-all duration-300"
                  >
                    <Copy className="w-4 h-4" />
                    复制微信号
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced WeChat Copy Toast */}
        {showWeChatToast && (
          <div className="fixed bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl z-50 animate-fade-in-up flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            微信号已复制到剪贴板！
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
