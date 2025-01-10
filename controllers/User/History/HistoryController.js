import db from "../../../DB.js";

const HistoryViewAll = (req, res) => {
  const sql = "SELECT * FROM history ORBER BY date DESC";

  db.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({
        message: "Unable to fetch briefcase logs",
        error: err.message,
      });

    res
      .status(200)
      .json({ message: `Fetched ${result.length} log(s)`, data: result });
  });
};

const DeleteHistory = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM history WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Unable to delete history log", error: err.message });

    res.status(200).json({ message: "Message log deleted", result: result });
  });
};

export { HistoryViewAll, DeleteHistory };
