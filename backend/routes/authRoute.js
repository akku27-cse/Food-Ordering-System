const express = require('express');
const router = express.Router();
const {
    registerController,
    loginController,
    testController,
    forgetPasswordController,
    getOrdersController,
    updateProfileController
} = require('../controllers/authController');
const { requireSignIn, isAdmin,isUser } = require('../middlewares/authMiddleware');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forget-password', forgetPasswordController);
router.get('/test', requireSignIn, testController); // Protected route, requires authentication

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.put("/profile", requireSignIn, updateProfileController);

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get('/orders',requireSignIn,getOrdersController)
module.exports = router;
