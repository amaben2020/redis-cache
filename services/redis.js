const redis = require("redis");

let redisClient;

// initialize the client
// (async () => {
//   try {
//     redisClient = redis.createClient();

//     redisClient.on("error", (error) => console.error(`Error : ${error}`));

//     await redisClient.connect();
//   } catch (error) {
//     console.log("Error", error);
//   }
// })();

class RedisService {
  client;
  constructor() {
    this.client = redis.createClient();
  }

  async initRedis() {
    try {
      redisClient = this.client;

      redisClient.on("error", (error) => console.error(`Error : ${error}`));

      await redisClient.connect();
    } catch (error) {
      console.log("Error", error);
    }
  }

  async getItem(key) {
    await this.initRedis();
    if (!key) {
      throw new Error("Key must be included");
    }

    const data = await this.client.get(key);

    return JSON.parse(data);
  }

  async setItem(key, value, options) {
    await this.initRedis();
    if (!key) {
      throw new Error("Key must be included");
    }

    if (value) {
      value = JSON.stringify(value);
    }

    await this.client.set(key, value, options);
  }

  async deleteItem(key) {
    await this.initRedis();
    try {
      if (!key) {
        throw new Error("Key must be included");
      }

      await this.client.del(key);
      console.log("Success ✅");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  RedisService,
};
