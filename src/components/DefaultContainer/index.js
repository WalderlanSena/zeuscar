import React from "react";
import {
  Container,
  createStyles,
  makeStyles,
  Breadcrumbs,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { Corporation } from "./styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1, 2),
    },
    button: {
      margin: theme.spacing(1),
    },
    margin: {
      height: theme.spacing(3),
    },
    label: {
      alignItems: "center",
    },
    link: {
      display: "flex",
      color: "inherit",
      textDecoration: "none",
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    root: {
      maxWidth: 345,
      minHeight: 418,
    },
    media: {
      height: 140,
    },
  })
);

export default function DefaultContainer(props) {
  const classes = useStyles();
  return (
    <Container maxWidth={props.maxWidth || "md"}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link className={classes.link} to={"/"}>
            <HomeOutlinedIcon className={classes.link} /> Home
          </Link>
          <Typography className={classes.link} color="textPrimary">
            <DriveEtaOutlinedIcon className={classes.icon} />{" "}
            {props.currentPage}
          </Typography>
        </Breadcrumbs>
      </Paper>
      <br />
      <Typography variant="h4">{props.title}</Typography>
      <br />

      {props.children}

      <Grid container>
        <Grid item sm={12} md={12} lg={12}>
          <Corporation>
            <p>
              Corporation ©{" "}
              <a href="https://github.com/WalderlanSena">Walderlan Sena</a>
            </p>
          </Corporation>
        </Grid>
      </Grid>
    </Container>
  );
}
