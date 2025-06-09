import db from "../../../DB.js";

const login = (req, res) => {
  const { email, password } = req.body;

  const verify_email = "SELECT * FROM admin WHERE email=?";
  db.query(verify_email, [email], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Unable to login", error: err.message });

    if (result.length > 0) {
      if (password === result[0].password) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "access denied" });
      }
    } else {
      res.status(400).json({ message: "Incorrect email..." });
    }
  });
};

const updatePorfile = (req, res) => {
  const { email, password } = req.body;

  const sql = "UPDATE admin SET email=? , password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "FAiled to update profile", error: err.message });

    res.status(200).json({ message: "Profile updated successfully" });
  });
};

export { login, updatePorfile };
