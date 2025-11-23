const usersModel = require("../Models/usersModel");
const logsModel=require("../Models/logsModel")
const bcrypt = require("bcrypt");

// ---------------- CONTROLLERS ----------------
exports.createUser = async (req, res) => {
    try {
        const data = req.body;

        // Hash the password before sending to model
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const result = await usersModel.createUser(data);

        res.status(200).json({ 
            msg: "User created successfully",
            user_id: result.user_id 
        });

    } catch (err) {
        res.status(500).json({ 
            msg: "failed", 
            error: err.message 
        });
    }
};
exports.editUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await usersModel.editUser(data);
        res.status(200).json({ msg: "updated", updated_rows: result.changes });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const rows = await usersModel.getAllUsers();
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const row = await usersModel.getUserById(req.params.id);
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await usersModel.deleteUser(req.params.id);
        res.status(200).json({ msg: "deleted", deleted_rows: result.changes });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.login(email);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid password" });
        }
        await logsModel.logged({ user_id: user.user_id });
        res.status(200).json({
            msg: "Login successful",
            user
        });

    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};