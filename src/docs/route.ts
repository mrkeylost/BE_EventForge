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
    swaggerUI.setup(swaggerOutput),
  );
}
