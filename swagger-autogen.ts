const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./src/server/routes/index.ts"];

const config = {
  info: {
    title: "BrewUp API Documentation",
    description: "",
  },
  tags: [],
  host: "localhost:8080",
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, config);
