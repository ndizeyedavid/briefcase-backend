import db from "../../../DB.js";

const viewSettings = (req, res) => {
  const sql = "SELECT * FROM settings";

  db.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({
        message: "Failed to display current settings",
        error: err.message,
      });

    res
      .status(200)
      .json({ message: "Settings fetched successfully", result: result });
  });
};

const updateSettings = (req, res) => {
  const { notification } = req.body;

  const sql = "UPDATE settings SET notification=?";
  db.query(sql, [notification], (err, result) => {
    if (err)
      return res.status(500).json({
        message: "Unable to set push notifications",
        error: err.message,
      });

    res.status(200).json({ message: "Push notification updated" });
  });
};

const ResetField = (req, res) => {
  const { category } = req.params;

  if (category == "users") {
    return res.status(503).json({ message: "Unauthorised access" });
  }

  const sql = "TRUNCATE " + category;

  db.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({
        message: `Unable to update "${category}"`,
        error: err.message,
      });

    res.status(200).json({ message: `"${category}" reseted successfully` });
  });
};
export { viewSettings, updateSettings, ResetField };
