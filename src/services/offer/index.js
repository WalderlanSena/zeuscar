import { get, getById, update } from "../api";
import { formatFirebaseDate, currencyFormat } from "../utils";

export const getOffers = async () => {
  let offers = await get("offers");

  let data = [];

  offers.map((offer, index) => {
    offers[index].registration = formatFirebaseDate(
      offer.registration.toDate()
    );
    offers[index].price = "R$ " + currencyFormat(offer.price).toString();
    data.push(offers[index]);
  });
  return data;
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
