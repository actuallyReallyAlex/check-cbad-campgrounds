import App from "./app";
import NotifierController from "./Controllers/Notifier";
import StatusController from "./Controllers/Status";
import { Controller } from "./types";

const server = async (): Promise<void> => {
  try {
    if (!process.env.PORT) throw new Error("No PORT");

    const controllers: Controller[] = [
      new NotifierController(),
      new StatusController(),
    ];

    const app = new App(controllers, process.env.PORT);

    app.listen();
  } catch (error) {
    console.error(error);
  }
};

server();
