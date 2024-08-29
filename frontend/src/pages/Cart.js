import React from "react";
import { useShoppingContext } from "../contexts/ShoppingContext";

const Cart = () => {
  const { cartItems, totalPrice, removeCartItem, delivery, discount } = useShoppingContext()
  return (
    <>
      <section className="ftco-section ftco-cart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ftco-animate fadeInUp ftco-animated">
              <div className="cart-list">
                <table className="table">
                  <thead className="thead-primary">
                    <tr className="text-center">
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  {cartItems.map(item => {
                        return (
                          <tr key={item._id} className="text-center">
                          <td className="product-remove">
                            <a href="javascript:void(0)" onClick={() => removeCartItem(item._id)}>
                              <span className="icon-close" />
                            </a>
                          </td>
                          <td className="image-prod">
                            <div
                              className="img"
                              style={{
                                backgroundImage: `url(images/${item.image})`,
                              }}
                            />
                          </td>
                          <td className="product-name">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                          </td>
                          <td className="price">${item.price}</td>
                          <td className="quantity">
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                name="quantity"
                                className="quantity form-control input-number"
                                defaultValue={item.qty}
                                min={1}
                                max={100}
                              />
                            </div>
                          </td>
                          <td className="total">${item.price * item.qty}</td>
                        </tr>
                        )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col col-lg-3 col-md-6 mt-5 cart-wrap ftco-animate fadeInUp ftco-animated">
              <div className="cart-total mb-3">
                <h3>Cart Totals</h3>
                <p className="d-flex">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </p>
                <p className="d-flex">
                  <span>Delivery</span>
                  <span>${delivery}</span>
                </p>
                <p className="d-flex">
                  <span>Discount</span>
                  <span>${discount}</span>
                </p>
                <hr />
                <p className="d-flex total-price">
                  <span>Total</span>
                  <span>${totalPrice - (delivery + discount)}</span>
                </p>
              </div>
              <p className="text-center">
                <a href="checkout.html" className="btn btn-primary py-3 px-4">
                  Proceed to Checkout
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
            <div className="col-md-3">
              <div className="menu-entry">
                <a
                  href="#"
                  className="img"
                  style={{ backgroundImage: "url(images/menu-1.jpg)" }}
                />
                <div className="text text-center pt-4">
                  <h3>
                    <a href="#">Coffee Capuccino</a>
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                  </p>
                  <p className="price">
                    <span>$5.90</span>
                  </p>
                  <p>
                    <a href="#" className="btn btn-primary btn-outline-primary">
                      Add to Cart
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="menu-entry">
                <a
                  href="#"
                  className="img"
                  style={{ backgroundImage: "url(images/menu-2.jpg)" }}
                />
                <div className="text text-center pt-4">
                  <h3>
                    <a href="#">Coffee Capuccino</a>
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                  </p>
                  <p className="price">
                    <span>$5.90</span>
                  </p>
                  <p>
                    <a href="#" className="btn btn-primary btn-outline-primary">
                      Add to Cart
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="menu-entry">
                <a
                  href="#"
                  className="img"
                  style={{ backgroundImage: "url(images/menu-3.jpg)" }}
                />
                <div className="text text-center pt-4">
                  <h3>
                    <a href="#">Coffee Capuccino</a>
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                  </p>
                  <p className="price">
                    <span>$5.90</span>
                  </p>
                  <p>
                    <a href="#" className="btn btn-primary btn-outline-primary">
                      Add to Cart
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="menu-entry">
                <a
                  href="#"
                  className="img"
                  style={{ backgroundImage: "url(images/menu-4.jpg)" }}
                />
                <div className="text text-center pt-4">
                  <h3>
                    <a href="#">Coffee Capuccino</a>
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                  </p>
                  <p className="price">
                    <span>$5.90</span>
                  </p>
                  <p>
                    <a href="#" className="btn btn-primary btn-outline-primary">
                      Add to Cart
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
