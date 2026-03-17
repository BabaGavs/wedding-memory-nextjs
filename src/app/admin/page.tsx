'use client'

import { useState, useEffect } from 'react'
import { Crown, Plus, Eye, Trash2, Calendar, Image as ImageIcon, LogOut, Table } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Table as TableType } from '@/types'
import { generateQRCode } from '@/lib/qrcode'

export default function AdminPage() {
  const [tables, setTables] = useState<TableType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin/login')
      return
    }

    fetchTables()
  }, [router])

  useEffect(() => {
    // Generate QR codes for all tables
    tables.forEach(async (table) => {
      if (table.qr_code && !qrCodes[table.qr_code]) {
        try {
          const qrCodeDataURL = await generateQRCode(table.qr_code)
          setQrCodes(prev => ({ ...prev, [table.qr_code]: qrCodeDataURL }))
        } catch (error) {
          console.error('Error generating QR code:', error)
        }
      }
    })
  }, [tables])

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables')
      const data = await response.json()
      setTables(data.tables || [])
    } catch (error) {
      console.error('Error fetching tables:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTable = async (tableId: number, tableName: string) => {
    if (!confirm(`"${tableName}" masasını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
      return
    }

    try {
      const response = await fetch(`/api/tables/${tableId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setTables(tables.filter(table => table.id !== tableId))
      } else {
        alert('Silme işlemi başarısız oldu.')
      }
    } catch (error) {
      console.error('Error deleting table:', error)
      alert('Bir hata oluştu.')
    }
  }

  const downloadQRCode = (qrCode: string, tableName: string) => {
    const qrCodeDataUrl = qrCodes[qrCode]
    if (!qrCodeDataUrl) return

    const link = document.createElement('a')
    link.href = qrCodeDataUrl
    link.download = `qr-code-${tableName.replace(/\s+/g, '-').toLowerCase()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-amber-200/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 font-serif">Yönetici Paneli</h1>
              <p className="text-gray-600 mt-1">Masaları ve medya dosyalarını yönetin</p>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3">
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış
              </button>
              <Link
                href="/admin/create-table"
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition duration-300 font-semibold flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Masa
              </Link>
            </div>
          </div>
          
          {tables.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tables.map((table) => (
                <div key={table.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-800 truncate">{table.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">QR: {table.qr_code}</p>
                      </div>
                      <div className="flex space-x-2 ml-2">
                        <Link
                          href={`/table/${table.qr_code}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteTable(table.id, table.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <ImageIcon className="w-4 h-4 mr-1" />
                        {table.media_files.length} Medya
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(table.created_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    
                    {table.qr_code && (
                      <div className="mt-4 text-center">
                        {qrCodes[table.qr_code] ? (
                          <div>
                            <img 
                              src={qrCodes[table.qr_code]} 
                              alt="QR Kod" 
                              className="w-24 h-24 mx-auto border-2 border-gray-200 rounded-lg mb-2"
                            />
                            <button
                              onClick={() => downloadQRCode(table.qr_code, table.name)}
                              className="text-xs bg-amber-500 text-white px-3 py-1 rounded-full hover:bg-amber-600 transition-colors"
                            >
                              İndir
                            </button>
                          </div>
                        ) : (
                          <div className="w-24 h-24 mx-auto border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">QR Kod</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Table className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-3 font-serif">Henüz masa oluşturulmadı</h3>
              <p className="text-gray-500 mb-6">İlk masanızı oluşturarak başlayın</p>
              <Link
                href="/admin/create-table"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition duration-300 inline-block font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                İlk Masayı Oluştur
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
