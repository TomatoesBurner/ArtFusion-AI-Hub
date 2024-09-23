const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const { reqDataValidate } = require("../middlewares/validationMiddleware");
const { userRegisterJoiSchema } = require("../dtos/userRegisterDto");
const { userLoginJoiSchema } = require("../dtos/userLoginDto");
const { tokenRefreshJoiSchema } = require("../dtos/tokenRefreshInputDto");

const router = express.Router();

router.post(
    "/signup",
    reqDataValidate(userRegisterJoiSchema),
    authController.signup
);
router.post(
    "/login",
    reqDataValidate(userLoginJoiSchema),
    authController.login
);

router.post("/logout/:token", authController.protect, authController.logout);

router.post(
    "/tokenRefresh",
    reqDataValidate(tokenRefreshJoiSchema),
    authController.tokenRefresh
);

router.post("/forgetPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
    "/updateMyPassword",
    authController.protect,
    authController.updatePassword
);
router.get("/me", authController.protect, userController.getMe);

router.use(authController.protect);

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
