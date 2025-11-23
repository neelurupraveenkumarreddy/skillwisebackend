const logsModel = require("../Models/logsModel");

// ---------------- CONTROLLER ----------------
exports.logged = async (req, res) => {
    try {
        const data = req.body; // expecting { user_id: ... }
        const result = await logsModel.logged(data); // direct await
        res.status(200).json({
            msg: "success",
            log_id: result.id
        });
    } catch (err) {
        res.status(500).json({
            msg: "failed",
            error: err.message
        });
    }
};
