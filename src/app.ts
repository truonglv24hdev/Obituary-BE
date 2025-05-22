import Route from "./core/interface/routes.interface";
import express from "express";
import mongoose from "mongoose";
import hpp from "hpp";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import Logger from "./core/utils/Logger";
import swaggerDocs from './swagger'
import * as path from 'path';


class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.production = process.env.NODE_ENV == "production" ? true : false;
    this.app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
    this.app.use('/videos', express.static(path.join(__dirname, '../public/videos'), {
      setHeaders: (res, path) => {
        if (path.endsWith('.mp4')) {
          res.set('Content-Type', 'video/mp4');
          res.set('Accept-Ranges', 'bytes');
        }
      }
    }));
    this.connectDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
      swaggerDocs(this.app, this.port)
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeMiddlewares() {
    if (this.production) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan("http://localhost:4000"));
      this.app.use(cors({ origin: "your.domain.com", credentials: true }));
    } else {
      this.app.use(morgan("dev"));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async connectDatabase() {
    try {
      const connectString = process.env.MONGODB_URL;
      if (!connectString) {
        Logger.error("DB not connect");
        return;
      }
      await mongoose.connect(connectString);
      Logger.info("connect success");
    } catch (error) {
      Logger.error("connect fail");
    }
  }
}

export default App;
