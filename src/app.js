import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import AppView from "./views";
import "semantic-ui-css/semantic.min.css";

const App = ({ store }) => (
  <Provider store={store}>
    <AppView />
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
