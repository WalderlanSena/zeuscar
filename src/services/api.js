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

  photos.forEach((file, index) => {
    promises.push(uploadImages(file, index));
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

export const deleteOffer = async (id) => {
  let offer = await getById(id, "offers");
  offer[0].photos.map((photo) => {
    let name = photo.url.substr(
      photo.url.indexOf("%2F") + 3,
      photo.url.indexOf("?") - (photo.url.indexOf("%2F") + 3)
    );
    name = name.replace("%20", " ");
    const ref = storage.ref();
    let photoRef = ref.child(`images/${name}`);
    photoRef
      .delete()
      .then(function () {
        firestore.collection("offers").doc(offer[0].id).delete();
        return true;
      })
      .catch(function (error) {
        return error;
      });
  });
  return true;
};

export const uploadImages = async (image, index) => {
  let storageRef = storage.ref(`images/${index}_${image.name}`);
  return storageRef
    .put(image)
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => ({ url }));
};
