# Contoh Express Typescript JWT + Refresh Token dengan MongoDB

Ini adalah contoh implementasi mekanisme autentikasi JSON Web Token (JWT) dengan menggunakan mekanisme refresh token di aplikasi Express.

## Fitur

- Registrasi pengguna baru
- Otentikasi dengan access token
- Refresh token untuk memperbarui access token

## Penggunaan

1. Instalasi depedensi:

```
npm install
```

atau

```
yarn install
```

2. Konfigurasi .env:

Salin berkas `.env.example` menjadi `.env` dan atur konfigurasi yang sesuai.

3. Jalankan Aplikasi:

```
npm run dev
```

atau

```
yarn dev
```

4. Registrasi Pengguna:

- Endpoint: `POST /auth/register`
- Contoh permintaan:
  ```json
  {
    "username": "egipegi",
    "password": "password123",
    "role": "admin"
  }
  ```

5. Masuk (Login) Pengguna:

- Endpoint: `POST /auth/login`
- Contoh permintaan:
  ```json
  {
    "username": "john",
    "password": "password123"
  }
  ```
- Respon:
  ```json
  {
    "token": "access_token",
    "refreshToken": "refresh_token"
  }
  ```

6. Memperbarui Access Token (Refresh Token):

- Endpoint: `POST /auth/refresh`
- Contoh permintaan:
  ```json
  {
    "refreshToken": "refresh_token"
  }
  ```
- Respon:
  ```json
  {
    "token": "new_access_token"
  }
  ```

## Catatan

Pastikan untuk mengganti nilai `process.env.JWT_SECRET` dengan secret key yang sesuai yang Anda gunakan dalam aplikasi Anda.

Dokumentasi ini hanya memberikan contoh implementasi mekanisme refresh token dalam aplikasi Express. Anda perlu memperhatikan aspek keamanan seperti HTTPS, perlindungan terhadap serangan CSRF, dan lain-lain dalam pengembangan aplikasi produksi.

---

Dibuat dengan 💙 oleh EgiPegi
