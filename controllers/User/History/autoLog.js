import db from "../../../DB.js";

const LogThis = (log) => {
  const sql = "INSERT INTO history(details) VALUES(?)";
  db.query(sql, [log], (err, result) => {
    if (err) return console.log("Failed to save this log => '" + log + "' ERROR: "+err.message);
  });
};

export { LogThis };
