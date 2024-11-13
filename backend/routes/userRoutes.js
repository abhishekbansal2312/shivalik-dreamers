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
router.get("/", allUsers);
router.post("/", createUser);
router.get("/:id", singleUser);

// Apply both token and admin verification
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// 404 Route
router.use((req, res) => {
  res.status(404).send("<h2>Resource not found</h2>");
});

module.exports = router;
