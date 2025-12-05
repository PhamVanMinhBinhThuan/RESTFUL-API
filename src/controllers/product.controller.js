import { ProductService } from "../services/product.service.js";

export const ProductController = {
  async getAll(req, res) {
    const page = Number(req.validated?.query?.page) || 1;
    const searchQuery = req.validated?.query?.q || "";

    const result = await ProductService.getAll(page, searchQuery);
    return res.ok(result, "Get products successfully");
  },

  async getById(req, res) {
    const id = Number(req.validated.params.id);
    const data = await ProductService.getById(id);

    if (!data) {
      return res.notFound(`Product with id ${id} not found`);
    }

    return res.ok(data, "Get product by id successfully");
  },

  async create(req, res) {
    const newProduct = await ProductService.create(req.validated.body);
    return res.created("Product created", newProduct);
  },

  async update(req, res) {
    const id = Number(req.validated.params.id);
    const updatedProduct = await ProductService.update(id, req.validated.body);

    if (!updatedProduct) {
      return res.notFound(`Product with id ${id} not found`);
    }

    return res.ok(updatedProduct, "Product updated");
  },

  async delete(req, res) {
    const id = Number(req.validated.params.id);
    const deleted = await ProductService.delete(id);

    if (!deleted) {
      return res.notFound(`Product with id ${id} not found`);
    }

    return res.ok(null, "Product deleted");
  },
};
