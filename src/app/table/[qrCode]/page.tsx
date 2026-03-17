'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, Camera, Video, Mic, FileText, X, Upload, Shield, Users, Crown, Eye } from 'lucide-react'
import { Table, MediaFile } from '@/types'

export default function TablePage() {
  const params = useParams()
  const router = useRouter()
  const [table, setTable] = useState<Table | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadType, setUploadType] = useState<'photo' | 'video' | 'audio' | 'text'>('photo')
  const [isUploading, setIsUploading] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    fetchTable()
    checkOwnerStatus()
  }, [params.qrCode])

  const fetchTable = async () => {
    try {
      console.log('Fetching table for QR code:', params.qrCode)
      const response = await fetch(`/api/table/${params.qrCode}`)
      
      if (!response.ok) {
        console.error('Failed to fetch table:', response.status, response.statusText)
        return
      }
      
      const data = await response.json()
      console.log('Table data:', data)
      setTable(data.table)
    } catch (error) {
      console.error('Error fetching table:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkOwnerStatus = () => {
    const auth = localStorage.getItem('adminAuth')
    setIsOwner(!!auth)
  }

  const handleFileUpload = async (file: File, description: string) => {
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('description', description)

      const response = await fetch(`/api/guest/upload/${params.qrCode}`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        alert('Dosya başarıyla yüklendi!')
        setShowUploadModal(false)
        fetchTable() // Refresh table data
      } else {
        alert('Yükleme başarısız: ' + (data.error || 'Bilinmeyen hata'))
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Bir hata oluştu.')
    } finally {
      setIsUploading(false)
    }
  }

  const openUploadModal = (type: 'photo' | 'video' | 'audio' | 'text') => {
    setUploadType(type)
    setShowUploadModal(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (!table) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-amber-200/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">QR Kod Geçersiz</h2>
          <p className="text-gray-600 mb-6">Bu QR kod ile eşleşen bir masa bulunamadı.</p>
          <p className="text-sm text-gray-500 mb-6">QR Kod: {params.qrCode}</p>
          <Link
            href="/"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition duration-300 inline-block"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  const uploadButtons = [
    { type: 'photo' as const, icon: Camera, label: 'Fotoğraf', color: 'bg-blue-500 hover:bg-blue-600' },
    { type: 'video' as const, icon: Video, label: 'Video', color: 'bg-rose-500 hover:bg-rose-600' },
    { type: 'audio' as const, icon: Mic, label: 'Ses', color: 'bg-green-500 hover:bg-green-600' },
    { type: 'text' as const, icon: FileText, label: 'Metin', color: 'bg-purple-500 hover:bg-purple-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 inline-block border border-amber-200/20">
            <div className="mb-6">
              <Heart className="w-16 h-16 text-rose-400 mx-auto" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-3 font-serif">
              {table.name}
            </h1>
            <p className="text-xl text-gray-600 mb-2 font-script">
              {isOwner ? (
                <>
                  <Crown className="w-5 h-5 inline mr-2 text-amber-500" />
                  Sahip Görünümü
                </>
              ) : (
                <>
                  <Users className="w-5 h-5 inline mr-2 text-rose-400" />
                  Hatıranızı Paylaşın
                </>
              )}
            </p>
            <p className="text-gray-500 text-sm">
              {isOwner ? 'Bu masaya özel tüm hatıralar' : 'Bu masaya özel anlarınız'}
            </p>
          </div>
        </div>

        {!isOwner && (
          <div className="mb-8">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-amber-200/20">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center font-serif">
                <Upload className="w-5 h-5 inline mr-2 text-rose-400" />
                Hatıranızı Paylaşın
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {uploadButtons.map(({ type, icon: Icon, label, color }) => (
                  <button
                    key={type}
                    onClick={() => openUploadModal(type)}
                    className={`${color} text-white py-4 px-4 rounded-xl text-center hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-8 h-8 mb-2 mx-auto" />
                    <div className="text-sm font-semibold font-serif">{label}</div>
                  </button>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 border border-amber-200">
                <p className="text-center text-gray-700 font-medium mb-2 font-serif">
                  <Shield className="w-4 h-4 inline mr-2 text-amber-500" />
                  Gizlilik Garantisi
                </p>
                <p className="text-center text-sm text-gray-600">
                  Yüklediğiniz dosyalar sadece masanın sahibi tarafından görülecektir.
                  <Heart className="w-3 h-3 inline mx-1 text-rose-400" />
                  Paylaşımınız için teşekkür ederiz!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Media Files Section */}
        {isOwner && table.media_files.length > 0 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-amber-200/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center font-serif">
              <Eye className="w-5 h-5 inline mr-2 text-amber-500" />
              Tüm Medya Dosyaları ({table.media_files.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {table.media_files.map((media) => (
                <div key={media.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">{media.original_filename}</h4>
                        <p className="text-xs text-gray-500 mt-1 capitalize">{media.file_type}</p>
                      </div>
                    </div>
                    
                    {media.description && (
                      <p className="text-sm text-gray-600 mt-2">{media.description}</p>
                    )}
                    
                    <div className="text-xs text-gray-400 mt-3">
                      {new Date(media.created_at).toLocaleString('tr-TR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isOwner && table.media_files.length === 0 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center border border-amber-200/20">
            <p className="text-xl text-gray-600 font-serif mb-4">Henüz medya dosyası yok</p>
            <p className="text-gray-500">Misafirleriniz henüz bu masaya dosya yüklememiş.</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 font-serif">
                {uploadType === 'photo' && <Camera className="w-5 h-5 inline mr-2 text-blue-500" />}
                {uploadType === 'video' && <Video className="w-5 h-5 inline mr-2 text-rose-500" />}
                {uploadType === 'audio' && <Mic className="w-5 h-5 inline mr-2 text-green-500" />}
                {uploadType === 'text' && <FileText className="w-5 h-5 inline mr-2 text-purple-500" />}
                {uploadType === 'photo' && 'Fotoğraf Yükle'}
                {uploadType === 'video' && 'Video Yükle'}
                {uploadType === 'audio' && 'Ses Kaydı Yükle'}
                {uploadType === 'text' && 'Metin Dosyası Yükle'}
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const file = formData.get('file') as File
              const description = formData.get('description') as string
              if (file) {
                handleFileUpload(file, description)
              }
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-serif">
                  Dosya Seç
                </label>
                <input
                  type="file"
                  name="file"
                  required
                  accept={
                    uploadType === 'photo' ? 'image/*' :
                    uploadType === 'video' ? 'video/*' :
                    uploadType === 'audio' ? 'audio/*' :
                    '.txt,.pdf,.doc,.docx'
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-serif">
                  Açıklama (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  name="description"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
                  placeholder="Bu an hakkında kısa not..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Yükle'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition duration-300"
                >
                  İptal
                </button>
              </div>
            </form>
            
            {isUploading && (
              <div className="mt-4 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-2"></div>
                <p className="text-blue-700 font-medium">Yükleniyor...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
