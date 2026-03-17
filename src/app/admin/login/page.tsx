'use client'

import { useState } from 'react'
import { Lock, Crown, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        // Store auth token or session
        localStorage.setItem('adminAuth', 'true')
        router.push('/admin')
      } else {
        setError('Invalid password')
      }
    } catch (error) {
      setError('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-amber-200/20">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Lock className="w-16 h-16 text-amber-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-3 font-serif">
            Yönetici Girişi
          </h1>
          <p className="text-xl text-gray-600 mb-2 font-script">
            Özel Alanınız
          </p>
          <p className="text-gray-500 text-sm">
            Sadece sahip olduğunuz şifre ile erişebilirsiniz
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl text-red-700">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-3 font-serif">
              <Crown className="w-4 h-4 inline mr-2 text-amber-500" />
              Şifre
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-4 border-2 border-amber-200 rounded-2xl focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300 text-lg font-medium"
                placeholder="Yönetici şifrenizi girin"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-8 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <span className="font-serif">Giriş Yap</span>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center space-y-4">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 border border-amber-200">
            <p className="text-sm text-gray-600 mb-2">
              <Shield className="w-4 h-4 inline mr-2 text-rose-400" />
              <strong>Güvenlik Notu</strong>
            </p>
            <p className="text-xs text-gray-500">
              Bu alan sadece düğün sahibine özeldir. Konuklar erişemez.
            </p>
          </div>
          
          <Link
            href="/"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-serif">Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
