import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home/dashboard";
import Login from "./login/Login";
import Register from "./register/Register";
import AddApplication from './applications/addApplication';
import Application from './applications/application';
import Applications from './applications/teacherApplication';
const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path={["/home"]}
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />

        <Route
          exact
          path={["/login", "/"]}
          render={(props) => <Login {...props} baseUrl={baseUrl} />}
        />

        <Route
          exact
          path={["/register"]}
          render={(props) => <Register {...props} baseUrl={baseUrl} />}
        />

      <Route
          exact
          path={["/create-application"]}
          render={(props) => <AddApplication {...props} baseUrl={baseUrl} />}
        />

      <Route
          exact
          path={["/application"]}
          render={(props) => <Application {...props} baseUrl={baseUrl} />}
        />

<Route
          exact
          path={["/applications"]}
          render={(props) => <Applications {...props} baseUrl={baseUrl} />}
        />

      </div>
    </Router>
  );
};

export default Controller;
