const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Algomachine",
        url: "https://logrocket.com",
        email: "algomachine@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3007", // must be same with your server
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = { options };
