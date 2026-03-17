'use client'

import { useState } from 'react'
import { Plus, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateTablePage() {
  const [tableName, setTableName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: tableName }),
      })

      const data = await response.json()

      if (data.table) {
        router.push('/admin')
      } else {
        setError(data.error || 'Masa oluşturulamadı')
      }
    } catch (error) {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border border-amber-200/20">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Plus className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-3 font-serif">
            Yeni Masa Oluştur
          </h1>
          <p className="text-gray-600">
            Düğün misafirleriniz için özel bir masa oluşturun
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl text-red-700">
            <span className="font-medium">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 font-serif">
              Masa Adı
            </label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              required
              className="w-full px-4 py-4 border-2 border-amber-200 rounded-2xl focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300 text-lg font-medium"
              placeholder="Örn: Aile Masası, Arkadaşlar Masası"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isLoading || !tableName.trim()}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Masa Oluştur'
              )}
            </button>
            <Link
              href="/admin"
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition duration-300 text-center"
            >
              İptal
            </Link>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-serif">Yönetici Paneline Dön</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
