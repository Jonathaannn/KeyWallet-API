const { Router } = require("express");
const router = Router();

const checkToken = require("../middleware/index");
const user = require("../controller/userController");
const account = require("../controller/accountContorller");

// Routes of User
router.post("/user/register", user.registerUser);
router.post("/user/login", user.authenticateUser);
router.get("/user/me", checkToken, user.getDataUser);
router.patch("/user/update", checkToken, user.updateUser);
router.delete("/user/delete", checkToken, user.deleteUser);

// Routes of Account
router.post("/account/create", checkToken, account.saveNewAccount);
router.get("/account/list", checkToken, account.getAllAccount);
router.patch("/account/update/:id", checkToken, account.updateAcconut);
router.delete("/account/delete/all", checkToken, account.deleteAll);
router.delete("/account/delete/:id", checkToken, account.deleteAccount);

module.exports = router;
