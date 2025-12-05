import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import {
  ProductCreateSchema,
  ProductIdSchema,
  ProductQuerySchema,
} from "../schemas/product.schema.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

// GET /products?page=x&q=abc => Trả về danh sách sản phẩm với phân trang và tìm kiếm
router.get(
  "/",
  validate({ query: ProductQuerySchema }),
  ProductController.getAll
);

// GET /products/:id => Trả về sản phẩm có id
router.get(
  "/:id",
  validate({ params: ProductIdSchema }),
  ProductController.getById
);

// POST /products => Tạo mới 1 sản phẩm
router.post(
  "/",
  validate({ body: ProductCreateSchema }),
  ProductController.create
);

// PUT /products/:id => Cập nhật sản phẩm có id
router.put(
  "/:id",
  validate({ body: ProductCreateSchema, params: ProductIdSchema }),
  ProductController.update
);

// DELETE /products/:id => Xóa sản phẩm có id
router.delete(
  "/:id",
  validate({ params: ProductIdSchema }),
  ProductController.delete
);

export default router;
