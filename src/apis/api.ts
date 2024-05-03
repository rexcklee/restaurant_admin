class DataResponse {
  code: number;
  message: string;
  data: any;

  constructor(code: number, message: string, data: any) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

class API {
  apiHost: string = "http://localhost:3001";

  constructor() {
    this.apiHost = "http://localhost:3001";
  }

  protected async get(
    path: string,
    isProtected: boolean = false
  ): Promise<DataResponse> {
    // Utilizing apiCall method to fetch data
    return this.apiCall("GET", path, {}, isProtected);
  }

  protected async post(
    path: string,
    request_data: object,
    isProtected: boolean = false
  ): Promise<DataResponse> {
    // Utilizing apiCall method to fetch data
    return this.apiCall("POST", path, request_data, isProtected);
  }

  private async apiCall(
    method: string,
    path: string,
    request_data: object,
    isProtected: boolean
  ): Promise<DataResponse> {
    if (path === "") throw new Error("path is empty");

    const request_path = isProtected ? `/admin/${path}` : `/${path}`;
    const url = `${this.apiHost}${request_path}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: "",
    };

    if (isProtected) {
      const token = this.getToken();
      if (token === "") throw new Error("Token is empty");
      headers.Authorization = token;
    }

    const fetchOptions: any = {
      method: method,
      headers: headers,
    };

    if (method !== "GET") {
      fetchOptions.body = JSON.stringify(request_data);
    }

    return fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((res: DataResponse) => {
        if (res.code === 200) {
          return res;
        } else {
          if (res.code === 401) {
            return res;
          }
          throw new Error("API call failed");
        }
      });
  }

  // Method getToken needs to be defined
  private getToken(): string {
    return "";
  }
}

export { DataResponse };
export default API;
