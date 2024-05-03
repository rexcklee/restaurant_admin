import API, { DataResponse } from "./api";

export default class AuthAPI extends API {
  public async login(email: string, password: string): Promise<DataResponse> {
    return this.post("auth/login", { email: email, password: password });
  }
}
