const { default: axios } = require("axios");

const fetchData = async () => {
  try {
    const { data } = await axios.get(
      "https://64cb5fae700d50e3c705cacb.mockapi.io/api/v1/users",
    );

    console.log("FETCHING DATA FROM API 🔌");
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchData,
};
