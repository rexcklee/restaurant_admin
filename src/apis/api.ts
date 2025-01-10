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
  //apiHost: string = import.meta.env.VITE_API_URL;
  apiHost: string = "https://restaurant-server.rexlee.space";

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
    return this.apiCall("POST", path, request_data, isProtected);
  }

  protected async postfile(
    path: string,
    request_data: object,
    isProtected: boolean = false
  ): Promise<DataResponse> {
    return this.apiCallFile("POST", path, request_data, isProtected);
  }

  private async apiCall(
    method: string,
    path: string,
    request_data: object,
    isProtected: boolean
  ): Promise<DataResponse> {
    if (path === "") throw new Error("path is empty");

    const request_path = isProtected ? `/${path}` : `/${path}`;
    const url = `${this.apiHost}${request_path}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: "",
    };

    if (isProtected) {
      const token = this.getToken();
      if (token === "") throw new Error("Token is empty");
      headers.Authorization = "Bearer " + token;
    }

    const fetchOptions: any = {
      method: method,
      headers: headers,
    };

    if (method !== "GET") {
      fetchOptions.body = JSON.stringify(request_data);
    }

    return fetch(url, fetchOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 403) {
          return { code: 403, message: "Forbidden" };
        } else {
          throw new Error("API call failed");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  private async apiCallFile(
    method: string,
    path: string,
    request_data: object,
    isProtected: boolean
  ): Promise<DataResponse> {
    if (path === "") throw new Error("path is empty");

    const url = `${this.apiHost}/${path}`;

    const headers: Record<string, string> = {
      Authorization: "",
    };

    if (isProtected) {
      const token = this.getToken();
      if (token === "") {
        throw new Error("Token is empty");
      }
      headers.Authorization = "Bearer " + token;
    }

    const fetchOptions: any = {
      method: method,
      headers: headers,
    };

    if (method !== "GET") {
      fetchOptions.body = request_data;
    }

    return fetch(url, fetchOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 403) {
          return { code: 403, message: "Forbidden" };
        } else {
          throw new Error("API call failed");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // Method getToken needs to be defined
  private getToken(): string {
    const token = localStorage.getItem("token");
    return token || "";
  }
}

export { DataResponse };
export default API;
