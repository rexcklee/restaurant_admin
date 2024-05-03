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
    isProtected: boolean
  ): Promise<DataResponse> {
    // Utilizing apiCall method to fetch data
    return this.apiCall("GET", path, isProtected);
  }

  private async apiCall(
    method: string,
    path: string,
    //request_data: any,
    isProtected: boolean
  ): Promise<DataResponse> {
    const url = `${this.apiHost}${path}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: "",
    };

    if (isProtected) {
      const token = this.getToken();
      if (token === "") throw new Error("Token is empty");
      headers.Authorization = token;
    }

    return fetch(url, {
      method: method,
      headers: headers,
      //body: JSON.stringify(request_data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          return res;
        } else {
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
