const express=require("express")
require('dotenv').config();
const cors=require("cors")
const phRoutes=require("./Routes/producthistoryRoutes")
const productRoutes=require("./Routes/productRoutes")
const userRoutes=require("./Routes/userRoutes")
const rolesRoutes=require("./Routes/rolesRoutes")
app=express()
app.use(cors())
app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/history",phRoutes)
app.use("/api/products",productRoutes)
app.use("/api/roles",rolesRoutes)

app.listen(55000, () => console.log(`Server running on port ${process.env.port}`));
