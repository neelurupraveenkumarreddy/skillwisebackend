const rolesModel = require("../Models/rolesModel");

// ---------------- CONTROLLERS ----------------
exports.createRole = async (req, res) => {
    try {
        const data = req.body;
        const result = await rolesModel.createRole(data); // direct await
        res.status(200).json({ msg: "success", id: result.id });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

exports.allRoles = async (req, res) => {
    try {
        const rows = await rolesModel.getAllRoles(); // direct await
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};
