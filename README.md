# 🎯 Quiz Uygulaması

Modern ve etkileşimli bir quiz uygulaması. Kim Milyoner Olmak İster formatında tasarlanmış, joker sistemi ve ses efektleri ile zenginleştirilmiş bir React uygulaması.

## ✨ Özellikler

### 🎮 Oyun Özellikleri

- **Dinamik Soru Sistemi**: Her oyunda sorular rastgele karıştırılır
- **Zamanlayıcı**: Her soru için 60 saniye süre
- **Puan Sistemi**: Doğru cevaplar için puan kazanma
- **Ses Efektleri**: Doğru/yanlış cevaplar ve kazanma sesleri
- **Konfeti Animasyonu**: Kazanma anında görsel efekt

### 🃏 Joker Sistemi

- **%50 Joker**: İki yanlış seçeneği eleme
- **Seyirci Jokeri**: Seyircinin oylarını görme
- **Telefon Jokeri**: Arkadaştan yardım alma
- **Tek Kullanımlık**: Her joker sadece bir kez kullanılabilir

### 🎨 Kullanıcı Deneyimi

- **Modern Arayüz**: Responsive tasarım
- **Animasyonlar**: Smooth geçişler ve efektler
- **Görsel Geri Bildirim**: Anlık doğru/yanlış gösterimi
- **Kişiselleştirme**: Kullanıcı adı ile oyuna başlama

## 🛠️ Kullanılan Teknolojiler

### Frontend

- **React 19.1.1** - Modern React hooks ve functional components
- **React Router DOM 7.7.1** - Sayfa yönlendirmeleri
- **Sass 1.89.2** - Gelişmiş CSS özellikleri
- **Canvas Confetti 1.9.3** - Konfeti animasyonları

### Geliştirme Araçları

- **Create React App** - Proje yapısı ve build sistemi
- **ESLint** - Kod kalitesi kontrolü

### Ses ve Medya

- **Web Audio API** - Ses efektleri yönetimi
- **MP3 Ses Dosyaları** - Oyun içi ses efektleri

## 📁 Proje Yapısı

```
quiz-app/
├── public/
│   ├── sounds/          # Ses efektleri
│   └── index.html       # Ana HTML dosyası
├── src/
│   ├── components/      # React bileşenleri
│   │   ├── StartScreen/     # Başlangıç ekranı
│   │   ├── QuestionScreen/  # Soru ekranı
│   │   ├── ResultScreen/    # Sonuç ekranı
│   │   ├── Jokers/          # Joker bileşenleri
│   │   ├── TimerCircle/     # Zamanlayıcı
│   │   ├── AudienceVotes/   # Seyirci oyları
│   │   ├── PhoneHelp/       # Telefon jokeri
│   │   ├── Navbar/          # Navigasyon
│   │   └── Footer/          # Alt bilgi
│   ├── data/
│   │   └── questions.json   # Soru veritabanı
│   ├── styles/
│   │   └── main.scss        # Ana stil dosyası
│   ├── App.js              # Ana uygulama bileşeni
│   └── index.js            # Uygulama giriş noktası
└── package.json           # Proje bağımlılıkları
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn

### Kurulum Adımları

1. **Projeyi klonlayın**

   ```bash
   git clone [repository-url]
   cd quiz-app
   ```

2. **Bağımlılıkları yükleyin**

   ```bash
   npm install
   ```

3. **Uygulamayı başlatın**

   ```bash
   npm start
   ```

4. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

### Diğer Komutlar

```bash
# Production build oluşturma
npm run build

# Testleri çalıştırma
npm test

# Build dosyalarını analiz etme
npm run eject
```

## 🎯 Oyun Kuralları

1. **Başlangıç**: Kullanıcı adınızı girerek oyuna başlayın
2. **Sorular**: Her soru için 60 saniye süreniz var
3. **Jokerler**: 3 farklı joker hakkınız bulunuyor
4. **Puanlama**: Her doğru cevap için puan kazanırsınız
5. **Bitiş**: Tüm soruları tamamladığınızda sonucunuzu görürsünüz

## 🎨 Özelleştirme

### Yeni Soru Ekleme

`src/data/questions.json` dosyasına yeni sorular ekleyebilirsiniz:

```json
{
  "id": 11,
  "question": "Yeni soru metni?",
  "options": ["Seçenek 1", "Seçenek 2", "Seçenek 3", "Seçenek 4"],
  "answer": "Doğru cevap"
}
```

### Ses Efektleri

`public/sounds/` klasörüne yeni ses dosyaları ekleyebilirsiniz.

### Stil Değişiklikleri

`src/styles/main.scss` dosyasından renk ve tasarım özelleştirmeleri yapabilirsiniz.

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👨‍💻 Geliştirici

Bu proje modern web teknolojileri kullanılarak geliştirilmiştir. React'in en güncel özelliklerini kullanarak performanslı ve kullanıcı dostu bir deneyim sunmayı hedeflemektedir.

---

**Not**: Bu uygulama eğitim amaçlı geliştirilmiştir ve gerçek bir yarışma uygulaması değildir.
