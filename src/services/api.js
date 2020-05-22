import { firestore, storage } from "../components/Firebase";

export const get = async (collection) => {
  const dbRef = firestore
    .collection(collection)
    .orderBy("registration", "desc")
    .get();

  let data = [];

  await dbRef
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
        data.push(Object.assign({ id: doc.id }, doc.data()));
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  return data;
};

export const getById = async (id, collection) => {
  let data = [];
  const dbRef = firestore.collection(collection).doc(id);
  const getDocument = dbRef.get();

  await getDocument
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      data.push(Object.assign({ id: snapshot.id }, snapshot.data()));
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  return data;
};

export const createOffer = async (offerObject) => {
  let photosUploaded = [];

  const photos = Array.from(offerObject.photos);
  const promises = [];

  photos.forEach((file) => {
    promises.push(uploadImages(file));
  });

  Promise.all(promises)
    .then((imageInfo) => {
      photosUploaded = imageInfo;
    })
    .finally(() => {
      firestore.collection("offers").add({
        brand: offerObject.brand,
        model: offerObject.model,
        year: offerObject.year,
        price: offerObject.price,
        color: offerObject.color,
        mileage: offerObject.mileage,
        plate: offerObject.plate,
        city: offerObject.city,
        photos: photosUploaded,
        views: 0,
        registration: new Date(),
      });
      console.log("Sucesso.");
      return true;
    });
};

export const update = (id, collection, offerUpdate) => {
  firestore.collection(collection).doc(id).update(offerUpdate);
  return true;
};

export const deleteOffer = (id) => {
  try {
    firestore.collection("db").doc(id).delete();
    return true;
  } catch (error) {
    return error;
  }
};

export const uploadImages = async (image) => {
  let storageRef = storage().ref(`images/${new Date()}_${image.name}`);
  return storageRef
    .put(image)
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => ({ url }));
};
