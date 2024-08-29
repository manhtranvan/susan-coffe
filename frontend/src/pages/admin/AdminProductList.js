import React, { useState, useEffect } from 'react'
import ProductTable from '../../components/ProductTable'
import { deleteProduct, getProducts, saveProduct, updateProduct } from '../../services/ProductService';
import ProductForm from '../../components/ProductForm';

const AdminProductList = () => {
    // State để lưu trữ danh sách sản phẩm từ API
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    // Hook useEffect được sử dụng để gọi API lấy danh sách sản phẩm khi component được render
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                // Lưu trữ danh sách sản phẩm từ response vào state
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        // Gọi hàm fetchProducts để lấy dữ liệu khi component được render
        fetchProducts();
    }, [editingProduct]);

    // Hàm xử lý khi người dùng lưu thông tin sản phẩm (thêm mới hoặc cập nhật)
    const handleSave = async (product) => {
        // Nếu sản phẩm đã có id tức là đang chỉnh sửa, gọi API để cập nhật thông tin sản phẩm
        if (product._id) {
            try {
                await updateProduct(product._id, product);
                // Cập nhật lại state products sau khi cập nhật thành công
                setProducts(products.map((p) => (p._id === product._id ? product : p)));
              } catch (error) {
                console.error("Error updating product: ", error);
              }
        } else {
            // Nếu sản phẩm chưa có id tức là đang thêm mới, gọi API để thêm mới sản phẩm
            try {
                const newProduct = await saveProduct(product);
                // Cập nhật lại state products sau khi thêm mới thành công
                setProducts([...products, newProduct]);
            } catch (error) {
                console.error("Error adding product: ", error);
            }
        }
        // Đặt editingProduct về null sau khi lưu thành công
        setEditingProduct(null);
    };

    // Hàm xử lý khi người dùng muốn thêm sản phẩm mới
    const handleAddNew = () => {
        // Đặt editingProduct là một sản phẩm mới để hiển thị form thêm mới sản phẩm
        setEditingProduct({ _id: null, name: "", category: "", price: "", image: "", desc: "" });
    };

    // Hàm xử lý khi người dùng muốn chỉnh sửa sản phẩm
    const handleEdit = (product) => {
        // Đặt sản phẩm đang chỉnh sửa vào state editingProduct
        setEditingProduct(product);
    };

    // Hàm xử lý khi người dùng muốn xóa sản phẩm
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      // Cập nhật lại state products sau khi xóa thành công
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
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
                                    Thêm sản phẩm
                                </a>
                                {/* Khi click nút Sửa thì onEdit sẽ gọi hàm handleEdit để gán product. Khi đó nếu là trường hợp là chỉnh sửa sản phẩm thì xuất hiện Form */}
                                {editingProduct && (
                                    <ProductForm
                                        product={editingProduct}
                                        onSave={handleSave}
                                        onCancel={() => setEditingProduct(null)}
                                    />
                                )}
                                <ProductTable
                                    products={products}
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

export default AdminProductList