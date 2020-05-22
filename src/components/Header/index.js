import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Menu, MenuItem } from "@material-ui/core";
import Logo from "../../assets/zeuscarLogo.png";
import { Link } from "react-router-dom";
import history from "./../../services/history";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

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
  })
);

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <DriveEtaIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => history.push("/administracao")}>
              Administração
            </MenuItem>
            <MenuItem onClick={() => history.push("/ofertas")}>
              Ofertas
            </MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
