import API, { DataResponse } from "./api";

// export interface Product {
//   product_id: number;
//   product_name: string;
//   product_description: string;
//   product_price: number;
//   category_id: number;
// }

export default class GoogleAPI extends API {
  public async uploadImage(formData: FormData): Promise<DataResponse> {
    return this.postfile("uploadGoogle", formData, true);
    // return this.post("uploadGoogle", formData, true);
  }

  public async deleteImage(image_id: string): Promise<DataResponse> {
    return this.post("uploadGoogle/delete_image", { image_id: image_id }, true);
  }

  //   public async updateProduct(editedProduct: Product): Promise<DataResponse> {
  //     return this.post("products/update_product", editedProduct, true);
  //   }

  //   public async deleteProduct(product_id: number): Promise<DataResponse> {
  //     return this.post(
  //       "products/delete_product",
  //       { product_id: product_id },
  //       true
  //     );
}
