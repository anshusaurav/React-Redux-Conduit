import React from "react";
import "./App.scss";
import store from "./redux/store";
import { Provider } from "react-redux";
import Conduit from "./components/Conduit";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <Provider store={store}>
      <Conduit />
    </Provider>
  );
}

export default App;
