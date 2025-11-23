const express = require("express");
const router = express.Router();

const rolesController = require("../Controller/rolesController");

// CREATE ROLE
router.post("/create", rolesController.createRole);

// GET ALL ROLES
router.get("/all", rolesController.allRoles);

module.exports = router;
