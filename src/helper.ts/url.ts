import { nanoid } from "nanoid";
import Url from "@server/model/url";
import { Payload, payloadSchema } from "@server/schema/url";
import { logger } from "@server/config/logger";
import ApiError from "@server/utils/ApiError";
import httpStatus from "http-status";

interface SavedUrl {
  originalUrl: string;
  shortUrl: string;
}

export const getShortUrl = () => {
  const shortUrl = nanoid(8);
  return shortUrl;
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export const isPayloadValid = (payload: Payload) => {
  const result = payloadSchema.safeParse(payload);
  if (!result.success) {
    logger.info("Failed Validation : " + JSON.stringify(result));
    throw new ApiError(httpStatus.BAD_REQUEST, "Payload schema is not correct");
  }
  return result.data.url;
};

export const existingUrl = async (
  originalUrl: string
): Promise<SavedUrl | undefined> => {
  const existingUrl = await Url.findOne({ where: { originalUrl } });
  if (existingUrl)
    return {
      originalUrl: existingUrl.get("originalUrl") as string,
      shortUrl: existingUrl.get("shortUrl") as string,
    };
  else return undefined;
};

export const addNewShortUrl = async (originalUrl: string) => {
  const shortUrl = getShortUrl();
  const newUrl = await Url.create({
    originalUrl,
    shortUrl,
    createdAt: new Date(),
  });
  return newUrl;
};
