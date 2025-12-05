import { readJSON } from "../utils/readJSON.js";

let products = readJSON("products.json");

export const ProductService = {
  getAll(page = 1, searchQuery = "") {
    const PAGE_SIZE = 6;

    // Lọc sản phẩm theo tên nếu có searchQuery
    let filteredProducts = products;
    if (searchQuery) {
      filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tính toán phân trang
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    // Lấy sản phẩm của trang hiện tại
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      pagination: {
        currentPage: page,
        pageSize: PAGE_SIZE,
        totalItems: totalProducts,
        totalPages: totalPages,
      },
    };
  },

  getById(id) {
    const product = products.find((p) => p.id == id);
    return product;
  },

  create(data) {
    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: data.name,
      price: data.price,
      desc: data.desc,
    };
    products.push(newProduct);
    return newProduct;
  },

  update(id, data) {
    const productIndex = products.findIndex((p) => p.id == id);

    if (productIndex === -1) {
      return null;
    }

    products[productIndex] = {
      ...products[productIndex],
      name: data.name,
      price: data.price,
      desc: data.desc,
    };

    return products[productIndex];
  },

  delete(id) {
    const productIndex = products.findIndex((p) => p.id == id);

    if (productIndex === -1) {
      return false;
    }

    products = products.filter((p) => p.id !== id);
    return true;
  },
};
