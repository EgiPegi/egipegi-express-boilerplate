import { Request, Response } from "express";
import BrandService from "../services/brandService";

class BrandController {
  static async createBrand(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      const newBrand = await BrandService.createBrand(name, description);
      res.status(201).json(newBrand);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllBrands(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      const brands = await BrandService.getAllBrands(page, pageSize);
      res.json(brands);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBrandById(req: Request, res: Response): Promise<void> {
    try {
      const brandId = req.params.id;
      const brand = await BrandService.getBrandById(brandId);
      res.json(brand);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBrand(req: Request, res: Response): Promise<void> {
    try {
      const brandId = req.params.id;
      const newData = req.body;
      const updatedBrand = await BrandService.updateBrand(brandId, newData);
      res.json(updatedBrand);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBrand(req: Request, res: Response): Promise<void> {
    try {
      const brandId = req.params.id;
      await BrandService.deleteBrand(brandId);
      res.json({ message: "Brand deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default BrandController;
