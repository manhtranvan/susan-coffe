import axios from 'axios';

const API_URL = 'http://localhost:8000/v1/product'; // Thay đổi URL API tùy theo địa chỉ và cổng của API thật

// Hàm để lấy danh sách sản phẩm từ API
export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products: ', error);
        throw error; // Ném lỗi để component gọi hàm này xử lý
    }
};

// Hàm để lấy 1 sản phẩm từ API
export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products: ', error);
        throw error; // Ném lỗi để component gọi hàm này xử lý
    }
};

// Hàm để lấy 1 sản phẩm từ API
export const getProductByQuery = async (params) => {
    try {
        let query = '';
        if (params.keyword) {
            query = `keyword=${params.keyword}`;
        } else if(params.category) {
            query = `category=${params.category}`;
        }
        const response = await axios.get(`${API_URL}/?${query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product: ', error);
        throw error; // Ném lỗi để component gọi hàm này xử lý
    }
  };

  // Hàm để lưu sản phẩm mới vào API
export const saveProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
        console.error('Error saving product: ', error);
        throw error;
    }
};

// Hàm để xóa sản phẩm từ API
export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product: ', error);
        throw error;
    }
};

// Hàm để cập nhật sản phẩm trong API
export const updateProduct = async (productId, updatedProduct) => {
    try {
        const response = await axios.put(`${API_URL}/${productId}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error('Error updating product: ', error);
        throw error;
    }
};