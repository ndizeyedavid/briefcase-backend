import db from '../../../DB.js';

const updateEmail = (req, res) => {
    const { email, oldEmail, password  } = req.body;
    // First verify the password
    const verifyQuery = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(verifyQuery, [oldEmail, password], (err, result) => {
        if (err) return res.status(500).json({ message: "Internal server error" });
        if (result.length === 0) return res.status(401).json({ message: "Invalid password" });

        // Update email
        const updateQuery = "UPDATE admin SET email = ? WHERE email = ?";
        db.query(updateQuery, [email, oldEmail], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: "Email already exists" });
                }
                return res.status(500).json({ message: "Internal server error" });
            }
            res.json({ message: "Email updated successfully" });
        });
    });
};

const updatePassword = (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    // First verify current password
    const verifyQuery = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(verifyQuery, [email, currentPassword], (err, result) => {
        if (err) return res.status(500).json({ message: "Internal server error" });
        if (result.length === 0) return res.status(401).json({ message: "Current password is incorrect" });

        // Update password
        const updateQuery = "UPDATE admin SET password = ? WHERE email = ?";
        db.query(updateQuery, [newPassword, email], (err, result) => {
            if (err) return res.status(500).json({ message: "Internal server error" });
            res.json({ message: "Password updated successfully" });
        });
    });
};

export { updateEmail, updatePassword };