import express from "express";
import urlRoute from "./url.route";

const router = express.Router();

const routes = [
  {
    path: "/",
    route: urlRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
