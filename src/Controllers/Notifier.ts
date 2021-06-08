import express, { Router, Request, Response } from "express";
import { sendMessage } from "../helpers";
import getDayInfo from "../Services/getDayInfo";

class NotifierController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(`/notifier`, async (req: Request, res: Response) => {
      try {
        const dayInfo = await getDayInfo();
        const availableDays = dayInfo.filter((day) => day.availableSites > 0);
        const numberOfAvailableCampsites = availableDays.reduce(
          (count, info) => count + info.availableSites,
          0
        );

        let message = `There are ${numberOfAvailableCampsites} campsites available.`;

        console.log({ numberOfAvailableCampsites });

        if (numberOfAvailableCampsites > 0) {
          message += ` Days available: `;
          const dates = availableDays.map((info) => info.date);
          dates.forEach((date) => (message += date));
          message += `🥳 - https://tinyurl.com/bdznyv93`;
          const textbeltData = await sendMessage(message);
          console.log(textbeltData);
        }

        return res.send("OK");
      } catch (error) {
        console.error(error);
        return res.status(500).send();
      }
    });
  }
}

export default NotifierController;
