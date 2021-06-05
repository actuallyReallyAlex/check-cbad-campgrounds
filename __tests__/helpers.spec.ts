import {
  getData,
  getNumberOfAvailableFacilities,
  sendMessage,
} from "../src/helpers";
import { PlaceResponse, TextbeltResponse } from "../src/types";
import { mockPlaceResponse } from "../__fixtures__";

describe("helpers", () => {
  describe("getData", () => {
    describe("on success", () => {
      it("should hit ReserveCA API and return json data", async () => {
        const data = await getData("12-31-1999");
        expect((data as PlaceResponse).SelectedPlace.Name).toBe(
          "South Carlsbad SB"
        );
      });
    });

    describe("on failure", () => {
      beforeEach(() => {
        process.env.API_SHOULD_FAIL = "TRUE";
      });

      afterEach(() => {
        process.env.API_SHOULD_FAIL = "FALSE";
      });

      it("should handle an error when hitting the ReserveCA API", async () => {
        const data = await getData("12-31-1999");
        expect(data).toEqual({ error: "Mock Error" });
      });
    });
  });

  describe("getNumberOfAvailableFacilities", () => {
    it("should get the number of available facilities from a response", () => {
      const numberOfAvailableFacilities =
        getNumberOfAvailableFacilities(mockPlaceResponse);
      expect(numberOfAvailableFacilities).toBe(0);
    });
  });

  describe("sendMessage", () => {
    describe("on success", () => {
      it("should handle sending a message via SMS", async () => {
        const data = await sendMessage("Test Message");
        expect((data as TextbeltResponse).success).toBe(true);
      });
    });

    describe("on failure", () => {
      beforeEach(() => {
        process.env.API_SHOULD_FAIL = "TRUE";
      });

      afterEach(() => {
        process.env.API_SHOULD_FAIL = "FALSE";
      });

      it("should handle an error when sending a message via SMS", async () => {
        const data = await sendMessage("Test Message");
        expect(data).toEqual({ error: "Mock Error" });
      });
    });
  });
});
