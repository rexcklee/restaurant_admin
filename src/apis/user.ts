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
  // token: string | null;
  // token_expiry: Date | null;
}

export interface UpdatedPassword {
  admin_id: number | null;
  old_password: string | null;
  new_password: string | null;
}

export default class AdminUserAPI extends API {
  public async adminUserList(): Promise<DataResponse> {
    return this.get("admin_users", true);
  }

  public async addAdminUser(newUser: AdminUser): Promise<DataResponse> {
    return this.post("admin_users/add_user", newUser, true);
  }

  public async updateAdminUser(editedUser: AdminUser): Promise<DataResponse> {
    return this.post("admin_users/update_user", editedUser, true);
  }

  public async deleteAdminUser(admin_id: number): Promise<DataResponse> {
    return this.post("admin_users/delete_user", { admin_id: admin_id }, true);
  }

  public async updatePassword(
    updatedPassword: UpdatedPassword
  ): Promise<DataResponse> {
    return this.post("admin_users/update_password", updatedPassword, true);
  }
}
