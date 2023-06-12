import { useState, useCallback } from "react";

const useHttp = () => {
  //Setting error and loading state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  /**
   * @param {
   * requestConfig.url [string] Target URL for the request
   * requestConfig.method [string] GET, POST
   * requestConfig.headers [Object] Headers for the HTTP Request
   * requestConfig.body [Object] Object with the information
   * dataHanlderFn [()=>{}] Function that will handle the parse data
   *  } requestConfig
   */
  const sendRequest = useCallback(async (requestConfig, dataHanlderFn) => {
    //We start the procress to send a request
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      dataHanlderFn(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
