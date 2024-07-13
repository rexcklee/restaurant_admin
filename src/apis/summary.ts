import API, { DataResponse } from "./api";

export interface Summary {
  order_number_total: number;
  order_number_in_a_year: { month: string; order_no: number }[];
  order_amount_total: string;
  order_amount_in_a_year: { month: string; total_amount: string }[];
  top5_products: { sold: number; product_id: number; product_name: string }[];
  customer_number: number;
}

export default class SummaryAPI extends API {
  public async getSummary(): Promise<DataResponse> {
    return this.get("summary", true);
  }
}
