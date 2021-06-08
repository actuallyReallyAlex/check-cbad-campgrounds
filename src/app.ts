import express from "express";
import morgan from 'morgan';

import { Controller } from "./types";

class App {
  public app: express.Application;

  public port: string;

  constructor(controllers: Controller[], port: string) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan('dev'));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`\nMode: ${process.env.NODE_ENV}\n`);
      console.log(`Server is listening on port: ${this.port}\n`);
      console.log(
        `Visit ${
          `http://localhost:${this.port}/`
        } to view project\n`
      );
    });
  }
}

export default App;
