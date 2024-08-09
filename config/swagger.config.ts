import SwaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "Ballog API",
      version: "1.0.0",
      description: "Ballog API v1",
    },
    basePath: "/",  // basepath를 basePath로 수정
    schemes: ["https"],
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
      },
      oauth2: {
        type: 'oauth2',
        authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        flow: 'accessCode',
        scopes: {
          read: 'Grants read access',
          write: 'Grants write access',
          admin: 'Grants access to admin operations',
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};

export const specs = SwaggerJsdoc(options);
