# Wedding Memory App

Next.js ile geliştirilmiş düğün hatıraları uygulaması.

## 🚀 Vercel'e Yükleme

### 1. Vercel Hesabı Oluştur
- https://vercel.com adresine gidin
- GitHub ile ücretsiz hesap oluşturun

### 2. GitHub'a Yükle
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/kullaniciadiniz/wedding-memory-nextjs.git
git push -u origin main
```

### 3. Vercel'e Bağlan
- Vercel dashboard'a gidin
- "New Project" butonuna tıklayın
- GitHub reposunu seçin
- "Deploy" butonuna tıklayın

### 4. Database Kurulumu
Vercel'e yüklendikten sonra:
- Vercel dashboard'da projenizi seçin
- "Settings" → "Environment Variables" 
- Aşağıdaki değişkenleri ekleyin:
  - `PRISMA_DATABASE_URL`: `file:./dev.db`
  - `NODE_ENV`: `production`

### 5. Production URL
Projeniz şu adreste yayınlanacak:
`https://wedding-memory-nextjs-username.vercel.app`

## 📱 Mobil Erişim
- QR kodlar otomatik olarak production URL'yi içerir
- Mobil cihazlardan sorunsuz çalışır

## 🎨 Özellikler
- ✅ Next.js 16
- ✅ Tailwind CSS
- ✅ Lucide React Icons
- ✅ Prisma Database
- ✅ QR Kod Üretimi
- ✅ Mobil Uyumlu
- ✅ Responsive Tasarım
