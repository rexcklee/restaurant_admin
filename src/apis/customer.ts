import API, { DataResponse } from "./api";

export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  password: string;
  phone_number: string | null;
  address: string | null;
  registration_date: Date | null;
  last_login: Date | null;
  payment_method: string | null;
}

export default class CustomerAPI extends API {
  public async customerList(): Promise<DataResponse> {
    return this.get("customers", true);
  }

  public async addCustomer(newCustomer: Customer): Promise<DataResponse> {
    return this.post("customers/add_customer", newCustomer, true);
  }

  public async updateCustomer(editedCustomer: Customer): Promise<DataResponse> {
    return this.post("customers/update_customer", editedCustomer, true);
  }

  public async deleteCustomer(customer_id: number): Promise<DataResponse> {
    return this.post(
      "customers/delete_customer",
      { customer_id: customer_id },
      true
    );
  }
}
