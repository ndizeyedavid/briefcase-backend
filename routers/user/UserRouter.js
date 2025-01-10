import express from "express";
import {
  HistoryViewAll,
  DeleteHistory,
} from "../../controllers/User/History/HistoryController.js";

import {
  viewSettings,
  updateSettings,
  ResetField,
} from "../../controllers/User/Settings/SettingsController.js";

import {
  trackingViewAll,
  trackingViewSome,
  trackingGetStatus,
  updateTrackingStatus,
  FailedAttempts
} from "../../controllers/User/Tracking/TrackingController.js";

const UserRouter = express.Router();

// History Routers
UserRouter.get("/history/view/all", HistoryViewAll);
UserRouter.delete("/history/delete/:id", DeleteHistory);

// Settings Router
UserRouter.get("/settings/view", viewSettings);
UserRouter.put("/settings/update", updateSettings);
UserRouter.get("/settings/reset/:category", ResetField);

// Tracking Router
UserRouter.get("/tracking/view/all", trackingViewAll);
UserRouter.get("/tracking/view/:option", trackingViewSome);
UserRouter.get("/tracking/status", trackingGetStatus);
UserRouter.put("/tracking/status/update", updateTrackingStatus);

// failed attempt Notification
UserRouter.get("/notifications/failed/today", FailedAttempts)

export default UserRouter;
