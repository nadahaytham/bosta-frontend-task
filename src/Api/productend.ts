import axios from "./axios";

export const getProducts = () => {
  return axios.get("/products");
};

export const getProductById = (id: string) => {
  return axios.get(`/products/${id}`);
};
export const getCategories = () => {
    return axios.get("/products/categories");
  };
  
  export const createProduct = (data: any) => {
    return axios.post("/products", data);
  };
  export const loginUser = (data: { username: string; password: string }) => {
    return axios.post("/auth/login", data);
  }; 