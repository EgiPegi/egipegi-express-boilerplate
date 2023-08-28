import * as express from "express";
import AuthController from "../controllers/authController";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoint untuk otentikasi pengguna
 */
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrasi pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               username: egipegi
 *               password: pass123
 *               role: admin
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Pesan error sesuai penyebab.
 */
// Rute untuk mendaftarkan pengguna baru
router.post("/register", AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Masuk ke akun pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: egipegi
 *               password: pass123
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               { _id: 1, username: "egipegi", token: "your_access_token_here", refreshToken: "your_refresh_token_here" }
 *       401:
 *         description: Invalid credentials.
 */
// Rute untuk proses login
router.post("/login", AuthController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Memperbarui token akses dengan refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: your_refresh_token_here
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               { token: "your_access_token_here", refreshToken: "your_refresh_token_here" }
 *       400:
 *         description: Invalid refresh token.
 */
// Rute untuk memperbarui token akses dengan refresh token
router.post("/refresh", AuthController.refreshToken);

export default router;
