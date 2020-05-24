import { get, getById, update, uploadImages } from "../api";
import { formatFirebaseDate, currencyFormat } from "../utils";

export const getOffers = async () => {
  let offers = await get("offers");

  let data = [];

  offers.forEach((offer, index) => {
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

  offers[0].photos.forEach((photo) => {
    galery.push({
      original: photo.url,
      thumbnail: photo.url,
    });
  });

  return Object.assign(offers[0], { galery: galery });
};

export const updateOffer = async (id, offerUpdate) => {
  if (!offerUpdate.hasOwnProperty("newPhotos")) {
    return update(id, "offers", offerUpdate);
  }

  const photos = Array.from(offerUpdate.newPhotos);
  const promises = [];
  let photosUploaded = [];

  photos.forEach((file, index) => {
    promises.push(uploadImages(file, index));
  });

  Promise.all(promises)
    .then((imageInfo) => {
      photosUploaded = imageInfo;
    })
    .finally(async () => {
      delete offerUpdate.newPhotos;
      photosUploaded.forEach((item) => {
        offerUpdate.photos.push(item);
      });
      await update(id, "offers", offerUpdate);
      return true;
    });
};
