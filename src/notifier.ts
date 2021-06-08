// // import express from 'express';
// // import { addDays, differenceInDays, format } from "date-fns";
// // import App from './app';
// // import { numberOfDaysToSkip } from "./constants";
// // import {
// //   getData,
// //   getNumberOfAvailableFacilities,
// //   sendMessage,
// // } from "./helpers";
// // import {
// //   AppError,
// //   AppResponse,
// //   AvailableInfo,
// //   Controller,
// //   PlaceResponse,
// //   TextbeltResponse,
// // } from "./types";
// // import StatusController from './Controllers/Status';

// const cbadCampgroundsNotifier = async (notifyText: boolean): Promise<AppResponse> => {
//   try {
//     // * For each day between today, and September 1, 2021
//     // * Check and see if any campsites are available at Carlsbad Campgrounds
//     // * If any site is available on that day
//     // * Push info to array of available campsites
//     // * Log to console the number of campsites available
//     // * If there are any available campsites
//     // *   - send text to phone with link to ReserveCA
//     // * If there are no available campsites
//     // *   - sent text to phone with a message about trying again next time

//     const days = differenceInDays(new Date("September 1, 2021"), new Date());

//     const availableCampsites: AvailableInfo[] = [];

//     for (let i = numberOfDaysToSkip; i < days; i++) {
//       const day = addDays(new Date(), i);
//       const formattedDay = format(day, "MM-dd-yyyy");
//       const campsiteData = await getData(formattedDay);
//       if ((campsiteData as AppError).error) {
//         throw new Error((campsiteData as AppError).error);
//       }

//       const numberOfAvailableFacilities = getNumberOfAvailableFacilities(
//         campsiteData as PlaceResponse
//       );

//       if (numberOfAvailableFacilities > 0) {
//         availableCampsites.push({
//           date: format(day, "E - MM-dd-yyyy"),
//           numberAvailable: numberOfAvailableFacilities,
//         });
//       }
//     }

//     let message;

//     if (availableCampsites.length > 0) {
//       const numberOfAvailableCampsites = availableCampsites.reduce(
//         (previousValue, currentValue) =>
//           previousValue + currentValue.numberAvailable,
//         0
//       );
//       const daysArray = availableCampsites
//         .map((availableInfo) => availableInfo.date)
//         .join(", ");

//       message = `There are ${numberOfAvailableCampsites} campsites available. Days available: ${daysArray}. 🥳 - https://tinyurl.com/bdznyv93`;
//     } else {
//       message = `There are no available campsites between today, and September 1, 2021. 🙍‍♂️`;
//     }

//     if (notifyText) {
//       const textbeltData = await sendMessage(message);

//       if ((textbeltData as AppError).error) {
//         throw new Error((textbeltData as AppError).error);
//       }

//       if (!(textbeltData as TextbeltResponse).success) {
//         throw new Error(JSON.stringify(textbeltData, null, 2));
//       }

//       if ((textbeltData as TextbeltResponse).quotaRemaining <= 5) {
//         console.warn(
//           `There are ${
//             (textbeltData as TextbeltResponse).quotaRemaining
//           } texts remaining in your account.`
//         );
//       }
//     }

//     console.log("SCRIPT SUCCESSFUL");

//     return { message, success: true };
//   } catch (error) {
//     console.error(error);
//     return { success: false };
//   }
// };