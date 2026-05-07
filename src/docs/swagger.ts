import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "EventForge API Documentation",
    description: "Backend",
  },
  servers: [
    {
      url: "http://localhost:5001/api",
      description: "Development",
    },
    {
      url: "https://be-event-management-five.vercel.app/api",
      description: "Production",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      RegisterRequest: {
        fullName: "string",
        username: "string",
        email: "string",
        password: "string",
        confirmPassword: "string",
      },
      LoginRequest: {
        identifier: "string",
        password: "string",
      },
      ActivationRequest: {
        code: "string",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
