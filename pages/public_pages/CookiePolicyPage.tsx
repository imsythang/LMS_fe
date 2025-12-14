import { Cookie, Eye, Settings, Shield } from 'lucide-react';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Cookie size={48} />
            <h1 className="text-4xl md:text-5xl font-bold">
              Chính sách Cookie
            </h1>
          </div>
          <p className="text-xl text-blue-100">
            Thông tin về cách chúng tôi sử dụng cookie và công nghệ tương tự
          </p>
          <p className="text-sm text-blue-200 mt-2">
            Cập nhật lần cuối: 01/01/2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-600 leading-relaxed">
              SmartLibrary sử dụng cookie và các công nghệ tương tự để cải thiện
              trải nghiệm của bạn, phân tích cách bạn sử dụng trang web, và cung
              cấp nội dung phù hợp. Chính sách này giải thích cách chúng tôi sử
              dụng cookie và các lựa chọn của bạn.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                1. Cookie là gì?
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn
              khi bạn truy cập một trang web. Cookie giúp trang web ghi nhớ
              thông tin về chuyến thăm của bạn, như tùy chọn ngôn ngữ và các
              thiết lập khác, giúp bạn không phải nhập lại thông tin mỗi lần
              quay lại.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Các loại cookie chúng tôi sử dụng
            </h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Settings className="text-blue-600" size={20} />
                  2.1. Cookie cần thiết
                </h3>
                <p className="mb-2">
                  Những cookie này cần thiết để trang web hoạt động đúng:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Cookie phiên đăng nhập để duy trì trạng thái đăng nhập
                  </li>
                  <li>Cookie bảo mật để bảo vệ chống tấn công</li>
                  <li>Cookie tùy chọn để lưu các thiết lập của bạn</li>
                </ul>
                <p className="mt-2 text-sm text-gray-500">
                  Không thể tắt các cookie này vì chúng cần thiết cho hoạt động
                  của trang web.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Eye className="text-purple-600" size={20} />
                  2.2. Cookie phân tích
                </h3>
                <p className="mb-2">
                  Giúp chúng tôi hiểu cách người dùng tương tác với trang web:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Số lượt truy cập và trang được xem</li>
                  <li>Thời gian dành cho trang web</li>
                  <li>Lỗi và vấn đề kỹ thuật</li>
                  <li>Nguồn truy cập (từ đâu người dùng đến)</li>
                </ul>
                <p className="mt-2 text-sm text-gray-500">
                  Dữ liệu được thu thập dưới dạng ẩn danh và không nhận dạng cá
                  nhân.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="text-green-600" size={20} />
                  2.3. Cookie chức năng
                </h3>
                <p className="mb-2">
                  Cho phép trang web cung cấp các tính năng nâng cao:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ghi nhớ tùy chọn tìm kiếm</li>
                  <li>Lưu danh sách yêu thích tạm thời</li>
                  <li>Ghi nhớ cài đặt hiển thị (grid/list view)</li>
                  <li>Lưu giỏ hàng hoặc danh sách đặt trước</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Cookie của bên thứ ba
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                Một số cookie được đặt bởi các dịch vụ bên thứ ba xuất hiện trên
                trang web của chúng tôi:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Google Analytics:</strong> Giúp chúng tôi phân tích
                  lưu lượng truy cập và cải thiện trang web
                </li>
                <li>
                  <strong>Font Awesome / Icons:</strong> Để hiển thị biểu tượng
                  và icon
                </li>
                <li>
                  <strong>CDN Services:</strong> Để tải nội dung nhanh hơn
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                Các dịch vụ này có thể đặt cookie riêng của họ. Chúng tôi không
                kiểm soát các cookie này.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Quản lý cookie
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                Bạn có thể kiểm soát và quản lý cookie theo nhiều cách:
              </p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  4.1. Cài đặt trình duyệt
                </h3>
                <p className="mb-2">Hầu hết trình duyệt cho phép bạn:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Xem cookie đã được lưu trữ</li>
                  <li>Xóa cookie cụ thể hoặc tất cả cookie</li>
                  <li>Chặn cookie từ các trang web cụ thể</li>
                  <li>Chặn tất cả cookie</li>
                  <li>Xóa tất cả cookie khi đóng trình duyệt</li>
                </ul>
                <p className="mt-2 text-sm text-gray-500">
                  Lưu ý: Chặn cookie có thể ảnh hưởng đến chức năng của trang
                  web.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  4.2. Cài đặt trên trang web
                </h3>
                <p>
                  Khi lần đầu truy cập, bạn sẽ thấy thông báo về cookie. Bạn có
                  thể chấp nhận hoặc tùy chỉnh các loại cookie bạn muốn cho
                  phép.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Cookie chúng tôi sử dụng cụ thể
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                      Tên Cookie
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                      Mục đích
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                      Thời hạn
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-mono text-xs">
                      session_id
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Duy trì phiên đăng nhập
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Phiên (khi đóng trình duyệt)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-mono text-xs">
                      user_preferences
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Lưu tùy chọn người dùng
                    </td>
                    <td className="border border-gray-200 px-4 py-2">1 năm</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-mono text-xs">
                      search_history
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Lưu lịch sử tìm kiếm
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      30 ngày
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-mono text-xs">
                      cookie_consent
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Ghi nhớ lựa chọn cookie của bạn
                    </td>
                    <td className="border border-gray-200 px-4 py-2">1 năm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Công nghệ tương tự
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                Ngoài cookie, chúng tôi cũng sử dụng các công nghệ tương tự:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Local Storage:</strong> Lưu trữ dữ liệu lớn hơn trên
                  thiết bị của bạn (như danh sách yêu thích)
                </li>
                <li>
                  <strong>Session Storage:</strong> Lưu trữ tạm thời trong phiên
                  làm việc
                </li>
                <li>
                  <strong>Web Beacons:</strong> Theo dõi việc mở email (nếu bạn
                  đăng ký nhận email)
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Thay đổi chính sách
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Chúng tôi có thể cập nhật chính sách cookie này theo thời gian để
              phản ánh các thay đổi trong cách chúng tôi sử dụng cookie hoặc vì
              lý do pháp lý, vận hành hoặc quy định. Vui lòng xem lại trang này
              định kỳ để cập nhật.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Liên hệ
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nếu bạn có câu hỏi về chính sách cookie, vui lòng liên hệ:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>
                Email:{' '}
                <a
                  href="mailto:library@hcmut.edu.vn"
                  className="text-blue-600 hover:underline"
                >
                  library@hcmut.edu.vn
                </a>
              </li>
              <li>
                Điện thoại:{' '}
                <a
                  href="tel:+84886765392"
                  className="text-blue-600 hover:underline"
                >
                  +84 88 676 5392
                </a>
              </li>
              <li>
                Địa chỉ: Đại học Bách Khoa TPHCM, 268 Lý Thường Kiệt, Phường 14,
                Quận 10, TPHCM
              </li>
            </ul>
          </section>

          {/* Agreement */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <p className="text-gray-700 leading-relaxed">
              <strong>
                Bằng việc tiếp tục sử dụng SmartLibrary, bạn đồng ý với việc sử
                dụng cookie như mô tả trong chính sách này.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
