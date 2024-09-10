import SwaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "Ballog API",
      version: "1.0.0",
      description: "Ballog API v1",
    },
    basePath: "/",  // basepath를 basePath로 수정
    schemes: ["https" ,"http" ],
    securityDefinitions: {
      Authorization: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      RefreshToken: {
        type: 'apiKey',
        name: 'RefreshToken',
        in: 'header',
      }
    }
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};
export const specs = SwaggerJsdoc(options);
