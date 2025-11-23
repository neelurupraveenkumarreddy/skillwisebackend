const db = require("../utils/db");

// ---------------- PROMISIFIED LOGGED FUNCTION ----------------
exports.logged = (data) => {
    return new Promise((resolve, reject) => {
        const { user_id } = data;
        db.run(
            `INSERT INTO logs(user_id) VALUES(?)`,
            [user_id],
            function (err) {
                if (err) reject(err);
                else resolve({ id: this?.lastID });
            }
        );
    });
};

// ---------------- PROMISIFIED GET LAST LOGGED USER ----------------
exports.getLastLoggedUser = () => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT user_id FROM logs ORDER BY time DESC LIMIT 1`,
            [],
            (err, row) => {
                if (err) reject(err);
                else resolve(row || null);
            }
        );
    });
};
