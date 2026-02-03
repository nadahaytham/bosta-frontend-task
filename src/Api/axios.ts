import axios from "axios";

/**
 * Axios instance for FakeStore API
*/
export default axios.create({
 baseURL: "https://fakestoreapi.com"
});
