import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

/**
 * Axios Instance Configuration
 *
 * File này cấu hình base Axios instance với:
 * - BaseURL từ environment variable
 * - Request interceptor: Tự động thêm token vào header
 * - Response interceptor: Tự động trả về data và xử lý lỗi
 */

// Tạo Axios instance với cấu hình base
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * Tự động thêm Authorization token vào mỗi request nếu có
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("accessToken");

    // Nếu có token, thêm vào Authorization header
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request trong môi trường development
    if (import.meta.env.DEV) {
      console.log("🚀 Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    // Xử lý lỗi request
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * Tự động unwrap data và xử lý lỗi chung
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response trong môi trường development
    if (import.meta.env.DEV) {
      console.log("✅ Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    // Trả về trực tiếp phần data thay vì toàn bộ response
    // Component chỉ cần: const books = await api.get('/books')
    // Thay vì: const books = (await api.get('/books')).data
    return response.data;
  },
  (error: AxiosError) => {
    // Xử lý lỗi response
    if (error.response) {
      // Server trả về response với status code lỗi (4xx, 5xx)
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Token hết hạn hoặc không hợp lệ
          console.error("🔒 Unauthorized: Token hết hạn hoặc không hợp lệ");

          // Xóa token và redirect về login
          localStorage.removeItem("accessToken");

          // Có thể dispatch action hoặc redirect
          // window.location.href = '/login';
          break;

        case 403:
          // Forbidden - Không có quyền truy cập
          console.error("🚫 Forbidden: Không có quyền truy cập");
          break;

        case 404:
          // Not Found
          console.error("🔍 Not Found: Không tìm thấy tài nguyên");
          break;

        case 500:
          // Internal Server Error
          console.error("💥 Server Error: Lỗi server nội bộ");
          break;

        default:
          console.error(`❌ Error ${status}:`, data);
      }

      // Trả về error với message từ server hoặc message mặc định
      return Promise.reject({
        status,
        message: (data as any)?.message || "Đã có lỗi xảy ra",
        data,
      });
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error("📡 Network Error: Không kết nối được với server");
      return Promise.reject({
        message:
          "Không kết nối được với server. Vui lòng kiểm tra kết nối mạng.",
      });
    } else {
      // Lỗi khi setup request
      console.error("⚠️ Request Setup Error:", error.message);
      return Promise.reject({
        message: error.message || "Đã có lỗi xảy ra khi gửi request",
      });
    }
  }
);

export default axiosInstance;
