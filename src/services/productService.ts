import Brand from "../models/Brand";
import Category from "../models/Category";
import Product from "../models/Product";

class ProductService {
  static async createProduct(
    name: string,
    brandId: string,
    categoryIds: string[],
    description: string,
    purchase_price: number,
    selling_price: number
  ): Promise<any> {
    try {
      console.log(brandId);
      const brand = await Brand.findById(brandId);
      if (!brand) {
        throw new Error("Brand not found");
      }

      const categories = await Category.find({ _id: { $in: categoryIds } });
      if (categories.length !== categoryIds.length) {
        throw new Error("One or more categories not found");
      }

      const newProduct = await Product.create({
        name,
        brand: brand._id,
        categories: categories.map((category) => category._id),
        description,
        purchase_price,
        selling_price,
      });

      return newProduct;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getAllProducts(page: number, pageSize: number): Promise<any> {
    try {
      const totalCount = await Product.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);

      const products = await Product.find()
        .populate("brand", "name")
        .populate("categories", "name")
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return {
        lists: products,
        currentPage: page,
        totalPages,
        totalItems: totalCount,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getProductById(id: string): Promise<any> {
    try {
      const product = await Product.findById(id)
        .populate("brand", "name")
        .populate("categories", "name");
      if (!product) {
        throw new Error("product not found");
      }
      return product;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getProductByName(
    name: string,
    page: number,
    pageSize: number
  ): Promise<any> {
    try {
      const totalCount = await Product.countDocuments({
        name: { $regex: name, $options: "i" }, // Case-insensitive search
      });
      const totalPages = Math.ceil(totalCount / pageSize);

      const products = await Product.find({
        name: { $regex: name, $options: "i" },
      })
        .populate("brand", "name")
        .populate("categories", "name")
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return {
        lists: products,
        currentPage: page,
        totalPages,
        totalItems: totalCount,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getProductByCategories(
    categoryIds: string[],
    page: number,
    pageSize: number
  ): Promise<any> {
    try {
      const totalCount = await Product.countDocuments({
        categories: { $all: categoryIds },
      });
      const totalPages = Math.ceil(totalCount / pageSize);

      const products = await Product.find({
        categories: { $all: categoryIds },
      })
        .populate("brand", "name")
        .populate("categories", "name")
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return {
        lists: products,
        currentPage: page,
        totalPages,
        totalItems: totalCount,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getProductByBrand(
    brandId: string,
    page: number,
    pageSize: number
  ): Promise<any> {
    try {
      const totalCount = await Product.countDocuments({ brand: brandId });
      const totalPages = Math.ceil(totalCount / pageSize);

      const products = await Product.find({ brand: brandId })
        .populate("brand", "name")
        .populate("categories", "name")
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return {
        lists: products,
        currentPage: page,
        totalPages,
        totalItems: totalCount,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async updateProduct(id: string, newData: any): Promise<any> {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, newData, {
        new: true,
      });
      if (!updatedProduct) {
        throw new Error("Category not found");
      }
      return updatedProduct;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async deleteProduct(id: string): Promise<void> {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error("Product not found");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default ProductService;
