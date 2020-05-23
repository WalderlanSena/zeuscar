import React, { useEffect, useState } from "react";
import { Container, Grid, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DefaultContainer from "../../components/DefaultContainer";

import MUIDataTable from "mui-datatables";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ColorizeOutlinedIcon from "@material-ui/icons/ColorizeOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

import { getOffers } from "./../../services/offer";
import { toast } from "react-toastify";
import { deleteOffer } from "../../services/api";
import history from "../../services/history";

export default function Admin() {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [currentLine, setCurrentLine] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function addVehicle() {
      const response = await getOffers();
      setData(response);
      setLoading(false);
    }
    addVehicle();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  async function handleDelete() {
    try {
      await deleteOffer(data[currentLine].id);
    } catch (error) {
      toast.error("Não foi possível excluir a oferta");
    }
    data.splice(currentLine, 1);
    setData(Array.from(data));
    toast.success("Oferta excluida com sucesso.");
    setOpen(false);
  }

  function handleEdit(index) {
    let { id } = data[index];
    history.push(`/oferta/${id}/editar`);
  }

  const columns = [
    {
      name: "brand",
      label: "Marca",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "model",
      label: "Modelo",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "plate",
      label: "Placa",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "color",
      label: "Cor",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "mileage",
      label: "KM",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "price",
      label: "Preço",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "registration",
      label: "Registrado em",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Editar",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              onClick={() => handleEdit(tableMeta.rowIndex)}
              style={{ color: "#ffdd55" }}
            >
              <ColorizeOutlinedIcon />
            </Button>
          );
        },
      },
    },
    {
      name: "Excluír",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              style={{ color: "red" }}
              onClick={() => {
                setCurrentLine(tableMeta.rowIndex);
                setOpen(true);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    selectableRows: false,
    responsive: "scroll",
  };

  return (
    <DefaultContainer maxWidth={"lg"} currentPage={"Administração"}>
      <Grid container>
        <Grid
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: 20,
          }}
          item
          sm={12}
          md={12}
          lg={12}
        >
          <Button
            onClick={() => history.push("/nova-oferta")}
            variant={"contained"}
            style={{ color: "#FFF" }}
            color={"primary"}
          >
            <AddOutlinedIcon /> Nova Oferta
          </Button>
        </Grid>
        <Grid item sm={12}>
          <MUIDataTable
            title={"Ofertas cadastradas"}
            data={data}
            loading={true}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Você deseja excluír essa oferta ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ textAlign: "center" }}
            id="alert-dialog-description"
          >
            Essa operação é definitiva, não será possível recuperar a oferta.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </DefaultContainer>
  );
}
