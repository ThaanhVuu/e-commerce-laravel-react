// Import React and useState hook for state management
// Nhập React và hook useState để quản lý state
import React, { useState } from "react";

// Import authentication service for user registration
// Nhập service xác thực để đăng ký người dùng
import { AuthService } from "../../services/AuthService";

// Import React Router hook for programmatic navigation
// Nhập hook React Router để điều hướng theo chương trình
import { useNavigate } from "react-router-dom";

// Import login layout component for consistent styling
// Nhập component layout đăng nhập để có style nhất quán
import LoginLayout from "../../layouts/LoginLayout/LoginLayout";

// Import utility to check existing authentication
// Nhập tiện ích để kiểm tra xác thực hiện có
import CheckCookieSignin from "../../utils/CheckCookieSignin";

/**
 * SignUp component - User registration page
 * Component SignUp - Trang đăng ký người dùng
 * @returns {JSX.Element} Sign-up form with registration logic
 */
export default function SignUp() {
    // State to control loading state during registration
    // State để kiểm soát trạng thái loading trong quá trình đăng ký
    const [loading, setLoading] = useState(false);
    
    // State to store error messages
    // State để lưu trữ thông báo lỗi
    const [error, setError] = useState('');
    
    // Navigation function from React Router
    // Hàm điều hướng từ React Router
    const navigate = useNavigate();

    // Check if user is already authenticated and redirect if necessary
    // Kiểm tra xem người dùng đã được xác thực chưa và chuyển hướng nếu cần
    CheckCookieSignin();

    /**
     * Handle user registration form submission
     * Xử lý việc gửi form đăng ký người dùng
     * @param {Object} user - User registration data / Dữ liệu đăng ký người dùng
     */
    async function handleRegister(user) {
        // Set loading state and clear previous errors
        // Thiết lập trạng thái loading và xóa lỗi trước đó
        setLoading(true);
        setError('');

        try {
            // Attempt to register new user with provided credentials
            // Thử đăng ký người dùng mới với thông tin đăng nhập được cung cấp
            await AuthService.register(user.username, user.password);

            // Show success message if registration is successful
            // Hiển thị thông báo thành công nếu đăng ký thành công
            alert("Sign up successful! Please check verify mail.");

            // Redirect to home page after successful registration
            // Chuyển hướng đến trang chủ sau khi đăng ký thành công
            navigate("/");
        } catch (err) {
            // Log error for debugging purposes
            // Ghi log lỗi để debug
            console.error("Register failed:", err);

            // Set error message from server response or fallback message
            // Thiết lập thông báo lỗi từ phản hồi server hoặc thông báo mặc định
            setError(err.error || "Sign up failed");

            // Show error alert to user
            // Hiển thị cảnh báo lỗi cho người dùng
            alert(err.error || "Sign up failed");
        } finally {
            // Reset loading state regardless of outcome
            // Đặt lại trạng thái loading bất kể kết quả
            setLoading(false);
        }
    }

    return (
        // Render login layout with sign-up specific configuration
        // Render layout đăng nhập với cấu hình cụ thể cho đăng ký
        <LoginLayout
            title="Sign Up"
            handleOnSubmit={handleRegister}
            linkHref="/signin"
            submitText="Sign up"
            label="Sign in"
            flag={true}
            linkHref2="/forgetpassword"
            label2="Forget Password"
            error={error}      // Pass error to UI for display / Truyền lỗi cho UI hiển thị
            loading={loading}  // Pass loading state to disable button or show spinner / Truyền trạng thái loading để vô hiệu hóa nút hoặc hiển thị spinner
        />
    );
}
