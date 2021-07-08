const Helpers = {
  // Main wrapper for Fetch API
  httpRequest: (url, method, payload, headers) => {
    // Configuration to accept json as a default
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "omit",

      redirect: "manual",
    };

    // method = post and payload, add it to the fetch request
    if (method.toLowerCase() === "post" && payload && payload.length > 0) {
      config.body = JSON.stringify(payload);
    }

    // if custom headers need to be set for the specific request
    // override them here
    if (
      headers &&
      typeof headers === "object" &&
      Object.keys(headers).length > 0
    ) {
      config.headers = headers;
    }

    return fetch(url, config).then((response) => {
      // Check if the request is 200

      if (response.ok) {
        let data = response;
        // console.log("안녕");

        // response.headers.append("Access-Control-Allow-Origin", "*");
        // response.headers.append("Access-Control-Allow-Credentials", "true");

        // console.log(response.headers.get("Content-Type"));

        // if the type is json return, interpret it as json
        // var myHeaders = new Headers();

        // myHeaders.append("Access-Control-Allow-Origin", "*");
        // response.headers.set(myHeaders);

        if (
          response.headers.get("Content-Type").indexOf("application/json") > -1
        ) {
          data = response.json();
        }
        console.log(data.headers);
        return data;
      }

      // if an errors, anything but 200 then reject with the actual response
      return Promise.reject(response);
    });
  },
};

export default Helpers;
