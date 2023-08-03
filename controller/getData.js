const { default: axios } = require("axios");
const { RedisService } = require("../services/redis");

const getData = async (req, res) => {
  let isCached = false;
  let results;
  const redis = new RedisService();
  try {
    const { data } = await axios.get(
      "https://64cb5fae700d50e3c705cacb.mockapi.io/api/v1/users",
    );

    const cacheData = await redis.getItem("users");

    if (
      Array.isArray(cacheData) &&
      !!cacheData.length &&
      cacheData.length > 0
    ) {
      results = cacheData;
      if (cacheData.length && results) {
        isCached = true;
      }
    } else {
      isCached = true;
      results = data;
      await redis.setItem("users", results, {
        EX: 180,
        NX: true,
      });
    }

    res.json({
      isCached,
      users: results,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getData,
};
