const enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const DefualtHeaders = {
  [METHODS.GET]: { accept: "application/json" },
  [METHODS.POST]: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  [METHODS.PUT]: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  [METHODS.DELETE]: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

type TRequestOptions = {
  method: METHODS;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  timeout?: number;
};

type TRequestOptionsWithoutMethod = Omit<TRequestOptions, "method">;

function queryStringify(data: any) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

type THttpMethod = (
  url: string,
  options?: TRequestOptionsWithoutMethod
) => Promise<any>;

class HTTPTransport {
  baseURL: string = "";

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }

  get: THttpMethod = (url, options = {}) => {
    const { data } = options;
    if (data) {
      url = `${url}${queryStringify(data)}`;
      options.data = undefined;
    }
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post: THttpMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put: THttpMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete: THttpMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (apiURL: string, options: TRequestOptions) => {
    const { method, data, timeout = 5000 } = options;
    const headers = { ...DefualtHeaders[method], ...options.headers };

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("No request method provided"));
        return;
      }

      const xhr = new XMLHttpRequest();
      const url = `${this.baseURL}/${apiURL}`;
      xhr.open(method, url);

      xhr.responseType = "json";
      xhr.withCredentials = true;

      Object.entries(headers).forEach(([key, value]: [string, string]) => {
        if (value !== "multipart/form-data") {
          xhr.setRequestHeader(key, value);
        }
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (!data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    }) as Promise<any>;
  };
}

export const baseURL = "https://ya-praktikum.tech/api/v2";

export default new HTTPTransport({
  baseURL,
});
