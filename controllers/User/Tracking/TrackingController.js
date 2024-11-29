import db from "../../../DB.js";
import { LogThis } from "../History/autoLog.js";

const trackingViewAll = (req, res) => {
  const sql = "SELECT * FROM tracking";

  db.query(sql, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Unable to track the briefcase", error: err.message });

    res.status(200).json({ message: "Briefcase tracked", result: result });
  });
};

const trackingViewSome = (req, res) => {
  const { option } = req.params;

  const sql = "SELECT ? FROM tracking";

  db.query(sql, [option], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Unknown column", error: err.message });

    res
      .status(200)
      .json({ message: `"${option}" fetched successfully`, result: result });
  });
};

const trackingGetStatus = (req, res) => {
  const sql = "SELECT status from tracking ORDER BY id DESC limit 1";

  db.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({
        message: "Unable to get briefcase status",
        error: err.message,
      });

    res
      .status(200)
      .json({ message: "Briefcase Status fetched", result: result });
  });
};

const updateTrackingStatus = (req, res) => {
  const { state } = req.body;
  const sql = "UPDATE tracking SET status=?";

  db.query(sql, [state ? "open" : "closed"], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Unable to Change status", error: err.message });

    res.status(200).json({ message: "Briefcase State changed" });
  });

  LogThis(`Briefcase ${state ? "Opened" : "Closed"}`);
};
export {
  trackingViewAll,
  trackingViewSome,
  trackingGetStatus,
  updateTrackingStatus,
};
