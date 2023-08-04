const express = require("express");
const axios = require("axios");
const redis = require("redis");
const { usersRoute } = require("./routes/routes.js");
const { options } = require("./docs/options.js");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 3007;

let redisClient;

// initialize the client
(async () => {
  try {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
  } catch (error) {
    console.log("Error", error);
  }
})();

async function fetchApiData(species) {
  try {
    const apiResponse = await axios.get(
      `https://www.fishwatch.gov/api/species/${species}`,
    );
    console.log("resp", apiResponse.data);
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
}

async function cacheData(req, res, next) {
  const key = req.params.species; // red-fish
  let results;
  try {
    const cacheResults = await redisClient.get(key);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: true,
        data: results,
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(404);
  }
}
async function getSpeciesData(req, res) {
  const species = req.params.species;

  let results;

  try {
    results = await fetchApiData(species);
    if (results.length === 0) {
      throw "API returned an empty array";
    }
    await redisClient.set(species, JSON.stringify(results), {
      EX: 180,
      NX: true,
    });

    res.send({
      fromCache: false,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}

app.get("/fish/:species", cacheData, getSpeciesData);

app.get("/", (req, res) => {
  res.send("running");
});

// swagger docs start
const specs = swaggerJsdoc(options);
// with search bar
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  }),
);
/////

app.use(usersRoute);
app.listen(port, () => {
  console.log(`App listening on port ${port} 🔥`);
});
