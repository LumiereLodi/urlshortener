import {
  addNewShortUrl,
  isPayloadValid,
  isValidUrl,
  urlExist,
} from "@server/helper.ts/url";
import Url from "@server/model/url";
import ApiError from "@server/utils/ApiError";
import { catchAsync } from "@server/utils/catchAsync";
import { RequestHandler } from "express";
import httpStatus from "http-status";

export const shortenUrl: RequestHandler = catchAsync(async (req, res) => {
  const url = isPayloadValid(req.body);
  const valideUrl = isValidUrl(url);

  if (valideUrl) {
    const existingUrl = await urlExist(url);
    if (existingUrl) {
      res.status(httpStatus.OK).json(existingUrl);
    }
    const newShortUrl = await addNewShortUrl(url);
    res.status(httpStatus.CREATED).json(newShortUrl);
  }
});

export const redirectUrl: RequestHandler = catchAsync(async (req, res) => {
  const shorturl = req.params.shorturl
  const url = await Url.findOne({ where: { shortUrl: shorturl} });
  if (url) {
    res.redirect(url.get('originalUrl') as string);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Short URL not found", {
      url: url,
    });
  }
});
