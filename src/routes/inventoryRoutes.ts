import * as express from "express";
import authorize from "../middlewares/authorize";
import BrandController from "../controllers/brandController";
import CategoryController from "../controllers/categoryController";
import ProductController from "../controllers/productController";

const router = express.Router();

//brand===================================================================================================//
// Brand Routes
/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Endpoint untuk mengelola merek (brand) produk
 */

/**
 * @swagger
 * /api/inventories/brand:
 *   post:
 *     summary: Membuat merek (brand) baru
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Nike
 *               description: Merek sepatu dan pakaian olahraga
 *     responses:
 *       201:
 *         description: Merek (brand) berhasil dibuat.
 *         content:
 *           application/json:
 *             example:
 *               _id: 12345
 *               name: Nike
 *               description: Merek sepatu dan pakaian olahraga
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.post("/brand", authorize(["admin"]), BrandController.createBrand);

/**
 * @swagger
 * /api/inventories/brands:
 *   get:
 *     summary: Mendapatkan daftar semua merek (brand)
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Nomor halaman (opsional)
 *         required: false
 *         schema:
 *           type: integer
 *       - name: pageSize
 *         in: query
 *         description: Jumlah item per halaman (opsional)
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Daftar merek (brand) berhasil diambil.
 *         content:
 *           application/json:
 *             example:
 *               lists: [{ _id: 12345, name: "Nike", description: "Merek sepatu dan pakaian olahraga" }, ...]
 *               currentPage: 1
 *               totalPages: 3
 *               totalItems: 10
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.get("/brands", authorize(["admin"]), BrandController.getAllBrands);

/**
 * @swagger
 * /api/inventories/brand/{id}:
 *   get:
 *     summary: Mendapatkan informasi merek (brand) berdasarkan ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID merek (brand) yang akan diambil informasinya
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informasi merek (brand) berhasil diambil.
 *         content:
 *           application/json:
 *             example:
 *               _id: 12345
 *               name: Nike
 *               description: Merek sepatu dan pakaian olahraga
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Merek (brand) tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.get("/brand/:id", authorize(["admin"]), BrandController.getBrandById);

/**
 * @swagger
 * /api/inventories/brand/{id}:
 *   put:
 *     summary: Memperbarui informasi merek (brand) berdasarkan ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID merek (brand) yang akan diperbarui informasinya
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Nike
 *               description: Merek sepatu dan pakaian olahraga
 *     responses:
 *       200:
 *         description: Informasi merek (brand) berhasil diperbarui.
 *         content:
 *           application/json:
 *             example:
 *               _id: 12345
 *               name: Nike
 *               description: Merek sepatu dan pakaian olahraga (diperbarui)
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Merek (brand) tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.put("/brand/:id", authorize(["admin"]), BrandController.updateBrand);

/**
 * @swagger
 * /api/inventories/brand/{id}:
 *   delete:
 *     summary: Menghapus merek (brand) berdasarkan ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID merek (brand) yang akan dihapus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Merek (brand) berhasil dihapus.
 *         content:
 *           application/json:
 *             example:
 *               message: Merek (brand) berhasil dihapus.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Merek (brand) tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.delete("/brand/:id", authorize(["admin"]), BrandController.deleteBrand);

//categories===================================================================================================//
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoint untuk mengelola kategori produk
 */

/**
 * @swagger
 * /api/inventories/category:
 *   post:
 *     summary: Membuat kategori baru
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Sepatu
 *               description: Kategori produk sepatu
 *     responses:
 *       201:
 *         description: Kategori berhasil dibuat.
 *         content:
 *           application/json:
 *             example:
 *               _id: 67890
 *               name: Sepatu
 *               description: Kategori produk sepatu
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.post(
  "/category",
  authorize(["admin"]),
  CategoryController.createCategory
);

/**
 * @swagger
 * /api/inventories/categories:
 *   get:
 *     summary: Mendapatkan daftar semua kategori
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Nomor halaman (opsional)
 *         required: false
 *         schema:
 *           type: integer
 *       - name: pageSize
 *         in: query
 *         description: Jumlah item per halaman (opsional)
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Daftar kategori berhasil diambil.
 *         content:
 *           application/json:
 *             example:
 *               lists: [{ _id: 67890, name: "Sepatu", description: "Kategori produk sepatu" }, ...]
 *               currentPage: 1
 *               totalPages: 3
 *               totalItems: 10
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.get(
  "/categories",
  authorize(["admin"]),
  CategoryController.getAllCategories
);

/**
 * @swagger
 * /api/inventories/category/{id}:
 *   get:
 *     summary: Mendapatkan informasi kategori berdasarkan ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID kategori yang akan diambil informasinya
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informasi kategori berhasil diambil.
 *         content:
 *           application/json:
 *             example:
 *               _id: 67890
 *               name: Sepatu
 *               description: Kategori produk sepatu
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Kategori tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.get(
  "/category/:id",
  authorize(["admin"]),
  CategoryController.getCategoryById
);

/**
 * @swagger
 * /api/inventories/category/{id}:
 *   put:
 *     summary: Memperbarui informasi kategori berdasarkan ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID kategori yang akan diperbarui informasinya
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Sepatu
 *               description: Kategori produk sepatu (diperbarui)
 *     responses:
 *       200:
 *         description: Informasi kategori berhasil diperbarui.
 *         content:
 *           application/json:
 *             example:
 *               _id: 67890
 *               name: Sepatu
 *               description: Kategori produk sepatu (diperbarui)
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Kategori tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.put(
  "/category/:id",
  authorize(["admin"]),
  CategoryController.updateCategory
);

/**
 * @swagger
 * /api/inventories/category/{id}:
 *   delete:
 *     summary: Menghapus kategori berdasarkan ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID kategori yang akan dihapus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus.
 *         content:
 *           application/json:
 *             example:
 *               message: Kategori berhasil dihapus.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Kategori tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.delete(
  "/category/:id",
  authorize(["admin"]),
  CategoryController.deleteCategory
);

//products===================================================================================================//
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoint untuk mengelola produk
 */

