import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import history from "../../services/history";
import { ButtonBottom } from "./styles";

export default function ListCarGrid(props) {
  const ListOffers = props.offersList.map((offer) => (
    <Grid
      style={{ cursor: "pointer" }}
      key={offer.id}
      item
      sm={12}
      md={4}
      lg={4}
    >
      <Card
        style={{ height: "100%" }}
        onClick={() => history.push(`/oferta/${offer.id}`)}
      >
        <CardMedia
          height={212}
          component="img"
          image={offer.photos[offer.photos.length - 1].url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {offer.brand.length > 30
              ? offer.brand.substring(0, 30) + " ..."
              : offer.brand}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h5">
            {offer.model.length > 30
              ? offer.model.substring(0, 30) + " ..."
              : offer.model}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="h5">
            Ano - {offer.year}
          </Typography>

          <Typography variant="h5" style={{ marginTop: 10 }}>
            {offer.price}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ButtonBottom>
            <LocationOnOutlinedIcon /> <p>{offer.city}</p>
          </ButtonBottom>

          <ButtonBottom>
            <RemoveRedEyeOutlinedIcon /> <p>{offer.views}</p>
          </ButtonBottom>
        </CardActions>
      </Card>
    </Grid>
  ));

  return ListOffers;
}
