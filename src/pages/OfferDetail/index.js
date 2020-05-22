import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import OpacityOutlinedIcon from "@material-ui/icons/OpacityOutlined";
import AvTimerOutlinedIcon from "@material-ui/icons/AvTimerOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Skeleton from "@material-ui/lab/Skeleton";

import ImageGallery from "react-image-gallery";

import { useParams } from "react-router-dom";
import { getOfferById, updateOffer } from "../../services/offer";
import { currencyFormat, formatFirebaseDate } from "../../services/utils";
import DefaultContainer from "../../components/DefaultContainer";

export default function OfferDetail() {
  const { id } = useParams();

  const [offer, setOffer] = useState();

  useEffect(() => {
    async function findOffer() {
      const response = await getOfferById(id);
      console.log(response);
      setOffer(response);
      updateOffer(id, {
        views: response.views + 1,
      });
    }
    findOffer();
  }, [id]);

  return (
    <DefaultContainer currentPage={"Oferta"}>
      {offer ? (
        <Grid container spacing={4}>
          <Grid item md={8} sm={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant={"h5"}>{offer.brand}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="h5"
                >
                  {offer.model}
                </Typography>
              </CardContent>
              <ImageGallery
                showNav={false}
                showPlayButton={false}
                autoPlay={true}
                startIndex={0}
                items={offer.galery}
              />
            </Card>
          </Grid>

          <Grid item md={4} lg={4} sm={12}>
            <Card>
              <CardContent>
                <Typography variant={"h5"} style={{ justifyContent: "center" }}>
                  Informações
                </Typography>

                <List component="nav" aria-label="main mailbox folders">
                  <ListItem>
                    <ListItemIcon>
                      <OpacityOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cor" secondary={`${offer.color}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AvTimerOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Kilometragem"
                      secondary={`${offer.mileage}`}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <DateRangeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ano" secondary={`${offer.year}`} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <DriveEtaOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Placa"
                      secondary={`${offer.plate}`}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <LocationOnOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Localização"
                      secondary={`${offer.city}`}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <DateRangeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Registrado em"
                      secondary={`${formatFirebaseDate(
                        offer.registration.toDate()
                      )}`}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <RemoveRedEyeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Visualizações"
                      secondary={`${offer.views}`}
                    />
                  </ListItem>
                </List>
                <Typography
                  variant={"h4"}
                  style={{
                    backgroundColor: "#81ce93",
                    color: "#fff",
                    padding: 10,
                  }}
                >
                  R$ {currencyFormat(offer.price)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4}>
          <Grid item sm={12} md={8} lg={8}>
            <Skeleton variant="rect" width={"100%"} height={500} />
          </Grid>
          <Grid item md={4} lg={4} sm={12}>
            <Skeleton variant="rect" width={"100%"} height={500} />
          </Grid>
        </Grid>
      )}
    </DefaultContainer>
  );
}
