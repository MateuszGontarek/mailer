const express = require("express");
const router = express.Router();
const userService = require("./service");

// routes
router.get("/messages", (req, res) => res.redirect("/"));
router.post("/api/messages", userService.sendMessage);
router.post("/api/get-messages", userService.getMessage);
router.delete("/api/delete-message/:id", userService.deleteMessage);
router.put("/api/read-message/:id", userService.readMessage);
module.exports = router;
