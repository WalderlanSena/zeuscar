import React from "react";
import { Grid, CardMedia, Typography } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import history from "../../services/history";
import { currencyFormat } from "../../services/utils";
import { Detail, Price, CardCar, ButtonBottom, ModelText } from "./styles";

export default function ListCar(props) {
  const ListOffers = props.offersList.map((offer) => (
    <Grid
      key={offer.id}
      item
      md={12}
      sm={12}
      lg={12}
      onClick={() => history.push(`/oferta/${offer.id}`)}
    >
      <CardCar>
        <CardMedia
          style={{ width: 250, height: 188 }}
          component="img"
          image={offer.photos[offer.photos.length - 1].url}
        />
        <Detail>
          <div
            style={{
              display: "flex",
              width: "75%",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <div style={{ width: "100%" }}>
              <Typography variant={"h5"}>{offer.brand}</Typography>
              <ModelText>{offer.model}</ModelText>
            </div>

            <div>Ano / {offer.year}</div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <ButtonBottom>
                <LocationOnOutlinedIcon />
                {offer.city}
              </ButtonBottom>
              <ButtonBottom>
                <RemoveRedEyeOutlinedIcon /> {offer.views}
              </ButtonBottom>
            </div>
          </div>
          <Price>
            <Typography variant={"h6"}>
              R$ {currencyFormat(offer.price)}
            </Typography>
          </Price>
        </Detail>
      </CardCar>
    </Grid>
  ));

  return ListOffers;
}
