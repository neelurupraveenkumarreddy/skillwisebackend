const db = require("../utils/db");

// ---------------- CREATE HISTORY ----------------
exports.createhistory = (data) => {
    return new Promise((resolve, reject) => {
        const { id, old_stock, new_stock, changed_by } = data;
        db.run(
            `INSERT INTO product_history (id, old_stock, new_stock, changed_by)
             VALUES (?, ?, ?, ?)`,
            [id, old_stock, new_stock, changed_by],
            function (err) {
                if (err) reject(err);
                else resolve({ history_id: this.lastID });
            }
        );
    });
};

// ---------------- EDIT HISTORY ----------------
exports.edithistory = (data) => {
    return new Promise((resolve, reject) => {
        const { old_stock, new_stock, changed_by, id } = data;
        db.run(
            `UPDATE product_history 
             SET old_stock = ?, new_stock = ?, changed_by = ?, timestamp = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [old_stock, new_stock, changed_by, id],
            function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            }
        );
    });
};

// ---------------- GET HISTORY BY PRODUCT ID ----------------
exports.getHistory = (data) => {
    return new Promise((resolve, reject) => {
        const  id  = data;
        db.all(
            `SELECT * FROM product_history WHERE id = ? ORDER BY timestamp DESC`,
            [id],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

// ---------------- GET ALL HISTORY ----------------
exports.getAllHistory = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM product_history`,
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};
