# Kage no Ōkoku Site Yönetim Rehberi

## Hızlı ayarlar

Sunucu adresi, Discord bağlantısı, indirme bağlantısı ve üst duyuru için yalnızca `assets/config.js` dosyasını düzenleyin.

### Sunucu IP ve port

```js
server: {
  address: 'play.siteadi.com',
  port: 19132,
  maxPlayers: 30
}
```

Adres boş olduğunda site otomatik olarak “Sunucu Yakında” gösterir. Adres girildiğinde Bedrock sunucusunun çevrim içi durumu ve oyuncu sayısı otomatik sorgulanır.

### Discord

```js
discordUrl: 'https://discord.gg/ornek'
```

Boş bırakılırsa Discord düğmesi görünmez.

### Addon indirme

```js
downloadUrl: ''
```

Birleşik sürüm testleri tamamlanana kadar boş bırakılmalıdır.

### Duyuru

`announcement.enabled` değerini `true` veya `false` yapın. Duyuru değiştiğinde `id` değerini de değiştirin; böylece önceki duyuruyu kapatan ziyaretçiler yeni duyuruyu görür.

## Ücretsiz yayınlama

Cloudflare Pages üzerinden Direct Upload kullanarak bu klasörün tamamını yükleyebilirsiniz. Ana giriş dosyası `index.html` dosyasıdır. Özel alan adı olmadan `pages.dev` adresiyle çalışır.

## Sayfalar

- `index.html`: Ana sayfa
- `sistemler.html`: Sistemler ve ayrıntılar
- `npcler.html`: NPC ansiklopedisi
- `rehber.html`: Oyuncu rehberi
- `gelistirme.html`: Yol haritası ve sürümler
- `sunucu.html`: Sunucu durumu
- `galeri.html`: Görsel galeri
- `hakkinda.html`: Proje ve bildirim formu
- `404.html`: Bulunamayan sayfa

## Çevrimdışı uygulama

Site HTTPS üzerinde yayınlandığında `sw.js` devreye girer ve temel sayfaları önbelleğe alır. Uygun tarayıcılarda “Siteyi uygulama olarak yükle” düğmesi otomatik görünür.
