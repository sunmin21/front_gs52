import logo from "./logo.svg";
import "./App.css";
import test from "./pages/test";
import { Route } from "react-router";
function App() {
  return <Route component={test} path="/" />;
}

export default App;
