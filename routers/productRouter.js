const { createProduct, 
        getProduct, 
        deleteProduct, 
        updateProduct, 
        getAllProducts} = require("../controllers/productController")
const { protect, adminOnly } = require("../middlewares/authMiddleware")
const router = require("express").Router()

router.post("/createProduct", protect ,adminOnly, createProduct)
router.get("/getAllProducts", getAllProducts)
router.get("/getProduct/:id", getProduct)
router.delete("/deleteProduct/:id",protect, adminOnly, deleteProduct)
router.patch("/updateProduct/:id", updateProduct)

module.exports = router