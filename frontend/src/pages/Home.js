// gõ rafce sẽ xuất hiện autocomplete để tạo component tự động
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import { getCategories } from "../services/CategoryService";
import { useShoppingContext } from "../contexts/ShoppingContext";

// Add "fadeInUp ftco-animated" after "ftco-animate"
const Home = () => {
  /*
    Với useState(), chúng ta có thể truyền initial state (state khởi tạo) làm tham số, ở đây là mảng []. 
    Hàm useState() sẽ trả về một mảng với 2 phẩn tử, đó là [characterChoiceNumbers, setCharacterChoiceNumbers]. 
    Phần tử đầu tiên là state hiện tại, phần tử thứ 2 là hàm set state cho state này, tương tự với hàm setState()
    */
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { addCartItem } = useShoppingContext()

  /*
      useEffect là 1 hook trong react giúp component của bạn liên lạc hiệu quả với các hệ thống bên ngoài React
      (ví dụ gọi API đến phần backend, tương tác với ứng dụng bên thứ ba…) .
      */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        // Lưu trữ danh sách danh mục từ response vào state
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    // Gọi hàm fetchCategories để lấy dữ liệu khi component được render
    fetchCategories();

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
  }, []);

  return (
    <>
      <section className="ftco-menu mb-5 pb-5">
        <div className="container">
          <div className="row d-md-flex">
            <div className="col-lg-12 ftco-animate p-md-5 fadeInUp ftco-animated">
              <div className="row">
                <div className="col-md-12 nav-link-wrap mb-5">
                  <div
                    className="nav ftco-animate nav-pills justify-content-center fadeInUp ftco-animated"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    {categories.map((item, index) => (
                      <a
                        className={`nav-link ${index === 0 ? "active" : ""}`}
                        id={`v-pills-${index}-tab`}
                        data-toggle="pill"
                        href={`#v-pills-${index}`}
                        role="tab"
                        aria-controls={`v-pills-${index}`}
                        aria-selected="true"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="col-md-12 d-flex align-items-center">
                  <div
                    className="tab-content ftco-animate fadeInUp ftco-animated"
                    id="v-pills-tabContent"
                  >
                    {categories.map((category, index) => (
                      <div
                        className={`tab-pane fade${
                          index === 0 ? " show active" : ""
                        }`}
                        id={`v-pills-${index}`}
                        role="tabpanel"
                        aria-labelledby={`v-pills-${index}-tab`}
                      >
                        <div className="row">
                          {products
                            .filter((item) => category._id === item.category)
                            .map((item) =>
                              index === 0 ? (
                                <div className="col-md-3">
                                  <div className="menu-entry">
                                    <Link to={`/product/${item._id}`} className="menu-img img mb-4"
                                    style={{
                                      backgroundImage: `url(images/${item.image})`,
                                    }}>
                                    </Link>
                                    <div className="text text-center pt-4">
                                      <h3>
                                      <Link to={`/product/${item._id}`}>
                                        {item.name}
                                      </Link>
                                      </h3>
                                      <p>{item.description}</p>
                                      <p className="price">
                                        <span>${item.price}</span>
                                      </p>
                                      <p>
                                        <a
                                          href="javascript:void(0)" onClick={() => addCartItem(item)}
                                          className="btn btn-primary btn-outline-primary"
                                        >
                                          Add to Cart
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  key={item._id}
                                  className="col-md-4 text-center"
                                >
                                  <div className="menu-wrap">
                                    <Link to={`/product/${item._id}`} className="menu-img img mb-4"
                                    style={{
                                      backgroundImage: `url(images/${item.image})`,
                                    }}>
                                    </Link>
                                    <div className="text">
                                      <h3>
                                        <Link to={`/product/${item._id}`}>
                                          {item.name}
                                        </Link>
                                      </h3>
                                      <p>{item.description}</p>
                                      <p className="price">
                                        <span>${item.price}</span>
                                      </p>
                                      <p>
                                        <a
                                          href="javascript:void(0)" onClick={() => addCartItem(item)}
                                          className="btn btn-primary btn-outline-primary"
                                        >
                                          Add to cart
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
