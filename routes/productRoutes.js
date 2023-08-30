import express from "express";
import ProductController from "../controllers/productController.js";
const router = express.Router();

router.get("/products", ProductController.getAllProducts);
router.post("/products", ProductController.createProduct);
router.patch("/products", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);
router.get("/products/:id", ProductController.getProduct);

export default router;
