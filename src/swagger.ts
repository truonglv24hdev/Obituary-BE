import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application, Request, Response } from "express";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Obituary API",
      description: "Obituary of CRUD API",
      version: "1.0.0",
    },
  },
  // looks for configuration in specified directories
  apis: ["./src/**/*.ts"], // Nếu dùng TypeScript nên đổi sang '*.ts' nếu có thể
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: number | string): void {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
