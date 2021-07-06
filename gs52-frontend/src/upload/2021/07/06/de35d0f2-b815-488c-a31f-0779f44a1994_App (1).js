import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Helpers from "./helpers.js";
import { someFunction } from "./someFunction";

class App extends Component {
  state = {
    loading: false,
    errors: null,
    file: "0527.zip",
  };

  handleSubmit = (event) => {
    this.setState(
      {
        errors: null,
        loading: true,
      },
      () => {
        Helpers.httpRequest(
          `http://localhost:3000?upload=${this.state.file}`,
          "get"
        )
          .then((response) => response.blob())
          .then((blob) => {
            // create blob link
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `sample.${this.state.file}`);

            // append to html
            document.body.appendChild(link);

            // download
            link.click();

            // remove
            link.parentNode.removeChild(link);

            this.setState({
              loading: false,
            });
          });
        // .catch((error) => {
        //   error.json().then((json) => {
        //     // this.setState({
        //     //   errors: json,
        //     //   loading: false
        //     // });
        //   });
        // });
      }
    );

    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({
      file: event.currentTarget.value.substring(0, 3),
    });
  };

  render() {
    const obj = { hello: "world" };
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });

    const { loading, errors, file } = this.state;
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-12">
              <header className="App-header">
                <h1 className="display-4 mt-4 mb-4">React File Downloader</h1>
                <p>
                  This is to demonstrate the ability to download a file via an
                  API request and interpret that file to automatically download
                  on the client side.
                </p>
              </header>
              <main>
                <form onSubmit={this.handleSubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">sample.</span>
                    </div>
                    <input
                      disabled={loading}
                      onChange={this.handleChange}
                      className="form-control"
                      value={file}
                      type="text"
                      name="file"
                      placeholder="File type, ex csv, pdf, png, etc"
                      autoComplete="off"
                    />
                  </div>

                  {errors ? (
                    <div className="form-group">
                      <div className="alert alert-danger">
                        <strong>Error!</strong>{" "}
                        {errors.message || "Something went wrong."}
                      </div>
                    </div>
                  ) : null}

                  <div className="form-group">
                    <button disabled={loading} className="btn btn-primary">
                      {loading ? "Downloading..." : "Download"}
                    </button>
                    {/* <button disabled={loading} className="btn btn-primary">{(loading) ? 'Downloading...' : <someFunction /> }</button> */}
                  </div>

                  {/* <div>
                   <someFunction />
                </div> */}
                </form>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function typedArrayToURL(typedArray, mimeType) {
  return URL.createObjectURL(new Blob([typedArray.buffer], { type: mimeType }));
}

const bytes = new Uint8Array(59);

for (let i = 0; i < 59; i++) {
  bytes[i] = 32 + i;
}

const url = typedArrayToURL(bytes, "text/plain");

const link = document.createElement("a");
link.href = url;
link.innerText = "Open the array URL";

document.body.appendChild(link);

export default App;
