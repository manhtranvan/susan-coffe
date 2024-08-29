import React, { useEffect, useState } from 'react'
import { getCategories } from '../services/CategoryService';

const ProductForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState({ ...product });
    console.log(formData);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Lấy danh sách danh mục
        const fetchCategories = async () => {
          try {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
          } catch (error) {
            console.error("Error fetching categories: ", error);
          }
        };
        // Gọi hàm fetchCategories để lấy dữ liệu khi component được render
        fetchCategories();
      }, []);

    /*  
    Hàm xử lý thay đổi giá trị của input trong form
    handleChange: Hàm này xử lý sự kiện khi người dùng thay đổi giá trị của các input trong form. 
    Nó cập nhật formData dựa trên tên và giá trị của input được thay đổi.
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        // Cập nhật formData với giá trị mới khi input thay đổi
        setFormData((formData) => ({ ...formData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gọi hàm onSave để lưu thông tin sản phẩm sau khi submit form
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                    Tên
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="productCategory" className="form-label">
                    Danh mục
                </label>
                <select id="productCategory" name="category" className="form-control" value={formData.category} onChange={handleChange}>
                    {categories &&
                        categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                    Giá
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="productPrice"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="productImage" className="form-label">
                    Hình ảnh URL
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="productImage"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="productDesc" className="form-label">
                    Mô tả
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="productDescription"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="submit" className="btn btn-md full-width bg-dark text-light fs-md ft-medium">
                &nbsp; Save product &nbsp;
                </button>
                &nbsp;
                &nbsp;
                <button type="button" className="btn btn-md full-width bg-dark text-light fs-md ft-medium">
                &nbsp;Cancel&nbsp;
                </button>
            </div>
        </form>
    )
}

export default ProductForm