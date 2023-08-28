import * as swaggerJsDoc from "swagger-jsdoc";

const options: swaggerJsDoc.Options = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "EgiPegi Express TypeScript Boilerplate",
      version: "1.0.0",
      description:
        "Ini adalah contoh implementasi mekanisme autentikasi JSON Web Token (JWT) dengan menggunakan mekanisme refresh token di aplikasi Express.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Routes file-file TypeScript yang mengandung komentar Swagger.
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
