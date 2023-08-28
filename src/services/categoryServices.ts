import Category from "../models/Category";
import Product from "../models/Product";

class CategoryService {
  static async createCategory(name: string, description: string): Promise<any> {
    try {
      const newCategory = await Category.create({ name, description });
      return newCategory;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getAllCategories(page: number, pageSize: number): Promise<any> {
    try {
      const totalCount = await Category.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);

      const categories = await Category.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return {
        lists: categories,
        currentPage: page,
        totalPages,
        totalItems: totalCount,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getCategoryById(id: string): Promise<any> {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async updateCategory(id: string, newData: any): Promise<any> {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, newData, {
        new: true,
      });
      if (!updatedCategory) {
        throw new Error("Category not found");
      }
      return updatedCategory;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async deleteCategory(id: string): Promise<void> {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        throw new Error("Category not found");
      }

      // Delete associated products
      await Product.deleteMany({ Category: deletedCategory._id });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default CategoryService;
