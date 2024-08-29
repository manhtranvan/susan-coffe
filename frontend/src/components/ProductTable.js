import React from "react";

const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <table className="table">
            <thead className="thead-primary">
                <tr className="text-center">
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => {
                    return (
                        <tr key={product._id} className="text-center">
                            <td className="image-prod">
                                <div
                                    className="img"
                                    style={{
                                        backgroundImage: `url(images/${product.image})`,
                                    }}
                                />
                            </td>
                            <td className="product-name">
                                <h3>{product.name}</h3>
                            </td>
                            <td className="price">${product.price}</td>
                            <td className="total">
                                <a href="javascript:void(0)" onClick={() => onEdit(product)}>
                                    <span className="icon-edit" />
                                </a> &nbsp;
                                <a href="javascript:void(0)" onClick={() => onDelete(product._id)}>
                                    <span className="icon-close" />
                                </a>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ProductTable;
