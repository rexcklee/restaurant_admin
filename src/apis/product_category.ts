import API, { DataResponse } from "./api";

export interface ProductCategory {
  category_id: number;
  category_name: string;
}

export default class ProductCategoryAPI extends API {
  public async productCategoryList(): Promise<DataResponse> {
    return this.get("productCategory", true);
  }

  public async addProductCategory(
    newProductCategory: ProductCategory
  ): Promise<DataResponse> {
    return this.post(
      "productCategory/add_product_category",
      newProductCategory,
      true
    );
  }

  public async updateProductCategory(
    editedProductCategory: ProductCategory
  ): Promise<DataResponse> {
    return this.post(
      "productCategory/update_product_category",
      editedProductCategory,
      true
    );
  }

  public async deleteProductCategory(
    category_id: number
  ): Promise<DataResponse> {
    return this.post(
      "productCategory/delete_product_category",
      { category_id: category_id },
      true
    );
  }
}
