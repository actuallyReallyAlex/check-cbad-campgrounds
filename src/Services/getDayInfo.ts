import { addDays, differenceInDays, format } from "date-fns";
import { numberOfDaysToSkip } from "../constants";
import { getData } from "../helpers";
import { DayInfo, Facility, FacilityInfo } from "../types";

// * For each day between today, and September 1, 2021
// * Check and see if any campsites are available at Carlsbad Campgrounds
// * If any site is available on that day
// * Push info to array of available campsites
const getDayInfo = async (): Promise<DayInfo[]> => {
  try {
    const days = differenceInDays(new Date("September 1, 2021"), new Date());

    const dayInfo: DayInfo[] = [];

    for (let i = numberOfDaysToSkip; i < days; i++) {
      const day = addDays(new Date(), i);
      const formattedDay = format(day, "MM-dd-yyyy");
      const data = await getData(formattedDay);

      const facilityInfo: FacilityInfo[] = Object.values(
        data.SelectedPlace.Facilities
      ).map((facility: Facility) => {
        const premiumSites = Object.values(facility.UnitTypes).filter(
          (unit) => unit.Name === "Premium Campsite"
        );
        const regularSites = Object.values(facility.UnitTypes).filter(
          (unit) => unit.Name === "Campsite"
        );

        return {
          availableSites: {
            premium: premiumSites.reduce(
              (count, currentValue) => count + currentValue.AvailableCount,
              0
            ),
            regular: regularSites.reduce(
              (count, currentValue) => count + currentValue.AvailableCount,
              0
            ),
          },
          id: facility.FacilityId,
          name: facility.Name,
        };
      });

      dayInfo.push({
        availableSites: facilityInfo.reduce((count, facility) => count + facility.availableSites.premium + facility.availableSites.regular, 0),
        date: formattedDay,
        facilities: facilityInfo,
      });
    }

    return dayInfo;
  } catch (error) {
    throw new Error(error);
  }
};

export default getDayInfo;

// const numberOfAvailableFacilities = getNumberOfAvailableFacilities(
//   campsiteData as PlaceResponse
// );

// if (numberOfAvailableFacilities > 0) {
//   availableCampsites.push({
//     date: format(day, "E - MM-dd-yyyy"),
//     numberAvailable: numberOfAvailableFacilities,
//   });
// }

// let message;

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

//     return { message, success: true };
//   } catch (error) {
//     console.error(error);
//     return { success: false };
//   }
