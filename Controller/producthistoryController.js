const prModel = require("../Models/productshistoryModel");

// ---------------- CONTROLLER ----------------
exports.getAllhistory = async (req, res) => {
    try {
        const rows = await prModel.getAllHistory(); // direct await
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const {id} = req.params; // { product_id: ... }
        const rows = await prModel.getHistory(id);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};
