# 🎉 Düğün İçin Wedding Memory App - Kurulum Rehberi

## 🎯 Amaç
Düğün günü misafirlerin masa QR kodlarını okuyup fotoğraf/video yükleyebileceği sürekli çalışan sistem

## 📋 Gerekli Ekipman
- **Laptop** (şarj cihazı ile)
- **Telefon** (QR kod okutmak için)
- **İnternet** (WiFi veya mobil hotspot)

## 🔧 Adım Adım Kurulum

### 1. Sistemi Hazırlama
```bash
# Terminal'i aç
cd wedding-memory-nextjs
npm run dev
```

### 2. Ağ Ayarları
- Laptop WiFi'ye bağlandığından emin ol
- İnternet paylaşımını aç (hotspot)
- Misafirlerin WiFi'ye bağlanmasını sağla

### 3. IP Adresi Kontrol
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# Çıkan IP adresi: 10.175.198.54
```

### 4. Admin Panel Kurulumu
1. `http://10.175.198.54:3000/admin/login` adresine git
2. Şifre: `123456`
3. Masaları oluştur (her masa için QR kod)

### 5. QR Kodları Yazdır
- Admin panelde "İndir" butonlarıyla QR kodları indir
- Her masaya bir QR kod koy
- QR kodlar şu adrese yönlendirir: `http://10.175.198.54:3000/table/[QR_KOD]`

## 📱 Düğün Günü Kullanımı

### Misafirler İçin:
1. WiFi'ye bağlan
2. Masa üzerindeki QR kodu tara
3. Açılan sayfada fotoğraf/video yükle
4. Not ekle (isteğe bağlı)

### Organizatör İçin:
1. Laptop'u şarja tak
2. Sistemi açık tut (`npm run dev`)
3. Arada kontrol et (admin panel)

## 🔄 Sürekli Çalışır Tutma

### Seçenek A: Laptop + Power Bank
- Laptop'u şarja tak
- Power bank ile yedek güç
- Ekran kapanmaması için ayarlar

### Seçenek B: Cloud Deploy (Tavsiye)
- Vercel'e yükle
- Herkes erişebilir
- Sürekli açık

## 🌐 Cloud Deploy (Vercel)

### Hızlı Kurulum:
1. **Database oluştur:** https://supabase.com (ücretsiz)
2. **GitHub'a yükle:** `git push`
3. **Vercel'e bağla:** https://vercel.com
4. **Environment variables:** DATABASE_URL

### Avantajları:
- ✅ Sürekli açık
- ✅ Herkes erişebilir
- ✅ Yedekli
- ✅ HTTPS güvenli

## 📊 Veri Yedekleme

### Local Kullanım İçin:
```bash
# Database yedekle
cp prisma/dev.db yedek_dugun.db

# Düğün sonrası
git add .
git commit -m "Düğün verileri"
git push
```

## 🎮 Düğün Günü Kontrol Listesi

### Önce:
- [ ] Laptop şarjı tam
- [ ] İnternet bağlantısı
- [ ] WiFi şifresi hazır
- [ ] QR kodlar basıldı
- [ ] Test yapıldı

### Düğün Sırasında:
- [ ] Sistem açık
- [ ] Misafirler WiFi'ye bağlı
- [ ] QR kodlar çalışıyor
- [ ] Arada kontrol et

### Düğün Sonrası:
- [ ] Verileri yedekle
- [ ] Fotoğrafları indir
- [ ] Sistemi kapat

## 🆘 Acil Durum

### Sistem Çökerse:
1. Terminal'i kapatıp aç
2. `npm run dev` tekrar çalıştır
3. IP adresini kontrol et
4. QR kodları güncelle

### İnternet Olmazsa:
- Mobil hotspot kullan
- Yeni IP adresi al
- QR kodları güncelle

## 💡 İpuçları

- **Test et:** Düğünden önce mutlaka test et
- **Yedek:** Power bank bulundur
- **Basit:** Misafirler için kolay anlatım
- **WiFi:** Güçlü şifre kullanma

## 🎉 Sonuç

Artık düğün günü misafirler anıları paylaşabilir! 📸✨
