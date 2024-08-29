import { createContext, useContext, useEffect, useState } from 'react';

// Tạo một context mới
const ShoppingContext = createContext();

// Hook custom để sử dụng Context trong các component. Hook này sẽ trả về giá trị của Context hiện tại.
export const useShoppingContext = () => useContext(ShoppingContext);

// Component Provider cung cấp dữ liệu cho các component con
export const ShoppingContextProvider = ({ children }) => {
    // State để lưu trữ danh sách sản phẩm trong giỏ hàng, ban đầu lấy từ localStorage
    const [cartItems, setCartItems] = useState(() => {
        const jsonCartData = localStorage.getItem('shopping_cart');
        return jsonCartData ? JSON.parse(jsonCartData) : [];
    });

    // useEffect để lưu danh sách sản phẩm vào localStorage mỗi khi thay đổi
    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Tính toán số lượng sản phẩm trong giỏ hàng
    const cartQty = cartItems.reduce((qty, item) => qty + item.qty, 0);

    // Tính toán tổng giá tiền của các sản phẩm trong giỏ hàng
    const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.price, 0);
    const delivery = 0;
    const discount = 0;
    // Hàm tính toán tăng số lượng sản phẩm trong giỏ hàng
    const increaseQty = (_id) => {
        const currentCartItem = cartItems.find(item => item._id === _id);
        if (currentCartItem) {
            const newItems = cartItems.map(item => {
                if (item._id === _id) {
                    return { ...item, qty: item.qty + 1 };
                } else {
                    return item;
                }
            });
            setCartItems(newItems);
        }
    };

    // Hàm giảm số lượng sản phẩm trong giỏ hàng
    const decreaseQty = (_id) => {
        const currentCartItem = cartItems.find(item => item._id === _id);
        if (currentCartItem) {
            if (currentCartItem.qty === 1) {
                removeCartItem(_id);
            } else {
                const newItems = cartItems.map(item => {
                    if (item._id === _id) {
                        return { ...item, qty: item.qty - 1 };
                    } else {
                        return item;
                    }
                });
                setCartItems(newItems);
            }
        }
    };

    // Hàm thêm sản phẩm vào giỏ hàng
    const addCartItem = (product) => {
        const currentCartItem = cartItems.find(item => item._id === product._id);
        if (currentCartItem) {
            const newItems = cartItems.map(item => {
                if (item._id === product._id) {
                    return { ...item, qty: item.qty + 1 };
                } else {
                    return item;
                }
            });
            setCartItems(newItems);
        } else {
            const newItem = { ...product, qty: 1 };
            setCartItems([...cartItems, newItem]);
        }
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeCartItem = (_id) => {
        const newItems = cartItems.filter(item => item._id !== _id);
        setCartItems(newItems);
    };

    // Hàm xóa toàn bộ sản phẩm trong giỏ hàng
    const clearCart = () => {
        setCartItems([]);
    };

    // Trả về Provider của ShoppingContext với các giá trị và hàm xử lý
    // Component Provider của Context, cung cấp các giá trị và hàm xử lý cho các component con bên trong
    return (
        <ShoppingContext.Provider value={{ cartItems, cartQty, totalPrice, increaseQty, decreaseQty, addCartItem, removeCartItem, clearCart, delivery, discount }}>
            {children}
        </ShoppingContext.Provider>
    );
};
export default ShoppingContext;