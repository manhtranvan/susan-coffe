import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProductByQuery } from "../services/ProductService";

const Products = () => {
  const [searchParams] = useSearchParams();

  const getQueryParam = (param) => {
    return searchParams.get(param);
  };

  const category = getQueryParam("category");
  const keywords = getQueryParam("keywords");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductByQuery({'category': category});
        // Lưu trữ danh sách sản phẩm từ response vào state
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    // Gọi hàm fetchProducts để lấy dữ liệu khi component được render
    fetchProducts();
  }, [category, keywords]);

  return (
    <React.Fragment>
      <section className="middle">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="sec_title position-relative text-center">
                <h2 className="off_title">Sản phẩm</h2>
                <h3 className="ft-bold pt-3">Sản phẩm</h3>
              </div>
            </div>
          </div>
          <div className="row align-items-center rows-products">
            {products.map((item) => (
              <div key={item._id} className="col-xl-3 col-lg-4 col-md-6 col-6">
                <div className="product_grid card b-0">
                  <div className="badge bg-success text-white position-absolute ft-regular ab-left text-upper">
                    Sale
                  </div>
                  <button className="btn btn_love position-absolute ab-right snackbar-wishlist">
                    <i className="far fa-heart"></i>
                  </button>
                  <div className="card-body p-0">
                    <div className="shop_thumb position-relative">
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={item.image}
                          className="card-img-top"
                          alt={item.name}
                        />
                      </Link>
                      <div className="product-hover-overlay bg-dark d-flex align-items-center justify-content-center">
                        <div className="edlio">
                          <a
                            data-toggle="modal"
                            data-target="#quickview"
                            className="text-white fs-sm ft-medium cursor-pointer"
                          >
                            <i className="fas fa-eye mr-1"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footers b-0 pt-3 px-2 bg-white d-flex align-items-start justify-content-center">
                    <div className="text-left">
                      <div className="text-center">
                        <h5 className="fw-bolder fs-md mb-0 lh-1 mb-1">
                          <a>{item.name}</a>
                        </h5>
                        <div className="elis_rty">
                          <span className="ft-bold fs-md text-dark">
                            ${item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Products;
