import axios from 'axios';

const API_URL = 'http://localhost:8000/v1/category'; // Thay đổi URL API tùy theo địa chỉ và cổng của API thật

// Hàm để lấy danh sách danh mục từ API
export const getCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories: ', error);
        throw error; // Ném lỗi để component gọi hàm này xử lý
    }
};

// Hàm để lưu category mới vào API
 export const saveCategory = async (category) => {
    try {
        const response = await axios.post(API_URL, category);
        return response.data;
    } catch (error) {
        console.error('Error saving category: ', error);
        throw error;
    }
};

// Hàm để xóa category từ API
export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${API_URL}/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting category: ', error);
        throw error;
    }
};

// Hàm để cập nhật category trong API
export const updateCategory = async (categoryId, updatedCategory) => {
    try {
        const response = await axios.put(`${API_URL}/${categoryId}`, updatedCategory);
        return response.data;
    } catch (error) {
        console.error('Error updating product: ', error);
        throw error;
    }
};