const productmodel = require("../Models/productsModel");
const logsModel = require("../Models/logsModel");
const producthistoryModel = require("../Models/productshistoryModel");

// ---------------- CSV to JSON ----------------
function parseCSVtoJSON(csv) {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map(line => {
        const values = line.split(",");
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i]);
        return obj;
    });
}

// ---------------- JSON to CSV ----------------
function convertJSONtoCSV(data) {
    if (!data || !data.length) return "";
    const headers = Object.keys(data[0]);
    const rows = [
        headers.join(","),
        ...data.map(row => headers.map(h => row[h]).join(","))
    ];
    return rows.join("\n");
}

// ---------------- GET LAST LOGGED USER ----------------
async function getLastLoggedUser() {
    const row = await logsModel.getLastLoggedUser();
    return row?.user_id || null;
}

// ---------------- CSV IMPORT ----------------
exports.csvImporting = async (req, res) => {
    try {
        const { csvData } = req.body;
        const parsed = parseCSVtoJSON(csvData);
        const user = await getLastLoggedUser();
        for (const i of parsed) {
            let rs=await productmodel.createProduct(i);
            let history = {
                id: rs.id,
                old_stock: 0,
                new_stock: i.stock,
                changed_by: user
            };
            await producthistoryModel.createhistory(history);
        }

        res.status(200).json({ msg: "successfully inserted all data" });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};
exports.getNumberOfProducts=async(req,res)=>{
    try {
        const result = await productmodel.countProducts();
        res.status(200).json({ msg: "success", allData: result });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
}
// ---------------- CREATE PRODUCT ----------------
exports.createProduct = async (req, res) => {
    try {
        const data = req.body;
        const user = await getLastLoggedUser();
        const result=await productmodel.createProduct(data);
        let history = {
            id:result.id,
            old_stock: 0,
            new_stock: data.stock,
            changed_by: user
        };

        
        await producthistoryModel.createhistory(history);

        res.status(200).json({ msg: "success" });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

// ---------------- EDIT PRODUCT ----------------
exports.editProduct = async (req, res) => {
    try {
        const data = req.body;
        const user = await getLastLoggedUser();

        // get old stock before editing
        const oldProduct = await productmodel.getProduct({ id: data.id });
        const oldStock = oldProduct.stock;
        console.log(oldStock)
        let history = {
            id: data.id,
            old_stock: oldStock,
            new_stock: data.stock,
            changed_by: user
        };

        const updated = await productmodel.editProduct(data);
        await producthistoryModel.edithistory(history);

        res.status(200).json({ msg: "success", id: updated.id });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

// ---------------- GET ALL PRODUCTS ----------------
exports.getAllProducts = async (req, res) => {
    try {
        const result = await productmodel.allProducts();
        res.status(200).json({ msg: "success", allData: result });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

// ---------------- GET PRODUCTS AS CSV ----------------
exports.getCSVProducts = async (req, res) => {
    try {
        const result = await productmodel.allProducts();
        res.status(200).json({ msg: "success", allData: convertJSONtoCSV(result) });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

// ---------------- PAGINATION ----------------
exports.getProducts = async (req, res) => {
    try {
        const data = req.body;
        const result = await productmodel.paginationProducts(data);
        res.status(200).json({ msg: "success", allData: result });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};

// ---------------- DELETE PRODUCT ----------------
exports.deleteProduct = async (req, res) => {
    try {
        const result = await productmodel.deleteProduct(req.body);
        res.status(200).json({ msg: "success", allData: result });
    } catch (err) {
        res.status(500).json({ msg: "failed", error: err.message });
    }
};
