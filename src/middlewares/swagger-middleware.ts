// import SwaggerUI from "swagger-ui-express";
// import YAML from "yamljs";

// const options = {
//   customCss: ".swagger-ui .topbar { display: none }",
//   customSiteTitle: "Parking App API",
// };

// const swaggerDocument = YAML.load("./src/config/swagger.yaml");
// export default [SwaggerUI.serve, SwaggerUI.setup(swaggerDocument, options)];


import SwaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors"; // Import the cors middleware

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Parking App API",
};

const swaggerDocument = YAML.load("./src/config/swagger.yaml");

// Add cors middleware specifically for Swagger routes
const swaggerMiddleware = [
  cors(),
  ...[SwaggerUI.serve, SwaggerUI.setup(swaggerDocument, options)],
];

export default swaggerMiddleware;
