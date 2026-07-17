# Kage no Ōkoku İnternet Sitesi

Hazır, statik ve telefon uyumlu tanıtım sitesidir. Sunucu gerektirmez; Cloudflare Pages, GitHub Pages veya Netlify üzerinde ücretsiz yayımlanabilir.

## Sunucu adresini ekleme

`assets/app.js` dosyasındaki şu satırı düzenleyin:

```js
const SERVER_ADDRESS='play.ornek.com:19132';
```

Alan boşken sitede “Sunucu yakında” yazısı görünür. Adres girildiğinde çevrim içi durum ve oyuncu sayısı otomatik alınır.

## Ücretsiz yayınlama

Cloudflare Pages panelinde **Direct Upload** seçin ve bu klasörün tamamını yükleyin. Alternatif olarak klasörü GitHub deposuna koyup GitHub Pages'i etkinleştirin.

## Paket bilgileri

- Proje: Kage no Ōkoku v1.6.44 geliştirme dönemi
- Minimum Minecraft Bedrock: 1.21.90
- Sayfa dili: Türkçe
- Addon paketi site dosyalarına dahil değildir.
