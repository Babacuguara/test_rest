var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var ProductsController = require("../ProductsController");
var AdminAuth = require("../middleware/AdminAuth")



router.get("/", HomeController.index);
router.post("/user", UserController.create);
router.get("/user", AdminAuth,UserController.index);
router.get("/users=/:id", AdminAuth,AdminAuth,UserController.findUser);
router.put("/user", AdminAuth,UserController.edit);
router.delete("/user/:id", AdminAuth, UserController.remove);
router.post("/recoverpassword", UserController.recoverPassword);
router.post("/changepassword", UserController.changePassword);
router.post("/login", UserController.login);
router.post("/validate",AdminAuth, HomeController.validate);

// Rotas para Categorias
router.get("/produtos", ProductsController.create)
app.get('/produtos', (req, res)



module.exports = router;