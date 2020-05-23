export const currencyFormat = (num, decimals = 2) => {
  const numberToFormat = parseFloat(num);

  if (isNaN(numberToFormat)) {
    return "";
  }

  return numberToFormat
    .toFixed(decimals)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const getCurrentDate = () => {
  let date = new Date();
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();
  return (
    day +
    "-" +
    month +
    "-" +
    year +
    "-" +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
};

export const formatFirebaseDate = (dateTime) => {
  let date = new Date(dateTime);
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();
  return day + "/" + month + "/" + year;
};
