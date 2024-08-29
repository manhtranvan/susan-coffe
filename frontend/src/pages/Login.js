import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { login, register } from "../services/AuthService";

const Login = () => {
  // Hàm xử lý khi người dùng lưu thông tin sản phẩm (thêm mới hoặc cập nhật)
  const handleLogin = async (user) => {
    if (user.name && user.password) {
      try {
        const res = await login(user);
        console.log(res);
        alert("đăng nhập thành công");
        let jsonData = JSON.stringify(res.data);
        localStorage.setItem("login", jsonData);
        //navigate(`/`);
        window.location.href = "/";
      } catch (error) {
        console.log("Error deleting product: ", error);
        alert("Sai tên đăng nhập hoặc mật khẩu");
      }
    } else {
      alert("Vui lòng nhập hợp lệ");
    }
  };

  // Hàm xử lý khi người dùng lưu thông tin sản phẩm (thêm mới hoặc cập nhật)
  const handleRegister = async (user) => {
    if (user.password !== user.rePassword) {
      alert("Mật khẩu không trùng khớp");
      return console.log("Mật khẩu không trùng khớp");
    } else {
      if (user.name && user.password && user.fullname && user.email) {
        try {
          const res = await register(user);
          console.log(res);
          alert("Đăng ký thành công");
          window.location.href = "/";
        } catch (error) {
          console.log("Error deleting product: ", error);
          alert("Đăng ký không thành công");
        }
      } else {
        console.log(user);
        alert("Vui lòng nhập hợp lệ");
        return console.log("Không hợp lệ");
      }
    }
  };

  return (
    <section className="ftco-section contact-section">
      <div className="container mt-5">
        <div className="row block-9">
          <div className="col-md-6 contact-info ftco-animate fadeInUp ftco-animated">
            <div className="row">
              <div className="col-md-12 mb-4">
                <h2 className="h4">Login</h2>
                <LoginForm onLogin={handleLogin} />
              </div>
            </div>
          </div>

          <div className="col-md-6 ftco-animate fadeInUp ftco-animated">
            <h2 className="h4">Register</h2>
            <RegisterForm onRegister={handleRegister} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
