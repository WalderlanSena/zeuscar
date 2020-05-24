import React, { useState, useMemo, useEffect } from "react";
import DefaultContainer from "../../components/DefaultContainer";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useForm } from "react-hook-form";
import { object, string, number } from "yup";
import { ContainerPhotos, PhotoItem, TitlePhotos } from "./styles";

import { createOffer } from "../../services/api";

import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getOfferById, updateOffer } from "../../services/offer";

export default function NewOffer(props) {
  const schema = object().shape({
    brand: string().required(
      "A marca do veículo é necessário para cadastrar uma oferta."
    ),
    model: string().required(
      "O modelo do veículo é necessário para cadastrar uma oferta."
    ),
    year: string().required(
      "O ano do veículo é necessário para cadastrar uma oferta."
    ),
    price: string().required("O preço é necessário para cadastrar uma oferta."),
    color: string().required(
      "A cor do veículo é necessário para cadastrar uma oferta."
    ),
    mileage: number().typeError(
      "A quilometragem do veículo é necessária para cadastrar uma oferta."
    ),
    plate: string().required(
      "A placa do veículo é necessário para cadastrar uma oferta."
    ),
    city: string().required(
      "A cidade do veículo é necessária para cadastrar uma oferta."
    ),
    photos: string().required("Selecione uma foto para o veiculo."),
  });

  const { register, handleSubmit, errors, setValue } = useForm({
    validationSchema: schema,
  });

  const [thumbnail, setThumbnail] = useState([]);
  const [thumbnailUpdate, setThumbnailUpdate] = useState([]);
  const [previewUpdated, setPreviewUpdated] = useState([]);
  const [open, setOpen] = useState(false);
  const [excludePhoto, setExcludePhoto] = useState();
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (key) => {
    setExcludePhoto(key);
    setOpen(true);
  };

  const handleRemovePhoto = () => {
    if (!id) {
      preview.splice(excludePhoto, 1);
      setOpen(false);
      return true;
    }
    previewUpdated.splice(excludePhoto, 1);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const preview = useMemo(() => {
    let data = [];

    Array.from(thumbnail).forEach((file) => {
      data.push(URL.createObjectURL(file));
    });

    return data;
  }, [thumbnail]);

  const newPreviewUpdate = useMemo(() => {
    let data = [];

    Array.from(thumbnailUpdate).forEach((file) => {
      data.push(URL.createObjectURL(file));
    });

    return data;
  }, [thumbnailUpdate]);

  let { id } = useParams();

  useEffect(() => {
    async function getOffer() {
      const response = await getOfferById(id);
      setValue("brand", response.brand);
      setValue("model", response.model);
      setValue("year", response.year);
      setValue("price", parseInt(response.price));
      setValue("color", response.color);
      setValue("mileage", response.mileage);
      setValue("plate", response.plate);
      setValue("city", response.city);
      const data = [];

      response.photos.forEach((photo) => {
        data.push(photo);
      });
      setPreviewUpdated(data);
    }

    if (id) {
      getOffer();
    }
  }, [id, setValue]);

  function onSelectPhotos(event) {
    if (!id) {
      setThumbnail(event.target.files);
      return true;
    }
    setThumbnailUpdate(event.target.files);
  }

  async function onSubmit(data) {
    window.scrollTo(0, 0);
    setLoading(true);
    if (!id) {
      await createOffer(Object.assign({ photos: thumbnail }, data));
      toast.success("Oferta adicionado com sucesso !");
      setLoading(false);
      return true;
    }
    data.photos = previewUpdated;
    if (thumbnailUpdate.length > 0) {
      data.newPhotos = thumbnailUpdate;
    }
    let offerData = data;
    await updateOffer(id, offerData);
    setLoading(false);
    toast.success("Oferta atualizada com sucesso.");
  }

  return (
    <DefaultContainer
      currentPage={!id ? "Nova Oferta" : "Atualizar Oferta"}
      title={!id ? "Nova Oferta" : "Atualizar Oferta"}
    >
      {loading && <LinearProgress />}
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register}
              error={!!errors.brand}
              helperText={
                errors.brand
                  ? errors.brand.message
                  : "Digite a marca do veículo."
              }
              name="brand"
              label="Marca"
              color="secondary"
              placeholder="Audi"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              inputRef={register}
              error={!!errors.model}
              helperText={
                errors.model
                  ? errors.model.message
                  : "Digite o modelo do veículo."
              }
              name="model"
              label="Modelo"
              color="secondary"
              placeholder="A3 Sedan"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              inputRef={register}
              error={!!errors.year}
              helperText={
                errors.year ? errors.year.message : "Digite o ano da veículo."
              }
              name="year"
              label="Ano"
              color="secondary"
              placeholder="2020"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              inputRef={register}
              error={!!errors.price}
              helperText={
                errors.price
                  ? errors.price.message
                  : "Digite o preço da oferta."
              }
              name="price"
              label="Preço"
              type="number"
              color="secondary"
              placeholder="20.000"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              inputRef={register}
              error={!!errors.color}
              helperText={
                errors.color ? errors.color.message : "Digite a cor do veículo."
              }
              name="color"
              label="Cor"
              color="secondary"
              placeholder="Azul"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              inputRef={register}
              error={!!errors.mileage}
              helperText={
                errors.mileage
                  ? errors.mileage.message
                  : "Digite a quilometragem do veículo."
              }
              name="mileage"
              type="number"
              label="Quilometragem"
              color="secondary"
              placeholder="20 KM"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              inputRef={register}
              error={!!errors.plate}
              helperText={
                errors.plate
                  ? errors.plate.message
                  : "Digite a placa do veículo."
              }
              name="plate"
              label="Placa"
              color="secondary"
              placeholder="WAL-1234"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              inputRef={register}
              error={!!errors.city}
              helperText={
                errors.city
                  ? errors.city.message
                  : "Digite a cidade do veículo."
              }
              name="city"
              label="Cidade"
              color="secondary"
              placeholder="Fortaleza"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TitlePhotos>
              <Typography variant="h5">Fotos da Oferta</Typography>
              <Button
                style={{ color: "#FFF" }}
                variant="contained"
                color="primary"
                component="label"
              >
                Selecionar fotos
                <input
                  type="file"
                  ref={register}
                  multiple={true}
                  name={"photos"}
                  accept={"image/*"}
                  style={{ display: "none" }}
                  onChange={onSelectPhotos}
                />
              </Button>
            </TitlePhotos>

            <ContainerPhotos>
              {preview.length === 0 && previewUpdated.length === 0 ? (
                <h3 style={{ color: "#787878" }}>
                  {errors.photos
                    ? errors.photos.message
                    : "Nenhuma Imagem Selecionada."}
                </h3>
              ) : (
                ""
              )}
              {preview.map((item, key) => (
                <PhotoItem key={key} onClick={() => handleClickOpen(key)}>
                  <img src={item} alt="img" />
                </PhotoItem>
              ))}

              {previewUpdated.map((item, key) => (
                <PhotoItem key={key} onClick={() => handleClickOpen(key)}>
                  <img src={item.url} alt="img" />
                </PhotoItem>
              ))}

              {newPreviewUpdate.map((item, key) => (
                <PhotoItem key={key} onClick={() => handleClickOpen(key)}>
                  <img src={item} alt="img" />
                </PhotoItem>
              ))}
            </ContainerPhotos>

            <Button
              style={{ color: "#FFF" }}
              type={"submit"}
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {!id && " Adicionar"}
              {id && " Atualizar Oferta"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Você deseja excluír essa imagem ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Essa operação é definitiva.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRemovePhoto} color="primary" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </DefaultContainer>
  );
}
