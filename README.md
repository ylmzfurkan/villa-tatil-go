# VillaTatilGo

Kaş ve çevresindeki kiralık villaları sergileyen, rezervasyon talebi ve yönetim paneli akışlarını içeren demo web uygulaması.

## Canlı sürüm

- GitHub Pages: <https://ylmzfurkan.github.io/villa-tatil-go/>
- Admin paneli: <https://ylmzfurkan.github.io/villa-tatil-go/admin/>

## Yerel geliştirme

```bash
npm install
npm run dev
```

## Derleme

Cloudflare/Vinext sürümü:

```bash
npm run build
```

GitHub Pages statik sürümü:

```bash
GITHUB_ACTIONS=true \
GITHUB_REPOSITORY=ylmzfurkan/villa-tatil-go \
NEXT_PUBLIC_BASE_PATH=/villa-tatil-go \
npm run build:pages
```

`main` dalına yapılan push işlemleri GitHub Actions üzerinden Pages dağıtımını otomatik başlatır.
