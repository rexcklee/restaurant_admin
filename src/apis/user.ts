import API, { DataResponse } from "./api";

export interface AdminUser {
  admin_id: number;
  first_name: string;
  last_name: string;
  mobile: string | null;
  email: string | null;
  password_hash: string;
  is_superadmin: number;
  last_login: Date | null;
  token: string | null;
  token_expiry: Date | null;
}

export default class AdminUserAPI extends API {
  public async adminUserList(): Promise<DataResponse> {
    return this.get("admin_users", true);
  }
}
