import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import { getOffers } from "../../services/offer";
import ListCarGrid from "../../components/ListCarGrid";
import ListCar from "../../components/ListCar";

export default function Offer() {
  const [offers, setOffers] = useState([]);
  const [viewMode, setViewMode] = useState(true);

  useEffect(() => {
    async function findOffers() {
      const response = await getOffers();
      setOffers(response);
    }
    findOffers();
  }, []);

  return (
    <Container maxWidth={"md"}>
      <Grid container>
        <Grid item sm={12} md={12} lg={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {viewMode && (
              <Button onClick={() => setViewMode(!viewMode)}>
                <ViewStreamIcon />
              </Button>
            )}
            {!viewMode && (
              <Button onClick={() => setViewMode(!viewMode)}>
                <ViewModuleIcon />
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container direction={"row"} spacing={4}>
        <Grid item sm={12} md={12} lg={12}>
          <Typography variant={"h5"}>Ofertas Disponíveis</Typography>
        </Grid>
        {!viewMode && offers.length > 0 && <ListCar offersList={offers} />}
        {viewMode && offers && offers.length > 0 ? (
          <ListCarGrid offersList={offers} />
        ) : (
          offers.length !== 0 &&
          viewMode && (
            <>
              <Grid item sm={12} md={4} lg={4}>
                <Skeleton variant="rect" width={"100%"} height={350} />
              </Grid>

              <Grid item sm={12} md={4} lg={4}>
                <Skeleton variant="rect" width={"100%"} height={350} />
              </Grid>

              <Grid item sm={12} md={4} lg={4}>
                <Skeleton variant="rect" width={"100%"} height={350} />
              </Grid>
            </>
          )
        )}
      </Grid>
    </Container>
  );
}
