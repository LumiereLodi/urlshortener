import express from "express";

import { redirectUrl, shortenUrl } from "@server/controller";

const router = express.Router();

// Add a new product
router.post("/", shortenUrl);

// Retrieve all product
router.get("/:shorturl", redirectUrl);

export default router;
