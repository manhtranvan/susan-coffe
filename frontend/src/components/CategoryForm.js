import React, {useState} from 'react'

const CategoryForm = ({category, onSave}) => {
    const [formData, setFormData] = useState({ ...category });

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

    console.log(formData)

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                    Tên
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="submit" className="btn btn-md full-width bg-dark text-light fs-md ft-medium">
                    &nbsp; Save category &nbsp;
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

export default CategoryForm