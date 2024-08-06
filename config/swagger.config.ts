import SwaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    info: {
      title: "Ballog API",
      version: "1.0.0",
      description: "Ballog API v1",
    },
    basepath: "../",
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};

export const specs = SwaggerJsdoc(options);
