import Brand from "../models/Brand";
import Product from "../models/Product";

class BrandService {
  static async createBrand(name: string, description: string): Promise<any> {
    try {
      const newBrand = await Brand.create({ name, description });
      return newBrand;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getAllBrands(page: number, pageSize: number): Promise<any> {
    try {
      const totalCount = await Brand.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);

      const brands = await Brand.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return {
        lists: brands,
        currentPage: page,
        totalPages,
        totalItems: totalCount,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getBrandById(id: string): Promise<any> {
    try {
      const brand = await Brand.findById(id);
      if (!brand) {
        throw new Error("Brand not found");
      }
      return brand;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async updateBrand(id: string, newData: any): Promise<any> {
    try {
      const updatedBrand = await Brand.findByIdAndUpdate(id, newData, {
        new: true,
      });
      if (!updatedBrand) {
        throw new Error("Brand not found");
      }
      return updatedBrand;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async deleteBrand(id: string): Promise<void> {
    try {
      const deletedBrand = await Brand.findByIdAndDelete(id);
      if (!deletedBrand) {
        throw new Error("Brand not found");
      }

      // Delete associated products
      await Product.deleteMany({ brand: deletedBrand._id });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default BrandService;
