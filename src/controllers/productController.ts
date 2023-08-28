import { Request, Response } from "express";
import ProductService from "../services/productService";

class ProductController {
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        brand,
        categories,
        description,
        purchase_price,
        selling_price,
      } = req.body;
      const newProduct = await ProductService.createProduct(
        name,
        brand,
        categories,
        description,
        purchase_price,
        selling_price
      );
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const name = req.query.name as string;
      const brand = req.query.brand as string;

      if (name) {
        const products = await ProductService.getProductByName(
          name,
          page,
          pageSize
        );
        res.json(products);
      } else if (brand) {
        const products = await ProductService.getProductByBrand(
          brand,
          page,
          pageSize
        );
        res.json(products);
      } else {
        const products = await ProductService.getAllProducts(page, pageSize);
        res.json(products);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const ProductId = req.params.id;
      const product = await ProductService.getProductById(ProductId);
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProductByCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const categoryId = req.body.categories as string[];

      const products = await ProductService.getProductByCategories(
        categoryId,
        page,
        pageSize
      );
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const ProductId = req.params.id;
      const newData = req.body;
      const updatedProduct = await ProductService.updateProduct(
        ProductId,
        newData
      );
      res.json(updatedProduct);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const ProductId = req.params.id;
      await ProductService.deleteProduct(ProductId);
      res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProductController;