/**
 * @swagger
 * /api/inventories/product:
 *   post:
 *     summary: Membuat produk baru
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               purchase_price:
 *                 type: number
 *               selling_price:
 *                 type: number
 *             example:
 *               name: Sepatu Olahraga
 *               brand: 12345
 *               categories: ["67890", "34567"]
 *               description: Produk sepatu olahraga berkualitas
 *               purchase_price: 50
 *               selling_price: 100
 *     responses:
 *       201:
 *         description: Produk berhasil dibuat.
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456
 *               name: Sepatu Olahraga
 *               brand: 12345
 *               categories: ["67890", "34567"]
 *               description: Produk sepatu olahraga berkualitas
 *               purchase_price: 50
 *               selling_price: 100
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.post("/product", authorize(["admin"]), ProductController.createProduct);

/**
 * @swagger
 * /api/inventories/products:
 *   get:
 *     summary: Mendapatkan daftar semua produk atau produk berdasarkan nama atau merek
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Halaman yang akan diambil
 *         required: false
 *         schema:
 *           type: integer
 *       - name: pageSize
 *         in: query
 *         description: Jumlah produk per halaman
 *         required: false
 *         schema:
 *           type: integer
 *       - name: name
 *         in: query
 *         description: Nama produk yang akan dicari
 *         required: false
 *         schema:
 *           type: string
 *       - name: brand
 *         in: query
 *         description: ID merek produk yang akan dicari
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Daftar produk berhasil diambil.
 *         content:
 *           application/json:
 *             example:
 *               lists: [...list_of_products]
 *               currentPage: 1
 *               totalPages: 5
 *               totalItems: 42
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.get("/products", authorize(["admin"]), ProductController.getAllProducts);

/**
 * @swagger
 * /api/inventories/products/by-categories:
 *   post:
 *     summary: Mendapatkan daftar produk berdasarkan kategori
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               categories: ["67890", "34567"]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Halaman yang akan diambil
 *         required: false
 *         schema:
 *           type: integer
 *       - name: pageSize
 *         in: query
 *         description: Jumlah produk per halaman
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Daftar produk berhasil diambil berdasarkan kategori.
 *         content:
 *           application/json:
 *             example:
 *               lists: [...list_of_products]
 *               currentPage: 1
 *               totalPages: 3
 *               totalItems: 25
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.post(
  "/products/by-categories",
  authorize(["admin"]),
  ProductController.getProductByCategory
);

/**
 * @swagger
 * /api/inventories/product/{id}:
 *   get:
 *     summary: Mendapatkan detail produk berdasarkan ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID produk yang akan dicari
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detail produk berhasil diambil berdasarkan ID.
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456
 *               name: Sepatu Olahraga
 *               brand: { _id: 123, name: "Nike" }
 *               categories: [
 *                 { _id: 678, name: "Lari" },
 *                 { _id: 345, name: "Olahraga Umum" }
 *               ]
 *               description: Produk sepatu olahraga berkualitas
 *               purchase_price: 50
 *               selling_price: 100
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.get(
  "/product/:id",
  authorize(["admin"]),
  ProductController.getProductById
);

/**
 * @swagger
 * /api/inventories/product/{id}:
 *   put:
 *     summary: Mengupdate detail produk berdasarkan ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID produk yang akan diupdate
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               purchase_price:
 *                 type: number
 *               selling_price:
 *                 type: number
 *             example:
 *               name: Sepatu Olahraga Baru
 *               brand: "67890"
 *               categories: ["12345", "23456"]
 *               description: Produk sepatu olahraga berkualitas tinggi
 *               purchase_price: 60
 *               selling_price: 120
 *     responses:
 *       200:
 *         description: Detail produk berhasil diupdate berdasarkan ID.
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456
 *               name: Sepatu Olahraga Baru
 *               brand: { _id: 678, name: "Nike" }
 *               categories: [
 *                 { _id: 123, name: "Lari" },
 *                 { _id: 234, name: "Olahraga Umum" }
 *               ]
 *               description: Produk sepatu olahraga berkualitas tinggi
 *               purchase_price: 60
 *               selling_price: 120
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.put(
  "/product/:id",
  authorize(["admin"]),
  ProductController.updateProduct
);

/**
 * @swagger
 * /api/inventories/product/{id}:
 *   delete:
 *     summary: Menghapus produk berdasarkan ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID produk yang akan dihapus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus berdasarkan ID.
 *         content:
 *           application/json:
 *             example:
 *               message: Produk berhasil dihapus.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.delete(
  "/product/:id",
  authorize(["admin"]),
  ProductController.deleteProduct
);

export default router;
