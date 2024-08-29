import React from 'react'

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <table className="table">
            <thead className="thead-primary">
                <tr className="text-center">
                    <th>Category Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => {
                    return (
                        <tr key={category._id} className="text-center">
                            <td className="product-name">
                                <h3>{category.name}</h3>
                            </td>
                            <td className="total">
                                <a href="javascript:void(0)" onClick={() => onEdit(category)}>
                                    <span className="icon-edit" />
                                </a> &nbsp;
                                <a href="javascript:void(0)" onClick={() => onDelete(category._id)}>
                                    <span className="icon-close" />
                                </a>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
  )
}

export default CategoryTable