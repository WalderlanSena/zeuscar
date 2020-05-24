import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../assets/zeuscarLogo.png";
import { Link } from "react-router-dom";
import history from "./../../services/history";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 30,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={() => history.push("/administracao")}>
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Administração"} />
        </ListItem>
      </List>
      <List>
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <DriveEtaOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Ofertas"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar
        style={{ background: "#FFF", color: "#ffdd55" }}
        position="static"
      >
        <Toolbar>
          <div className={classes.title}>
            <Link to={"/"}>
              <img src={Logo} alt={"Logo"} />
            </Link>
          </div>
          <IconButton
            onClick={() => setOpen(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={open}
        onOpen={toggleDrawer("left", false)}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
