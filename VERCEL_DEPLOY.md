# 🚀 Vercel'e Yükleme Talimatları

## 📋 Gerekli Adımlar

### 1. GitHub Reposu Oluştur
1. https://github.com adresine gidin
2. "New repository" oluşturun
3. Repository adı: `wedding-memory-nextjs`
4. Public olarak işaretleyin
5. "Create repository" butonuna tıklayın

### 2. Projeyi GitHub'a Yükle
```bash
cd wedding-memory-nextjs
git init
git add .
git commit -m "Initial commit: Wedding Memory App"
git branch -M main
git remote add origin https://github.com/[KULLANICI_ADI]/wedding-memory-nextjs.git
git push -u origin main
```

### 3. Vercel'e Bağlan
1. https://vercel.com adresine gidin
2. "Sign Up" ile ücretsiz hesap oluşturun (GitHub ile bağlanın)
3. Dashboard'da "Add New..." → "Project" butonuna tıklayın
4. GitHub reposunuzu seçin
5. "Deploy" butonuna tıklayın

### 4. Environment Variables
Vercel'de projenizi seçin:
- "Settings" → "Environment Variables"
- Aşağıdaki değişkenleri ekleyin:
  ```
  DATABASE_URL=postgresql://user:password@host:port/database
  NODE_ENV=production
  ```

### 5. Production URL
Yükleme tamamlandığında projeniz şu adreste yayınlanacak:
`https://wedding-memory-nextjs-[username].vercel.app`

## 🔧 Production için Database

Vercel ücretsiz planında SQLite çalışmaz. Alternatifler:

### Seçenek 1: Vercel Postgres (Ücretli)
- Vercel dashboard'da "Storage" → "Create Database"
- PostgreSQL database oluşturun
- Database URL'yi environment variable olarak ekleyin

### Seçenek 2: Railway (Ücretsiz)
- https://railway.app adresine gidin
- Ücretsiz PostgreSQL database oluşturun
- URL'yi Vercel'e ekleyin

### Seçenek 3: Supabase (Ücretsiz)
- https://supabase.com adresine gidin
- Ücretsiz proje oluşturun
- Database URL'yi alın

## 📱 QR Kod URL Güncelleme

Production'a yüklendikten sonra `src/lib/qrcode.ts` dosyasını güncelleyin:

```typescript
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://wedding-memory-nextjs-[username].vercel.app' 
  : 'http://10.175.198.54:3000'
```

## 🎯 Hızlı Test

1. GitHub'a yükle
2. Vercel'e bağlan
3. Deploy et
4. Test et: `https://wedding-memory-nextjs-[username].vercel.app`

## 💡 Notlar

- Vercel ücretsiz planında 100GB bant genişliği/ay
- Database için ayrı servis gerekli
- SSL sertifikası otomatik
- CDN dahil
