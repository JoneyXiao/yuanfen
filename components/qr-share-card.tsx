'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import QRCode from 'qrcode'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Share2, Download, Phone, MapPin } from 'lucide-react'
import { YuanfenIcon } from '@/components/ui/icons/iconify-icons'

interface QRShareCardProps {
  url?: string
  title?: string
  description?: string
  phone?: string
  address?: string
}

export function QRShareCard({
  url = 'https://joneyxiao.github.io/yuanfen/',
  title = '缘份婚庆',
  description = '为您打造独一无二的完美婚礼',
  phone = '138-7346-2170',
  address = '湖南省衡东县吴集镇'
}: QRShareCardProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setIsLoading(true)
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: 200,
          margin: 2,
          color: {
            dark: '#1f2937', // Dark gray
            light: '#ffffff' // White
          }
        })
        setQrCodeUrl(qrDataUrl)
      } catch (error) {
        console.error('Error generating QR code:', error)
      } finally {
        setIsLoading(false)
      }
    }

    generateQRCode()
  }, [url])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        })
      } catch (error) {
        console.error('Error sharing:', error)
        fallbackShare()
      }
    } else {
      fallbackShare()
    }
  }

  const fallbackShare = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('网址已复制到剪贴板！')
    }).catch(() => {
      alert('请手动复制网址：' + url)
    })
  }

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a')
      link.download = `${title}-QR码.png`
      link.href = qrCodeUrl
      link.click()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-lg">
        <CardHeader className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <YuanfenIcon className="h-6 w-6 text-rose-500" />
            <CardTitle className="text-2xl font-bold text-wedding-primary">{title}</CardTitle>
            <YuanfenIcon className="h-6 w-6 text-rose-500" />
          </div>
          <Badge variant="secondary" className="mx-auto bg-rose-100 text-rose-700 border-rose-300">
            专业婚庆服务
          </Badge>
          <CardDescription className="text-gray-600 text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* QR Code */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-inner border-2 border-rose-100">
              {isLoading ? (
                <div className="w-[200px] h-[200px] bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
                  <span className="text-gray-400">生成中...</span>
                </div>
              ) : (
                <Image 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  width={200}
                  height={200}
                  className="rounded-md"
                  unoptimized
                />
              )}
            </div>
            <p className="text-xs text-gray-500 text-center">
              扫描二维码访问我们的网站
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-white/50 rounded-lg p-3 space-y-2 border border-rose-100">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="h-4 w-4 text-rose-500" />
              <span className="font-medium">{phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="h-4 w-4 text-rose-500" />
              <span>{address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons - Now below the card */}
      <div className="flex gap-2">
        <Button 
          onClick={handleShare}
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
          size="sm"
        >
          <Share2 className="h-4 w-4 mr-2" />
          分享
        </Button>
        <Button 
          onClick={handleDownload}
          variant="outline"
          className="flex-1 border-rose-300 text-rose-700 hover:bg-rose-50"
          size="sm"
          disabled={isLoading}
        >
          <Download className="h-4 w-4 mr-2" />
          下载
        </Button>
      </div>

      {/* Website URL - Now below the buttons */}
      <div className="text-center">
        <p className="text-xs text-gray-500 break-all">
          {url}
        </p>
      </div>
    </div>
  )
} 