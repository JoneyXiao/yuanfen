"use client";

import { Phone, MessageCircle } from "lucide-react";

const StickyContactBar = () => {
  const copyWeChatId = () => {
    navigator.clipboard.writeText("yuanfen_hunqing");
    // Could add a toast notification here
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 md:hidden">
      <div className="flex">
        {/* WeChat Button */}
        <button
          onClick={copyWeChatId}
          data-wechat="yuanfen_hunqing"
          className="flex-1 flex flex-col items-center justify-center py-3 px-4 bg-white hover:bg-gray-50 transition-colors duration-200 border-r border-gray-200"
          style={{ minHeight: '64px' }} // Ensure 48px+ touch target
        >
          <MessageCircle className="w-6 h-6 text-wedding-accent mb-1" />
          <span className="text-xs font-medium text-wedding-accent">
            微信咨询
          </span>
        </button>

        {/* Call Button */}
        <a
          href="tel:13800138000"
          className="flex-1 flex flex-col items-center justify-center py-3 px-4 bg-wedding-primary hover:bg-wedding-accent transition-colors duration-200 text-white"
          style={{ minHeight: '64px' }} // Ensure 48px+ touch target
        >
          <Phone className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">
            立即致电
          </span>
        </a>
      </div>
    </div>
  );
};

export default StickyContactBar; 