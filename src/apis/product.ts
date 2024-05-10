import API, { DataResponse } from "./api";

export interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  category_id: number;
}

export default class ProductAPI extends API {
  public async productList(): Promise<DataResponse> {
    return this.get("products", true);
  }

  public async addProduct(newProduct: Product): Promise<DataResponse> {
    return this.post("products/add_product", newProduct, true);
  }

  public async updateProduct(editedProduct: Product): Promise<DataResponse> {
    return this.post("products/update_product", editedProduct, true);
  }

  public async deleteProduct(product_id: number): Promise<DataResponse> {
    return this.post(
      "products/delete_product",
      { product_id: product_id },
      true
    );
  }
}
