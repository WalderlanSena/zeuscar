import React from "react";
import { Switch, Route } from "react-router-dom";

import Offer from "./../pages/Offer";

export default function Routes() {
  return (
    <Switch>
      <Route path={"/"} exact component={Offer} />
    </Switch>
  );
}
