import express from "express";
import morgan from "morgan";
import cors from "cors";
import { responseWrapper } from "./middlewares/response.middleware.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";

// Express chạy từ trên xuống dưới
export const app = express();

// Chấp nhận request từ các domain khác (Cross-Origin Resource Sharing)
// Cho phép FE: 3000 gọi BE: 5000
app.use(cors());

// parse dữ liệu JSON và dữ liệu form gửi từ client vào req.body
// Khi client gửi dữ liệu dạng JSON (ví dụ: gửi thông tin tạo user mới),
// dòng này giúp server "đọc hiểu" và biến nó thành object trong req.body
// Nếu không có dòng này, req.body sẽ là undefined.
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: true --> Sẽ giúp đọc được dữ liệu các object lồng nhau

// log
// Camera giám sát, ghi lại log mỗi khi có ai truy cập.
app.use(morgan("dev"));

// Custom Middleware
// Response Wrapper, chuẩn hóa mọi dữ liệu trả về cho Frontend theo một mẫu chung.
app.use(responseWrapper);

// Routes
// API End points
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Error Handler
app.use(notFoundHandler);
app.use(errorHandler);
