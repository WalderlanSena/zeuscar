import React from "react";
import { Switch, Route } from "react-router-dom";

import Offer from "./../pages/Offer";
import OfferDetail from "./../pages/OfferDetail";
import NewOffer from "./../pages/NewOffer";
import Admin from "./../pages/Admin";

export default function Routes() {
  return (
    <Switch>
      <Route path={"/"} exact component={Offer} />
      <Route path={"/oferta/:id"} exact component={OfferDetail} />
      <Route path={"/oferta/:id/editar"} component={NewOffer} />
      <Route path={"/nova-oferta"} component={NewOffer} />
      <Route path={"/administracao"} component={Admin} />
    </Switch>
  );
}
