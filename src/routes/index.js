import React from "react";
import { Switch, Route } from "react-router-dom";

import Offer from "./../pages/Offer";
import OfferDetail from "./../pages/OfferDetail";

export default function Routes() {
  return (
    <Switch>
      <Route path={"/"} exact component={Offer} />
      <Route path={"/oferta/:id"} component={OfferDetail} />
    </Switch>
  );
}
