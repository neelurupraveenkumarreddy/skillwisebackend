const db = require("../utils/db");
const bcrypt=require("bcrypt")

// ---------------- CREATE USER ----------------
exports.createUser = (data) => {
    return new Promise((resolve, reject) => {
        const { username, email, password, role_id } = data;
        db.run(
            `INSERT INTO users (username, email, password, role_id) VALUES (?,?,?,?)`,
            [username, email, password, role_id],
            function (err) {
                if (err) reject(err);
                else resolve({ user_id: this?.lastID });
            }
        );
    });
};

// ---------------- EDIT USER ----------------
exports.editUser = (data) => {
    return new Promise((resolve, reject) => {
        const { user_id, username, email, password, role_id } = data;
        db.run(
            `UPDATE users 
             SET username=?, email=?, password=?, role_id=?
             WHERE user_id=?`,
            [username, email, password, role_id, user_id],
            function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            }
        );
    });
};

// ---------------- GET ALL USERS ----------------
exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// ---------------- GET USER BY ID ----------------
exports.getUserById = (data) => {
    return new Promise((resolve, reject) => {
        const { user_id } = data;
        db.get(`SELECT * FROM users WHERE user_id=?`, [user_id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// ---------------- DELETE USER ----------------
exports.deleteUser = (data) => {
    return new Promise((resolve, reject) => {
        const { user_id } = data;
        db.run(`DELETE FROM users WHERE user_id=?`, [user_id], function (err) {
            if (err) reject(err);
            else resolve({ changes: this.changes });
        });
    });
};

exports.login = (email) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT user_id, username, email, password, role_id 
            FROM users 
            WHERE email = ?
        `;

        db.get(query, [email], (err, row) => {
            if (err) return reject(err);
            if (!row) return reject(new Error("User not found"));

            // resolve with user row (includes password for comparison)
            resolve(row);
        });
    });
};