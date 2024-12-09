import db from "../../DB.js";
import { LogThis } from "../User/History/autoLog.js";
const fetchStatus = (req, res) => {
  const sql = "SELECT status FROM tracking ORDER BY id DESC LIMIT 1";
  db.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({
        message: "Failed to fetch tracking status",
        error: err.message,
      });

    res.status(200).json({ message: "Status fetched", result: result[0] });
  });
};

const changeBriefcaseState = (req, res) => {
  const { state } = req.body;
  //   console.log(state);
  const sql = "UPDATE tracking SET status=?";

  db.query(sql, [state == 1 ? "open" : "closed"], (err, result) => {
    if (err)
      return res.status(500).json({
        message: "Unable to change briefcase state",
        error: err.message,
      });

    res
      .status(200)
      .json({ message: `Briefcase ${state == 1 ? "Open" : "Closed"}` });
    LogThis("Briefcase state changed from the Board");
  });
};

const sendTrackingInfo = (req, res) => {
  const { lat = 0.567892, long = 1.45678904, status } = req.body;

  const sql =
    "INSERT INTO tracking(latitude, longitude, status) VALUES(? , ? , ?)";

  db.query(sql, [lat, long, status], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Unable to send tracking data", error: err.message });

    res.status(201).json({ message: "Successfully sent tracking data" });
  });
};
export { fetchStatus, changeBriefcaseState, sendTrackingInfo };
