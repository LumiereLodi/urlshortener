import ApiError from "@server/utils/ApiError";
import {
  getShortUrl,
  isPayloadValid,
  isValidUrl,
  urlExist,
} from "../../src/helper.ts/url";
import httpStatus from "http-status";
import Url from "@server/model/url";

describe("Testing URL services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a string with length 8", () => {
    const shortUrl = getShortUrl();
    expect(shortUrl.length).toBe(8);
  });

  it.each([
    ["return true when input URL is valide", "https://www.youtube.com/", true],
    ["return false when input URL is invalide", "httpswww.youtu/", false],
  ])("%s", (_message, url, expected) => {
    const validate = isValidUrl(url);
    expect(validate).toBe(expected);
  });

  it("should validate payload when input is correct", () => {
    const payload = {
      url: "https://www.youtube.com/",
    };
    const result = isPayloadValid(payload);
    expect(result).toBe("https://www.youtube.com/");
  });

  it("should throw an error when input payload is incorrect", () => {
    const payload = {
      url: "",
      random: "random",
      randomNumber: 5,
    };
    expect(() => {
      isPayloadValid(payload);
    }).toThrow(
      new ApiError(httpStatus.BAD_REQUEST, "Payload schema is not correct")
    );
  });

  it("should return an existing URL", async () => {
    jest.spyOn(Url, "findOne").mockResolvedValue({
      get: jest.fn((field: string) => {
        if (field === "originalUrl") return "https://www.youtube.com/";
        if (field === "shortUrl") return "iOFoxfKE";
        return undefined;
      }),
    } as any);

    const result = await urlExist("https://www.youtube.com/");
    expect(result).toMatchObject({
      originalUrl: "https://www.youtube.com/",
      shortUrl: "iOFoxfKE",
    });
  });

  it("should return a new URL", async () => {
    jest.spyOn(Url, "create").mockResolvedValue({
      id: 3,
      originalUrl: "https://www.youtube.com/",
      shortUrl: "7JS350eh",
      createdAt: "2024-08-26T17:54:44.436Z",
    } as any);

    const result = await urlExist("https://www.youtube.com/");
    expect(result).toMatchObject({
      originalUrl: "https://www.youtube.com/",
      shortUrl: new RegExp(/^/) as any,
    });
  });
});
