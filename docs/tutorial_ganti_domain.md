# Tutorial Ganti Domain DuckDNS + Nginx + Certbot

> Ganti dari `kahfi.duckdns.org` → `web-sekolah.duckdns.org`

## 1. DuckDNS (via Browser)

1. Buka https://www.duckdns.org
2. Login pakai Google/GitHub
3. Klik **"add domain"**, ketik `web-sekolah`
4. Di baris `web-sekolah`, isi **Current IPv4** dengan IP server Oracle (cth: `141.147.xxx.xxx`)
5. Klik **"save"** (centang hijau)
6. Pastikan status ✅ hijau

---

## 2. SSH via Termius

Buka Termius → connect ke:
- Host: `kahfi.duckdns.org` (atau IP langsung)
- User: `ubuntu`
- Port: `22`
- Auth: Private Key (pilih file `.pem` atau `id_ed25519`)

---

## 3. Update Nginx

```bash
sudo nano /etc/nginx/sites-available/default
```

Cari baris:

```
server_name kahfi.duckdns.org;
```

Ganti jadi:

```
server_name web-sekolah.duckdns.org;
```

Simpan: `Ctrl+X` → `Y` → `Enter`

---

## 4. Reload Nginx

```bash
sudo nginx -t
```

Pastikan output:

```
nginx: the configuration file syntax is ok
nginx: configuration test is successful
```

Lalu:

```bash
sudo systemctl reload nginx
```

---

## 5. Certbot (HTTPS)

```bash
sudo certbot --nginx -d web-sekolah.duckdns.org
```

Pilih nomor untuk redirect HTTP→HTTPS (biasanya `2`).

Jika ada error "domain not found", tunggu 1-2 menit DNS propagasi, lalu ulangi.

---

## 6. Git Pull & Restart

```bash
cd /home/ubuntu/MID-SSD-Web-Sekolah-Kelompok-5
git pull origin master
pm2 restart web-sekolah
```

---

## 7. Test

Buka browser: **https://web-sekolah.duckdns.org**

---

## 8. Kalau ada error Nginx

Cek syntax:
```bash
sudo nginx -t
```

Cek log:
```bash
sudo journalctl -u nginx --no-pager -n 20
```

Cek apakah domain sudah mengarah ke IP:
```bash
nslookup web-sekolah.duckdns.org
```

---

## 9. Rollback (jika gagal)

```bash
sudo nano /etc/nginx/sites-available/default
# kembalikan ke kahfi.duckdns.org
sudo systemctl reload nginx
```
