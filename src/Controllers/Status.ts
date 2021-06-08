import express, { Router, Request, Response } from "express";
import { createFacilitiesMessage } from '../helpers';
import getDayInfo from "../Services/getDayInfo";

class StatusController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(`/status`, async (req: Request, res: Response) => {
      try {
        const dayInfo = await getDayInfo();
        const availableDays = dayInfo.filter((day) => day.availableSites > 0);

        let message = `
          <div>
            <h1>Carlsbad Campgrounds</h1>`;
        
        if (availableDays.length > 0) {
          availableDays.forEach(
            (dayInfo) =>
              (message += `<div><h2>${dayInfo.date}</h2><h3>Available Sites: ${
                dayInfo.availableSites
              }</h3>${createFacilitiesMessage(dayInfo.facilities)}</div>`)
          );
        } else {
          message += `<p>There are no campsites available from now through September 1, 2021 ☹️`;
        }

        message += `</div>`;

        return res.send(message);
      } catch (error) {
        console.error(error);
        return res.status(500).send();
      }
    });
  }
}

export default StatusController;
