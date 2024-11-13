const express = require("express");
const router = express.Router();
const {
  allUsers,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
  getParticipatedEvents,
} = require("../controllers/userController");
const authenticateToken = require("../middlewares/verifyToken");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

// Define routes
router.get("/", authenticateAdmin, allUsers);
router.post("/", authenticateAdmin, createUser);
router.get("/:id", authenticateToken, singleUser);

// Apply both token and admin verification
router.put("/:id", authenticateAdmin, updateUser);
router.delete("/:id", authenticateAdmin, deleteUser);

// 404 Route
router.use((req, res) => {
  res.status(404).send("<h2>Resource not found</h2>");
});

module.exports = router;
