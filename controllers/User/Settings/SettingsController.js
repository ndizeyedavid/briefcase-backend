import db from "../../../DB.js";

const viewSettings = (req, res) => {
  const sql = "SELECT * FROM notifications";

  db.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({
        message: "Failed to display current notification",
        error: err.message,
      });

    res
      .status(200)
      .json({ message: "Settings fetched successfully", result: result });
  });
};

const updateSettings = (req, res) => {
  const { notification } = req.body;

  const sql = "UPDATE notifications SET notification=?";
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

const FailedAttempts = (req, res) => {
  const sql = "SELECT * FROM notifications WHERE date=CURDATE()"
  db.query(sql, (err, result)=>{
    if (err) return res.status(500).json({message: "unable to fetch failed attempts", error: err.message});
    res.status(200).json({result: result})
  })
}

export { viewSettings, updateSettings, ResetField, FailedAttempts };
