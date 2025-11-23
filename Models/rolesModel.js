const db = require("../utils/db");

// ---------------- CREATE ROLE ----------------
exports.createRole = (data) => {
    return new Promise((resolve, reject) => {
        const { role_name } = data;
        db.run(
            `INSERT INTO roles (role_name) VALUES (?)`,
            [role_name],
            function (err) {
                if (err) reject(err);
                else resolve({ id: this?.lastID });
            }
        );
    });
};

// ---------------- GET ALL ROLES ----------------
exports.getAllRoles = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM roles`, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
