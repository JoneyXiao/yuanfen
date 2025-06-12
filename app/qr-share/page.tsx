import { QRShareCard } from '@/components/qr-share-card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import { YuanfenIcon } from '@/components/ui/icons/iconify-icons'
import Link from 'next/link'

export default function QRSharePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-100">
      {/* Header with navigation */}
      <header className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back button and Logo */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-wedding-dark hover:text-wedding-primary hover:bg-wedding-primary/10 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              
              <div className="h-8 w-px bg-gray-200" />
              
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <YuanfenIcon className="w-8 h-8 text-wedding-secondary" size={24} />
                <span className="text-xl font-header font-semibold text-wedding-secondary">
                  缘份婚庆
                </span>
              </Link>
            </div>

            {/* Home button for mobile */}
            <Link href="/" className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-wedding-dark hover:text-wedding-primary hover:bg-wedding-primary/10 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="p-4 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">分享我们的服务</h1>
            <p className="text-gray-600">扫描或分享二维码，让更多人了解 <span className="text-wedding-primary font-bold">缘份婚庆</span></p>
          </div>
          
          <QRShareCard />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              下载或直接分享这张二维码卡片给朋友和客户
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 