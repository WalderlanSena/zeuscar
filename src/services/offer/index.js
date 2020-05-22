import { get, getById, update } from "../api";

export const getOffers = () => {
  return get("offers");
};

export const getOfferById = async (id) => {
  const offers = await getById(id, "offers");

  let galery = [];

  offers[0].photos.map((photo) => {
    galery.push({
      original: photo.url,
      thumbnail: photo.url,
    });
  });

  return Object.assign(offers[0], { galery: galery });
};

export const updateOffer = (id, offerUpdate) => {
  return update(id, "offers", offerUpdate);
};

export const createOffer = () => {};
