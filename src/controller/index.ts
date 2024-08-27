import {
  addNewShortUrl,
  isPayloadValid,
  isValidUrl,
  existingUrl,
} from "@server/helper.ts/url";
import Url from "@server/model/url";
import ApiError from "@server/utils/ApiError";
import { catchAsync } from "@server/utils/catchAsync";
import { RequestHandler } from "express";
import httpStatus from "http-status";

export const shortenUrl: RequestHandler = catchAsync(async (req, res) => {
  const urlInput = isPayloadValid(req.body);
  const valideUrl = isValidUrl(urlInput);

  if (valideUrl) {
    const url = await existingUrl(urlInput);
    if (url) {
      res.status(httpStatus.OK).json(url);
      return
    }
    const newShortUrl = await addNewShortUrl(urlInput);
    res.status(httpStatus.CREATED).json(newShortUrl);
    return
  }
});

export const redirectUrl: RequestHandler = catchAsync(async (req, res) => {
  const shorturl = req.params.shorturl
  const url = await Url.findOne({ where: { shortUrl: shorturl} });
  if (url) {
    res.redirect(url.get('originalUrl') as string);
    return
    
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Short URL not found", {
      url: url,
    });
  }
});
