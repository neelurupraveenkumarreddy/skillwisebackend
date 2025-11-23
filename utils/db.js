const sqlte=require("sqlite3")
const path=require("path")
const dbPath=path.join(__dirname,"../db/inventory.sqlite")
const db=new sqlte.Database(dbPath, (err) => {
    if (err) console.error("DB Error:", err.message);
    else console.log("Connected to SQLite database.");
});
db.run(`
    CREATE TABlE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    name TEXT,
    unit TEXT,
    category TEXT,
    brand TEXT,
    stock INTEGER DEFAULT 0,
    status TEXT,
    actions TEXT
    )`)
db.run(`
    CREATE TABlE IF NOT EXISTS product_history(
    history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id INTEGER,
    change_date DATE DEFAULT CURRENT_DATE,
    old_stock INTEGER NOT NULL,
    new_stock INTEGER NOT NULL,
    changed_by INTEGER NOT NULL, 
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES products(id),
    FOREIGN KEY (changed_by) REFERENCES users(user_id)
)`)
db.run(`
  CREATE TABLE IF NOT EXISTS users(
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
  )
  `
)
db.run(`
  CREATE TABLE IF NOT EXISTS roles(
  role_id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT UNIQUE NOT NULL)
  `)
db.run(`
  CREATE TABLE IF NOT EXISTS logs(
  user_id INTEGER,
  time DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
  )`
)
module.exports=db;