import { MockNodeFetch } from "../src/types";
import { mockPlaceResponse, mockTextbeltResponse } from "../__fixtures__";

const nFetch = (
  endpoint:
    | "https://calirdr.usedirect.com/rdr/rdr/search/place"
    | "https://textbelt.com/text"
): Promise<MockNodeFetch> => {
  return new Promise((resolve) => {
    resolve({
      json: () =>
        new Promise((resolve) => {
          if (process.env.API_SHOULD_FAIL === "TRUE") {
            throw new Error("Mock Error");
          }

          const mockAvailable = process.env.MOCK_CAMPSITES_AVAILABLE === "TRUE";
          resolve(
            endpoint === "https://calirdr.usedirect.com/rdr/rdr/search/place"
              ? {
                  ...mockPlaceResponse,
                  SelectedPlace: {
                    ...mockPlaceResponse.SelectedPlace,
                    Facilities: {
                      ...mockPlaceResponse.SelectedPlace.Facilities,
                      708: {
                        ...mockPlaceResponse.SelectedPlace.Facilities[708],
                        Available: mockAvailable,
                      },
                    },
                  },
                }
              : mockTextbeltResponse
          );
        }),
    });
  });
};

export default nFetch;
