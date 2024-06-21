import API, { DataResponse } from "./api";

export interface Order {
  key: string;
  order_id: number;
  order_number: string;
  customer_id: number;
  order_date: Date | null;
  total_amount: number;
  order_status: string;
  phone_number: string;
  shipping_address: string;
  billing_address: string;
  payment_method: string;
  payment_status: string;
  comments: string;
}

export interface OrderItem {
  key: React.Key;
  order_item_id: number;
  order_id: number;
  order_number: string;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_name: string;
}

export default class OrderAPI extends API {
  public async orderTableColumns(): Promise<DataResponse> {
    return this.get("orders/order_table_columns", true);
  }

  public async orderList(): Promise<DataResponse> {
    return this.get("orders", true);
  }

  public async orderItemsList(): Promise<DataResponse> {
    return this.get("orders/order_items", true);
  }

  //   public async createOrder(newOrder: Order): Promise<DataResponse> {
  //     return this.post("orders/create_order", newOrder, true);
  //   }

  public async updateOrder(editedOrder: Order): Promise<DataResponse> {
    return this.post("orders/update_order", editedOrder, true);
  }

  public async deleteOrder(order_id: number): Promise<DataResponse> {
    return this.post("orders/delete_order", { order_id: order_id }, true);
  }
}
