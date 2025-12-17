import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import React, { useState } from 'react';
const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string | React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="text-gray-400 flex-shrink-0" size={20} />
        ) : (
          <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-200 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Đăng ký và đăng nhập',
      items: [
        {
          q: 'Làm thế nào để đăng ký tài khoản?',
          a: 'Bạn có thể đăng ký tài khoản tại trang Đăng ký. Bạn cần cung cấp email hoặc mã sinh viên và tạo mật khẩu. Sau khi đăng ký, bạn sẽ nhận được email xác nhận.',
        },
        {
          q: 'Tôi quên mật khẩu, làm sao để lấy lại?',
          a: 'Tại trang Đăng nhập, nhấn vào liên kết "Quên mật khẩu?" và làm theo hướng dẫn. Bạn sẽ nhận được email hướng dẫn đặt lại mật khẩu.',
        },
        {
          q: 'Sự khác biệt giữa tài khoản sinh viên và thủ thư là gì?',
          a: 'Tài khoản sinh viên cho phép bạn mượn sách, đặt trước, xem lịch sử mượn. Tài khoản thủ thư (librarian) có quyền quản lý sách, xử lý mượn trả, và quản lý hệ thống.',
        },
      ],
    },
    {
      category: 'Tìm kiếm và mượn sách',
      items: [
        {
          q: 'Làm thế nào để tìm sách?',
          a: 'Bạn có thể tìm sách tại trang Tìm kiếm bằng cách nhập tên sách, tác giả, hoặc từ khóa. Bạn cũng có thể sử dụng tìm kiếm thông minh với AI bằng cách mô tả nhu cầu của mình bằng ngôn ngữ tự nhiên.',
        },
        {
          q: 'Tôi có thể mượn bao nhiêu cuốn sách cùng lúc?',
          a: 'Mỗi sinh viên có thể mượn tối đa 5 cuốn sách cùng lúc. Thời gian mượn mặc định là 30 ngày, có thể gia hạn thêm 15 ngày nếu không có người khác đặt trước.',
        },
        {
          q: 'Làm sao để biết sách có sẵn để mượn không?',
          a: 'Tại trang chi tiết sách, bạn sẽ thấy số lượng bản có sẵn. Nếu hiển thị "Có sẵn", bạn có thể mượn ngay. Nếu hiển thị "Đang được mượn", bạn có thể đặt trước.',
        },
        {
          q: 'Tôi có thể gia hạn thời gian mượn sách không?',
          a: 'Có, bạn có thể gia hạn tại trang "Sách đang mượn". Bạn có thể gia hạn tối đa 2 lần, mỗi lần 15 ngày, nếu sách chưa quá hạn và không có người khác đặt trước.',
        },
      ],
    },
    {
      category: 'Đặt trước và thông báo',
      items: [
        {
          q: 'Làm thế nào để đặt trước sách?',
          a: 'Khi sách đang được mượn, bạn sẽ thấy nút "Đặt trước". Nhấn vào nút này, chọn địa điểm nhận sách, và xác nhận. Bạn sẽ nhận thông báo khi sách có sẵn.',
        },
        {
          q: 'Tôi có bao nhiêu thời gian để nhận sách sau khi đặt trước?',
          a: 'Sau khi nhận thông báo sách có sẵn, bạn có 3 ngày để đến thư viện nhận sách. Nếu không đến nhận trong thời hạn, đặt trước sẽ tự động bị hủy.',
        },
        {
          q: 'Làm sao để nhận thông báo về sách?',
          a: 'Hệ thống sẽ tự động gửi thông báo qua email và hiển thị trong trang "Thông báo" của bạn. Bạn có thể bật/tắt thông báo trong phần Cài đặt.',
        },
      ],
    },
    {
      category: 'Phí phạt và quy định',
      items: [
        {
          q: 'Phí phạt khi trả sách quá hạn là bao nhiêu?',
          a: 'Phí phạt là 5,000 VND/ngày cho mỗi cuốn sách quá hạn. Phí phạt được tính từ ngày hết hạn đến ngày trả sách thực tế.',
        },
        {
          q: 'Làm thế nào để thanh toán phí phạt?',
          a: 'Bạn có thể thanh toán phí phạt tại quầy thư viện khi trả sách. Bạn cũng có thể xem chi tiết phí phạt tại trang "Phí phạt" trong tài khoản của mình.',
        },
        {
          q: 'Điều gì xảy ra nếu tôi làm mất hoặc làm hỏng sách?',
          a: 'Nếu làm mất hoặc làm hỏng sách, bạn cần báo cáo ngay với thư viện. Bạn sẽ phải bồi thường theo giá trị sách hoặc mua sách mới để thay thế.',
        },
        {
          q: 'Tôi có thể mượn sách trong bao lâu?',
          a: 'Thời gian mượn mặc định là 30 ngày. Bạn có thể gia hạn thêm 15 ngày, tối đa 2 lần, tổng cộng tối đa 60 ngày.',
        },
      ],
    },
    {
      category: 'Tài liệu số và ebook',
      items: [
        {
          q: 'Làm thế nào để truy cập ebook?',
          a: 'Tại trang chi tiết sách, nếu có phiên bản ebook, bạn sẽ thấy nút "Đọc online" hoặc "Tải về". Nhấn vào để đọc trực tuyến hoặc tải về thiết bị của bạn.',
        },
        {
          q: 'Tôi có thể tải bao nhiêu ebook?',
          a: 'Không có giới hạn số lượng ebook bạn có thể tải về. Tuy nhiên, một số ebook có thể có giới hạn thời gian truy cập.',
        },
        {
          q: 'Ebook có miễn phí không?',
          a: 'Tất cả ebook trong thư viện số đều miễn phí cho sinh viên đã đăng ký tài khoản.',
        },
      ],
    },
    {
      category: 'Khác',
      items: [
        {
          q: 'Làm thế nào để liên hệ với thư viện?',
          a: 'Bạn có thể liên hệ qua trang Liên hệ, gọi điện đến số +84 88 676 5392, hoặc gửi email đến thang.hokhmtk22@hcmut.edu.vn. Thư viện mở cửa từ 8:00 - 20:00 các ngày trong tuần.',
        },
        {
          q: 'Tôi có thể đề xuất sách mới không?',
          a: 'Có, bạn có thể đề xuất sách mới tại trang "Yêu cầu" (nếu bạn là thủ thư) hoặc liên hệ trực tiếp với thư viện.',
        },
        {
          q: 'Hệ thống có hỗ trợ tìm kiếm bằng tiếng Anh không?',
          a: 'Có, hệ thống hỗ trợ tìm kiếm bằng cả tiếng Việt và tiếng Anh. Bạn có thể nhập từ khóa bằng bất kỳ ngôn ngữ nào.',
        },
      ],
    },
  ];

  const filteredFAQs = faqs
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (typeof item.a === 'string' &&
            item.a.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <HelpCircle size={48} className="mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Câu hỏi thường gặp
            </h1>
            <p className="text-xl text-blue-100">
              Tìm câu trả lời cho những thắc mắc phổ biến về SmartLibrary
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Không tìm thấy câu hỏi nào phù hợp với từ khóa của bạn.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-600 hover:underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFAQs.map((category, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <React.Fragment key={itemIdx}>
                      <FAQItem question={item.q} answer={item.a} />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Vẫn chưa tìm thấy câu trả lời?
          </h3>
          <p className="text-gray-600 mb-6">
            Liên hệ với chúng tôi để được hỗ trợ trực tiếp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+84886765392"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Gọi ngay: +84 88 676 5392
            </a>
            <a
              href="/publicpage/contact"
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Gửi tin nhắn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
