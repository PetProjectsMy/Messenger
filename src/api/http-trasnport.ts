const enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const DefualtHeaders = {
  GET: { accept: "application/json" },
  POST: { "Content-Type": "application/json", accept: "application/json" },
  PUT: { "Content-Type": "application/json", accept: "application/json" },
  DELETE: { accept: "application/json" },
};

type TRequestOptions = {
  method: METHODS;
  headers?: Record<string, string>;
  data?: Record<string, string>;
  timeout?: number;
};

type TRequestOptionsWithoutMethod = Omit<TRequestOptions, "method">;

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data: any) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

class HTTPTransport {
  baseURL: string = "";

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }

  get = (url: string, options: TRequestOptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post = (url: string, options: TRequestOptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put = (url: string, options: TRequestOptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete = (url: string, options: TRequestOptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (apiURL: string, options: TRequestOptions) => {
    const { method, data, timeout = 5000 } = options;
    const headers = options.headers ?? DefualtHeaders[method];

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("No request method provided"));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      const url = `${this.baseURL}/${apiURL}`;
      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);
      xhr.responseType = "json";

      Object.entries(headers).forEach(([key, value]: [string, string]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    }) as Promise<any>;
  };
}

export default new HTTPTransport({
  baseURL: "https://ya-praktikum.tech/api/v2",
});
