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
        process.env.MOCK_CAMPSITES_AVAILABLE = "TRUE";
        console.log = jest.fn();
      });

      afterEach(() => {
        process.env.MOCK_CAMPSITES_AVAILABLE = "FALSE";
        console.log = originalLog;
      });

      it("should handle when campsites are available", async () => {
        expect(helpers.sendMessage).not.toHaveBeenCalled();
        await application();
        expect(helpers.sendMessage).toHaveBeenCalledTimes(1);
        expect(helpers.sendMessage).toBeCalledWith(
          "There are 90 campsites available. Days available: Wed - 06-02-2021, Thu - 06-03-2021, Fri - 06-04-2021, Sat - 06-05-2021, Sun - 06-06-2021, Mon - 06-07-2021, Tue - 06-08-2021, Wed - 06-09-2021, Thu - 06-10-2021, Fri - 06-11-2021, Sat - 06-12-2021, Sun - 06-13-2021, Mon - 06-14-2021, Tue - 06-15-2021, Wed - 06-16-2021, Thu - 06-17-2021, Fri - 06-18-2021, Sat - 06-19-2021, Sun - 06-20-2021, Mon - 06-21-2021, Tue - 06-22-2021, Wed - 06-23-2021, Thu - 06-24-2021, Fri - 06-25-2021, Sat - 06-26-2021, Sun - 06-27-2021, Mon - 06-28-2021, Tue - 06-29-2021, Wed - 06-30-2021, Thu - 07-01-2021, Fri - 07-02-2021, Sat - 07-03-2021, Sun - 07-04-2021, Mon - 07-05-2021, Tue - 07-06-2021, Wed - 07-07-2021, Thu - 07-08-2021, Fri - 07-09-2021, Sat - 07-10-2021, Sun - 07-11-2021, Mon - 07-12-2021, Tue - 07-13-2021, Wed - 07-14-2021, Thu - 07-15-2021, Fri - 07-16-2021, Sat - 07-17-2021, Sun - 07-18-2021, Mon - 07-19-2021, Tue - 07-20-2021, Wed - 07-21-2021, Thu - 07-22-2021, Fri - 07-23-2021, Sat - 07-24-2021, Sun - 07-25-2021, Mon - 07-26-2021, Tue - 07-27-2021, Wed - 07-28-2021, Thu - 07-29-2021, Fri - 07-30-2021, Sat - 07-31-2021, Sun - 08-01-2021, Mon - 08-02-2021, Tue - 08-03-2021, Wed - 08-04-2021, Thu - 08-05-2021, Fri - 08-06-2021, Sat - 08-07-2021, Sun - 08-08-2021, Mon - 08-09-2021, Tue - 08-10-2021, Wed - 08-11-2021, Thu - 08-12-2021, Fri - 08-13-2021, Sat - 08-14-2021, Sun - 08-15-2021, Mon - 08-16-2021, Tue - 08-17-2021, Wed - 08-18-2021, Thu - 08-19-2021, Fri - 08-20-2021, Sat - 08-21-2021, Sun - 08-22-2021, Mon - 08-23-2021, Tue - 08-24-2021, Wed - 08-25-2021, Thu - 08-26-2021, Fri - 08-27-2021, Sat - 08-28-2021, Sun - 08-29-2021, Mon - 08-30-2021. 🥳"
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
