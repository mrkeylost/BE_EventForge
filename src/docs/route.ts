import express, { Express } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import swaggerUiDist from "swagger-ui-dist";

export default function docs(app: Express) {
  app.use(
    "/api-docs",
    express.static(swaggerUiDist.getAbsoluteFSPath(), {
      index: false,
    }),
  );

  app.use(
    "/api-docs",
    swaggerUI.serveFiles(swaggerOutput),
    swaggerUI.setup(swaggerOutput, {
      customCssUrl: "https://unpkg.com/swagger-ui-dist@5.32.8/swagger-ui.css",
    }),
  );
}
