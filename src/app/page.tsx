'use client'

import { useState } from 'react'
import { Heart, Crown, Users, Shield, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border border-amber-200/20">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Heart className="w-16 h-16 text-rose-400 mx-auto" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-3 font-serif">
            Düğün Hatıraları
          </h1>
          <p className="text-xl text-gray-600 mb-2 font-script">
            Sevgiyle Paylaşılır
          </p>
          <p className="text-gray-500 text-sm">
            En özel gününüzün anıları
          </p>
        </div>
        
        <div className="space-y-6">
          <Link
            href="/admin/login"
            className="block bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-8 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Crown className="w-5 h-5 inline mr-3" />
            <span className="font-serif">Yönetici Girişi</span>
          </Link>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-6 h-6 text-amber-500" />
              <p className="text-gray-600 font-medium">QR Kod ile Hatıralara Erişin</p>
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 border border-amber-200">
              <p className="text-sm text-gray-600 mb-2">
                <Shield className="w-4 h-4 inline mr-2 text-rose-400" />
                <strong>Nasıl Çalışır?</strong>
              </p>
              <ul className="text-xs text-gray-500 space-y-1 text-left">
                <li><ChevronRight className="w-3 h-3 inline mr-2 text-green-500" />Masalardaki QR kodları tarayın</li>
                <li><ChevronRight className="w-3 h-3 inline mr-2 text-green-500" />Fotoğraf, video, ses veya metin paylaşın</li>
                <li><ChevronRight className="w-3 h-3 inline mr-2 text-green-500" />Sadece sizin görebileceğiniz özel anılar</li>
              </ul>
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <span><Heart className="w-3 h-3 inline mr-1" /> Konuklar yükleyebilir</span>
              <span>•</span>
              <span><Shield className="w-3 h-3 inline mr-1" /> Sadece siz görürsünüz</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="text-2xl text-amber-600 mb-2 font-script">&</div>
          <p className="text-xs text-gray-400 italic">
            Bir ömür boyu hatırlanacak anlar
          </p>
        </div>
      </div>
    </div>
  )
}
