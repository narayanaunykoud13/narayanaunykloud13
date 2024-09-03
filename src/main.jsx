import React from "react";
import ReactDOM from "react-dom/client";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import "./assets/scss/main.scss";

import PropertySetup from "./Modules/Lease/PropertySetup/PropertySetup";
import UiSetup from "./Modules/Lease/UI/UiSetup";

import ScreenBuilder from "./Modules/AutoScreen/Screen Builder/ScreenBuilder";
import List from "./Modules/Lease/UI_Master/List/list";
import store from "./utils/redux/store";
import Home from "./Modules/Lease/UI_Master/Home/home";
import Create from "./Modules/Lease/UI_Master/Create/Create";
import DashBoard from "./Modules/Lease/Dashboard/index";
import DynamicScreenBuilder from "./Modules/Lease/UI_Master/Create/createNew";

const PrivateRoute = ({ element: Component }) => {
  const token = import.meta.env.VITE_APP_AUTH_TOKEN; // Replace with your token key

  return token ? Component : <Navigate to="/not-authorized" replace />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/">
        <Routes>
          <Route path="/home" element={<PrivateRoute element={<App />} />} />

          <Route
            path="/screen-builder"
            element={<PrivateRoute element={<ScreenBuilder />} />}
          />
          <Route
            path="/screen-builder/:ScreenMode/:ScreenID"
            element={<ScreenBuilder />}
          />

          <Route
            path="/property-setup/:ScreenMode"
            element={<PrivateRoute element={<PropertySetup />} />}
          />

          <Route
            path="/property-setup/:ScreenMode"
            element={<PropertySetup />}
          />
          <Route
            path="/property-setup/:ScreenMode/:viewId"
            element={<PrivateRoute element={<PropertySetup />} />}
          />
          <Route
            path="/property-setup/:ScreenMode/:viewId/:tabId"
            element={<PrivateRoute element={<PropertySetup />} />}
          />

          <Route path="/ui-setup" element={<UiSetup />} />
          <Route path="/ui-setup/:tabId" element={<UiSetup />} />
          {/* <Route path="/ui-master/list/:role" element={<List />} /> */}
          <Route path="/ui-master/home" element={<Home />} />
          <Route path="/ui-master/create/:id" element={<Create />} />
          <Route path="/ui-master/test" element={<DynamicScreenBuilder />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route
            path="/ui-master/list/:screenid"
            element={<PrivateRoute element={<List />} />}
          />
          <Route path="*" element={<Navigate to="/home" replace />} />

          {/* Not Authorized Page */}
          <Route path="/not-authorized" element={<h1>Not Authorized</h1>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
