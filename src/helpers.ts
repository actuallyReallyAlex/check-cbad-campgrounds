import nFetch from "node-fetch";
import { bodyDefaults, endpoint, headers } from "./constants";
import { Facility, PlaceResponse, TextbeltResponse } from "./types";

// TODO - Rename function
export const getData = async (
  startDate: string
): Promise<PlaceResponse> => {
  try {
    const response = await nFetch(endpoint, {
      body: JSON.stringify({
        ...bodyDefaults,
        StartDate: startDate,
      }),
      headers,
      method: "POST",
    });

    const data: PlaceResponse = await response.json();

    if (
      data.SelectedPlace &&
      data.SelectedPlace.Facilities &&
      data.SelectedPlace.Facilities[2100]
    ) {
      delete data.SelectedPlace.Facilities[2100]; // Skip $500 premium campsites
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getNumberOfAvailableFacilities = (data: PlaceResponse): number => {
  const { SelectedPlace } = data;
  const facilities = Object.values(SelectedPlace.Facilities);
  return facilities.filter((facility: Facility) => facility.Available === true)
    .length;
};

// TODO - Rename function
export const sendMessage = async (
  message: string
): Promise<TextbeltResponse | { error: string }> => {
  try {
    const textbeltResponse = await nFetch("https://textbelt.com/text", {
      body: JSON.stringify({
        key: process.env.TEXTBELT_API_KEY,
        message,
        phone: process.env.PHONE_NUMBER,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const textbeltData: TextbeltResponse = await textbeltResponse.json();
    return textbeltData;
  } catch (error) {
    return { error: error.message };
  }
};

export default {
  getData,
  getNumberOfAvailableFacilities,
  sendMessage: sendMessage,
}
