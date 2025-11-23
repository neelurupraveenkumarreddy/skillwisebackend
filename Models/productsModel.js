const db = require("../utils/db");

// ---------------- CREATE PRODUCT ----------------
exports.createProduct = (data) => {
    return new Promise((resolve, reject) => {
        const { image, name, unit, category, brand, stock, status, actions } = data;
        db.run(
            `INSERT INTO products (image, name, unit, category, brand, stock, status, actions)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [image, name, unit, category, brand, stock, status, actions],
            function (err) {
                if (err) reject(err);
                else resolve({ id: this?.lastID });
            }
        );
    });
};

// ---------------- EDIT PRODUCT ----------------
exports.editProduct = (data) => {
    return new Promise((resolve, reject) => {
        const { id, image, name, unit, category, brand, stock, status, actions } = data;
        db.run(
            `UPDATE products 
             SET image=?, name=?, unit=?, category=?, brand=?, stock=?, status=?, actions=?
             WHERE id=?`,
            [image, name, unit, category, brand, stock, status, actions, id],
            function (err) {
                if (err) reject(err);
                else resolve({ id });
            }
        );
    });
};

// ---------------- GET ALL PRODUCTS ----------------
exports.allProducts = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM products`, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
exports.countProducts = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT count(*) as total FROM products`, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
// ---------------- PAGINATION ----------------
exports.paginationProducts = (data) => {
    return new Promise((resolve, reject) => {
        const { limit, offset } = data;
        db.all(
            `SELECT * FROM products order by id desc LIMIT ? OFFSET ?`,
            [limit, offset],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

// ---------------- GET PRODUCT BY ID ----------------
exports.getProduct = (data) => {
    return new Promise((resolve, reject) => {
        const { id } = data;
        db.get(`SELECT * FROM products WHERE id=?`, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// ---------------- DELETE PRODUCT ----------------
exports.deleteProduct = (data) => {
    return new Promise((resolve, reject) => {
        const { id } = data;
        db.run(`DELETE FROM products WHERE id=?`, [id], function (err) {
            if (err) reject(err);
            else resolve({ changes: this.changes });
        });
    });
};
