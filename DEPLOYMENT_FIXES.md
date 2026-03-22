# 🚨 Vercel Deploy Hataları Çözümü

## ❌ Olası Hatalar ve Çözümleri

### 1. SQLite Hatası
**Hata:** `sqlite3` Vercel'de çalışmaz
**Çözüm:** `sqlite3` paketi kaldırıldı

### 2. Database Provider Hatası
**Hata:** SQLite provider Vercel'de desteklenmiyor
**Çözüm:** PostgreSQL'e geçildi

### 3. Prisma Generate Hatası
**Hata:** Prisma client generate edilmiyor
**Çözüm:** Build command güncellendi

## 🔧 Yapılan Değişiklikler

### package.json
- `sqlite3` kaldırıldı
- `vercel` eklendi

### prisma/schema.prisma
- Provider: `sqlite` → `postgresql`
- URL: `env("DATABASE_URL")`

### vercel.json
- Build command: `prisma generate && next build`
- Environment variables eklendi

## 📋 Vercel için Gerekli Adımlar

### 1. Database Kurulumu
**Seçenek A: Supabase (Ücretsiz)**
1. https://supabase.com adresine gidin
2. Ücretsiz proje oluşturun
3. Database URL'yi kopyalayın

**Seçenek B: Railway (Ücretsiz)**
1. https://railway.app adresine gidin
2. PostgreSQL service oluşturun
3. Connection URL'yi alın

### 2. Vercel Environment Variables
Vercel dashboard'da:
1. Projeyi seçin
2. Settings → Environment Variables
3. Aşağıdaki değişkenleri ekleyin:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   NODE_ENV=production
   ```

### 3. Redeploy
1. Vercel'de projenizi seçin
2. "Deployments" tab'ına gidin
3. "Redeploy" butonuna tıklayın

## 🎯 QR Kod URL Güncelleme

Production URL'yi öğrendikten sonra:
```typescript
// src/lib/qrcode.ts
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://wedding-memory-nextjs-babagavs.vercel.app' 
  : 'http://10.175.198.54:3000'
```

## ✅ Test Edin

1. Database bağlantısını test edin
2. Masa oluşturmayı test edin
3. QR kod üretmeyi test edin
4. Dosya yüklemeyi test edin
