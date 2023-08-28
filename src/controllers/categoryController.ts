import { Request, Response } from "express";
import CategoryService from "../services/categoryServices";

class CategoryController {
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      const newCategory = await CategoryService.createCategory(
        name,
        description
      );
      res.status(201).json(newCategory);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      const categories = await CategoryService.getAllCategories(page, pageSize);
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const CategoryId = req.params.id;
      const category = await CategoryService.getCategoryById(CategoryId);
      res.json(category);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const CategoryId = req.params.id;
      const newData = req.body;
      const updatedCategory = await CategoryService.updateCategory(
        CategoryId,
        newData
      );
      res.json(updatedCategory);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const CategoryId = req.params.id;
      await CategoryService.deleteCategory(CategoryId);
      res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default CategoryController;
