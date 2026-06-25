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

      RemoveMediaRequest: {
        fileUrl: "string",
      },

      CreateCategoryRequest: {
        name: "string",
        description: "string",
        icon: "string",
      },

      UpdateCategoryRequest: {
        name: "string",
        description: "string",
        icon: "string",
      },

      CreateEventRequest: {
        name: "string",
        startDate: "string",
        endDate: "string",
        description: "string",
        banner: "string",
        isFeatured: "boolean",
        isOnline: "boolean",
        isPublish: "boolean",
        category: "string",

        location: {
          region: 0,
          coordinates: [0, 0],
          address: "string",
        },
      },

      UpdateEventRequest: {
        name: "string",
        startDate: "string",
        endDate: "string",
        description: "string",
        banner: "string",
        isFeatured: "boolean",
        isOnline: "boolean",
        isPublish: "boolean",
        category: "string",

        location: {
          region: 0,

          coordinates: {
            type: "array",
            items: {
              type: "number",
            },
            example: [0, 0],
          },
        },
      },

      CreateTicketRequest: {
        price: "number",
        name: "string",
        event: "string",
        description: "string",
        quantity: "number",
      },

      UpdateTicketRequest: {
        price: "number",
        name: "string",
        event: "string",
        description: "string",
        quantity: "number",
      },

      CreateBannerRequest: {
        title: "string",
        image: "string",
        isShow: "boolean",
      },

      UpdateBannerRequest: {
        title: "string",
        image: "string",
        isShow: "boolean",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "../routes/auth.routes.ts",
  "../routes/media.routes.ts",
  "../routes/category.routes.ts",
  "../routes/region.routes.ts",
  "../routes/event.routes.ts",
  "../routes/ticket.routes.ts",
  "../routes/banner.routes.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
