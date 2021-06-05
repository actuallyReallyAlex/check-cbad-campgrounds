import * as helpers from "../src/helpers";
import application from "../src/index";
import { mockTextbeltResponse } from "../__fixtures__";

Object.defineProperty(helpers, "sendMessage", {
  value: jest.fn(() => mockTextbeltResponse),
});

describe("application", () => {
  describe("on success", () => {
    describe("no available campsites", () => {
      const originalLog = console.log;

      beforeEach(() => {
        jest.clearAllMocks();
        console.log = jest.fn();
      });

      afterEach(() => {
        console.log = originalLog;
        jest.clearAllMocks();
      });

      it("should handle when no campsites are available", async () => {
        expect(helpers.sendMessage).not.toHaveBeenCalled();
        await application();
        expect(helpers.sendMessage).toHaveBeenCalledTimes(1);
        expect(helpers.sendMessage).toBeCalledWith(
          "There are no available campsites between today, and September 1, 2021. 🙍‍♂️"
        );
        expect(console.log).toHaveBeenCalledWith("SCRIPT SUCCESSFUL");
      });
    });

    describe("available campsites", () => {
      const originalLog = console.log;

      beforeEach(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('August 25, 2021'));
        process.env.MOCK_CAMPSITES_AVAILABLE = "TRUE";
        console.log = jest.fn();
      });

      afterEach(() => {
        process.env.MOCK_CAMPSITES_AVAILABLE = "FALSE";
        console.log = originalLog;
        jest.useRealTimers();
      });

      it("should handle when campsites are available", async () => {
        expect(helpers.sendMessage).not.toHaveBeenCalled();
        await application();
        expect(helpers.sendMessage).toHaveBeenCalledTimes(1);
        expect(helpers.sendMessage).toBeCalledWith(
          "There are 4 campsites available. Days available: Sat - 08-28-2021, Sun - 08-29-2021, Mon - 08-30-2021, Tue - 08-31-2021. 🥳"
        );
        expect(console.log).toHaveBeenCalledWith("SCRIPT SUCCESSFUL");
      });
    });
  });

  describe("on failure", () => {
    const originalError = console.error;

    beforeEach(() => {
      console.error = jest.fn();
      process.env.API_SHOULD_FAIL = "TRUE";
    });

    afterEach(() => {
      console.error = originalError;
      process.env.API_SHOULD_FAIL = "FALSE";
    });

    it("should handle a failure", async () => {
      await application();
      expect(console.error).toHaveBeenCalledWith(new Error("Mock Error"));
    });
  });
});
