import api from "./axios";
import { Product } from "../Types/products";

/**
 * Fetch all products
 */
export const getProducts = () => {
  return api.get<Product[]>("/products");
};

/**
 * Fetch single product by ID "View Details"
 */
export const getProductById = (id: string) => {
  return api.get<Product>(`/products/${id}`);
};

/**
 * Fetch available product categories "Filter By Category"
 */
export const getCategories = () => {
  return api.get<string[]>("/products/categories");
};

/**
 * Create new product
 */
export const createProduct = (data: Product) => {
  return api.post("/products", data);
};

/**
 * Login user
 */
export const loginUser = (data: { username: string; password: string }) => {
  return api.post("/auth/login", data);
};
