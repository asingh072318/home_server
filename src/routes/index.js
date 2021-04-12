import React from "react";
import { Route, IndexRoute } from "react-router";
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Index from "../views/index.js";
import Home from "../views/home.js";
import Admin from "../views/admin.js";
import { isAdmin } from "../utils/gstateutils";

function requireAdmin(location,replace){
  if (!isAdmin())
    replace('/');
}

// bind the view components to appropriate URL path
export default store =>
  <div>
    <Route path="/">
      <IndexRoute component={Index} />
    </Route>
    <Route component={CoreLayout}>
      <Route path="/home" component={Home} />
      <Route path="/admin" onEnter={requireAdmin} component={Admin} />
    </Route>
  </div>;
