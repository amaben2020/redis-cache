const { RedisService } = require("../services/redis");
const cacheData = async (req, res, next) => {
  {
    const redisServer = new RedisService();
    try {
      const cachedData = await redisServer.getItem("users");

      let isCached = false;
      if (
        Array.isArray(cachedData) &&
        !!cachedData.length &&
        cachedData.length > 0
      ) {
        isCached = true;
        res.json({
          isCached,
          users: cachedData,
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(400).send("Something went wrong ");
    }
  }
};

module.exports = {
  cacheData,
};
