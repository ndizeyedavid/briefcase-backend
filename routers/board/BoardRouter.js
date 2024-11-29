import express from "express";
import {
  fetchStatus,
  changeBriefcaseState,
  sendTrackingInfo,
} from "../../controllers/Board/BoardControllers.js";

const BoardRouter = express.Router();

BoardRouter.get("/briefcase/status", fetchStatus);
BoardRouter.put("/briefcase/status/change", changeBriefcaseState);
BoardRouter.post("/briefcase/tracking", sendTrackingInfo);

export default BoardRouter;
