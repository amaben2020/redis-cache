const { default: axios } = require("axios");
const { RedisService } = require("../services/redis");
const { fetchData } = require("../helper/fetchData");

const getData = async (req, res) => {
  let isCached = false;
  let results;
  const redis = new RedisService();
  try {
    const cacheData = await redis.getItem("users");

    const data = await fetchData();
    results = data;
    // if (
    //   Array.isArray(cacheData) &&
    //   !!cacheData.length &&
    //   cacheData.length > 0
    // ) {
    //   results = cacheData;
    //   if (cacheData.length && results) {
    //     isCached = true;
    //   }
    // } else {
    //   results = data;
    await redis.setItem("users", results, {
      EX: 180,
      NX: true,
    });
    // }

    // delete ❌
    // await redis.deleteItem("users");

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
