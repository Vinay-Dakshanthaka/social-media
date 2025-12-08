const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API Documentation"
    }
  },
  apis: ["./routes/*.js"], // IMPORTANT
};
const swaggerSpec = swaggerJsDoc(options);
// module.exports = swaggerJsDoc(options);

module.exports = swaggerSpec;
