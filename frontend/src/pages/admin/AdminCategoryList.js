import React, { useState, useEffect } from 'react'
import CategoryTable from '../../components/CategoryTable'
import { deleteCategory, getCategories, saveCategory, updateCategory } from '../../services/CategoryService';
import CategoryForm from '../../components/CategoryForm';

const AdminCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

    // Hook useEffect được sử dụng để gọi API lấy danh sách category khi component được render
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories();
                // Lưu trữ danh sách category từ response vào state
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        // Gọi hàm fetchProducts để lấy dữ liệu khi component được render
        fetchCategories();
    }, [editingCategory]);

    // Hàm xử lý khi người dùng muốn thêm category mới
    const handleAddNew = () => {
        // Đặt editingCategory là một category mới để hiển thị form thêm mới category
        setEditingCategory({ _id: null, name: "" });
    };

    // Hàm xử lý khi người dùng lưu thông tin category (thêm mới hoặc cập nhật)
    const handleSave = async (category) => {
        // Nếu category đã có id tức là đang chỉnh sửa, gọi API để cập nhật thông tin category
        if (category._id) {
            try {
                await updateCategory(category._id, category);
                // Cập nhật lại state categories sau khi cập nhật thành công
                setCategories(categories.map((c) => (c._id === category._id ? category : c)));
            } catch (error) {
                console.error("Error updating category: ", error);
            }
        } else {
            // Nếu category chưa có id tức là đang thêm mới, gọi API để thêm mới category
            try {
                const newCategory = await saveCategory(category);
                console.log(newCategory)
                // Cập nhật lại state categories sau khi thêm mới thành công
                setCategories([...categories, newCategory]);
            } catch (error) {
                console.error("Error adding category: ", error);
            }
        }
        // Đặt editingProduct về null sau khi lưu thành công
        setEditingCategory(null);
    };

    // Hàm xử lý khi người dùng muốn chỉnh sửa category
    const handleEdit = (category) => {
        // Đặt category đang chỉnh sửa vào state editingCategory
        setEditingCategory(category);
    };

    // Hàm xử lý khi người dùng muốn xóa sản phẩm
    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            // Cập nhật lại state categories sau khi xóa thành công
            setCategories(categories.filter((category) => category._id !== id));
        } catch (error) {
            console.error("Error deleting category: ", error);
        }
    };

    return (
        <>
            <section className="ftco-section ftco-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ftco-animate fadeInUp ftco-animated">
                            <div className="cart-list">
                                <a onClick={handleAddNew} className="btn btn-md full-width bg-dark text-light fs-md ft-medium">
                                    Thêm category
                                </a>
                                {/* Khi click nút Sửa thì onEdit sẽ gọi hàm handleEdit để gán product. Khi đó nếu là trường hợp là chỉnh sửa category thì xuất hiện Form */}
                                {editingCategory && (
                                    <CategoryForm
                                        category={editingCategory}
                                        onSave={handleSave}
                                        onCancel={() => setEditingCategory(null)}
                                    />
                                )}
                                <CategoryTable
                                    categories={categories}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminCategoryList