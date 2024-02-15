import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "BrewUp Node",
      version: "1.0.0",
    },
  },
  apis: ["./src/server/routes/*.ts"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
