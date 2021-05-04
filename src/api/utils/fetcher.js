const API_URL = "http://127.0.0.1:5000";

const objectToQueryString = (obj) => {
  const nullValues = ["", undefined];
  const validParamKeys = Object.keys(obj).filter((key) =>
    nullValues.every((element) => element !== obj[key])
  );
  return validParamKeys.map((key) => `${key}=${obj[key]}`).join("&");
};

const getParams = ({ method = "GET", params }) => {
  if (params) {
    if (method === "GET") {
      return `?${objectToQueryString(params)}`;
    }
  }
  return "";
};

const getUrl = (options, basePath = API_URL) => {
  const queryString = getParams(options);
  return `${basePath}/${options.endPoint}${queryString}`;
};

const getHeaders = (headers = {}) => {
  const httpHeaders = new Headers();
  Object.keys(headers).forEach((key) => {
    httpHeaders.append(key, headers[key]);
  });

  httpHeaders.append("Content-Type", "application/json");
  httpHeaders.append("Source", "CUSTOMER");

  return httpHeaders;
};

const getOptions = ({
  methodType: method = "GET",
  headers = {},
  body = {},
}) => {
  const requestOptions = {
    method,
    headers: getHeaders(headers) || {},
    body: Object.keys(body).length
      ? JSON.stringify(body)
      : method === "GET"
      ? undefined
      : JSON.stringify({}),
  };

  return requestOptions;
};

const parseResponse = (response) =>
  new Promise((resolve) => resolve(response.text()))
    .catch((error) =>
      Promise.reject({
        type: "NetworkError",
        status: response.status,
        message: error,
      })
    )
    .then((responseBody) => {
      try {
        const parsedJson = JSON.parse(responseBody);
        if (response.ok) return parsedJson;
        if (response.status >= 500) {
          Promise.reject({
            type: "ServerError",
            status: response.status,
            body: parsedJson,
          });
        }

        if (response.status <= 501) {
          return Promise.reject({
            type: "ApplicationError",
            status: response.status,
            body: parsedJson,
          });
        }
      } catch (e) {
        return Promise.reject({
          type: "InvalidJSON",
          status: Promise.status,
          body: responseBody,
        });
      }

      return Promise.resolve({
        type: "Invalid",
        status: "",
        body: {},
      });
    });

const makeApiCall = async (options = {}) => {
  const url = getUrl(options);
  return new Promise((resolve, reject) => {
    fetch(url, getOptions(options))
      .then(parseResponse)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  })
    .then((data) => [null, data])
    .catch((error) => [error, null]);
};

export default makeApiCall;
