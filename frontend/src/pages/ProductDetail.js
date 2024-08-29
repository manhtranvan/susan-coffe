import React, { useEffect, useState } from "react";
import { getProduct, getProductByQuery } from "../services/ProductService";
import { Link, useParams } from "react-router-dom";

export const ProductDetail = () => {
  const { id } = useParams();
  /*
  Với useState(), chúng ta có thể truyền initial state (state khởi tạo) làm tham số, ở đây là mảng []. 
  Hàm useState() sẽ trả về một mảng với 2 phẩn tử, đó là [characterChoiceNumbers, setCharacterChoiceNumbers]. 
  Phần tử đầu tiên là state hiện tại, phần tử thứ 2 là hàm set state cho state này, tương tự với hàm setState()
  */
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState(null);

  /*
  useEffect là 1 hook trong react giúp component của bạn liên lạc hiệu quả với các hệ thống bên ngoài React
  (ví dụ gọi API đến phần backend, tương tác với ứng dụng bên thứ ba…) .
  */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProduct = await getProduct(id);
        // Lưu trữ danh sách sản phẩm từ response vào state
        setProduct(fetchedProduct);

        const fetchedRelatedProduct = await getProductByQuery({
          category: fetchedProduct.category,
        });
        // Lưu trữ danh sách sản phẩm từ response vào state
        setRelatedProduct(fetchedRelatedProduct);

      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    // Gọi hàm fetchProducts để lấy dữ liệu khi component được render
    fetchProducts();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 ftco-animate fadeInUp ftco-animated">
              <a href={`/images/${product.image}`} className="image-popup">
                <img
                  src={`/images/${product.image}`}
                  className="img-fluid"
                  alt="Colorlib Template"
                />
              </a>
            </div>
            <div className="col-lg-6 product-details pl-md-5 ftco-animate fadeInUp ftco-animated">
              <h3>{product.name}</h3>
              <p className="price">
                <span>${product.price}</span>
              </p>
              <p>{product.desc}</p>
              <p>
                On her way she met a copy. The copy warned the Little Blind
                Text, that where it came from it would have been rewritten a
                thousand times and everything that was left from its origin
                would be the word "and" and the Little Blind Text should turn
                around and return to its own, safe country. But nothing the copy
                said could convince her and so it didn’t take long until a few
                insidious Copy Writers ambushed her, made her drunk with Longe
                and Parole and dragged her into their agency, where they abused
                her for their.
              </p>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group d-flex">
                    <div className="select-wrap">
                      <div className="icon">
                        <span className="ion-ios-arrow-down" />
                      </div>
                      <select name="" id="" className="form-control">
                        <option value="">Small</option>
                        <option value="">Medium</option>
                        <option value="">Large</option>
                        <option value="">Extra Large</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-100" />
                <div className="input-group col-md-6 d-flex mb-3">
                  <span className="input-group-btn mr-2">
                    <button
                      type="button"
                      className="quantity-left-minus btn"
                      data-type="minus"
                      data-field=""
                    >
                      <i className="icon-minus" />
                    </button>
                  </span>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    className="form-control input-number"
                    defaultValue={1}
                    min={1}
                    max={100}
                  />
                  <span className="input-group-btn ml-2">
                    <button
                      type="button"
                      className="quantity-right-plus btn"
                      data-type="plus"
                      data-field=""
                    >
                      <i className="icon-plus" />
                    </button>
                  </span>
                </div>
              </div>
              <p>
                <a href="cart.html" className="btn btn-primary py-3 px-5">
                  Add to Cart
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section ftco-animate fadeInUp ftco-animated text-center">
              <span className="subheading">Discover</span>
              <h2 className="mb-4">Related products</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
            </div>
          </div>
          <div className="row">
            {relatedProduct && relatedProduct.map((item, index) => (
              <div className="col-md-3">
                <div className="menu-entry">
                  <a
                    href="#"
                    className="img"
                    style={{
                      backgroundImage: `url(/images/${item.image})`,
                    }}
                  />
                  <div className="text text-center pt-4">
                    <h3>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </h3>
                    <p>{item.desc}</p>
                    <p className="price">
                      <span>${item.price}</span>
                    </p>
                    <p>
                      <a
                        href="#"
                        className="btn btn-primary btn-outline-primary"
                      >
                        Add to Cart
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
