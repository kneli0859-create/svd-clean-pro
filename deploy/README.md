# deploy/

Снимки на production конфигурация на VPS-а (Contabo 109.199.110.61).

## nginx/svd-clean.conf.production
Файлът на VPS-а живее на `/etc/nginx/sites-available/svd-clean.conf`,
linked в `/etc/nginx/sites-enabled/`.

Certbot управлява SSL директивите автоматично.
Сертификати: `/etc/letsencrypt/live/svd-clean.de/`.

## Reload nginx
```bash
nginx -t && systemctl reload nginx
```

## SSL renewal
Автоматично през `certbot.timer`. Ръчно: `certbot renew`.

## Portове
- 3000 = app.svd-clean.de
- 3001 = demo.svd-clean.de
- 3002 = musterfirma.svd-clean.de
