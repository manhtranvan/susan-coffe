import React, { useState } from "react";

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({});
  /*  
    Hàm xử lý thay đổi giá trị của input trong form
    handleChange: Hàm này xử lý sự kiện khi người dùng thay đổi giá trị của các input trong form. 
    Nó cập nhật formData dựa trên tên và giá trị của input được thay đổi.
    */
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    console.log(`${name} - ${value}`);
    // Cập nhật formData với giá trị mới khi input thay đổi
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  /*
    Hàm xử lý khi người dùng submit form
    handleSubmit: Hàm này được gọi khi người dùng submit form. 
    Nó ngăn chặn hành vi mặc định của trình duyệt bằng cách gọi e.preventDefault(), 
    sau đó gọi hàm onLogin với tham số formData để tiến hành login.
    */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm onLogin để lưu thông tin sản phẩm sau khi submit form
    onRegister(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded">
      <div className="row">
        <div className="form-group col-md-12">
          <label>Username</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            formcontrolname="name"
            placeholder="Vd: NguyenLePhuong"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-12">
          <label>Fullname</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="form-control"
            formcontrolname="fullname"
            placeholder="Vd: Nguyễn Lê Phương"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          formcontrolname="email"
          placeholder="name@email.com*"
        />
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label>Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            formcontrolname="password"
            placeholder="Password*"
          />
        </div>
        <div className="form-group col-md-6">
          <label>Repeat Password *</label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            className="form-control"
            formcontrolname="rePassword"
            placeholder="Confirm Password*"
          />
        </div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-md full-width bg-dark text-light fs-md ft-medium"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
