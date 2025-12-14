import {
  AlertTriangle,
  ArrowLeft,
  Copy,
  ExternalLink,
  Eye,
  Plus,
  QrCode,
  RotateCcw,
  Save,
  Star,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/librarian/books"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <div className="text-sm text-slate-500 flex items-center gap-2">
              Đầu sách <span className="text-slate-300">/</span> Machine
              Learning cơ bản
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Chi Tiết Đầu Sách
            </h1>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
            ... Thêm
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2">
            <X size={16} /> Hủy
          </button>
          <button className="px-4 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2">
            <Save size={18} /> Lưu Thay Đổi
          </button>
          <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Plus size={18} /> Lưu & Thêm đầu sách
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metadata Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-secondary px-6 py-3 border-b border-indigo-700">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Copy size={18} /> Publication Metadata
              </h2>
              <p className="text-indigo-200 text-xs">
                Manage and edit publication information
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Machine Learning cơ bản: Lý thuyết và thực hành với Python"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-900"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Main title of the publication
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tải lên trang bìa
                </label>
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                  <Upload size={16} /> Tải lên trang bìa
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Tác giả <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue="Nguyễn Văn A"
                      className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50"
                    />
                    <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue="Trần Thị B"
                      className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50"
                    />
                    <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <button className="text-secondary text-sm font-medium flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add Another Author
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    ISBN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="978-604-2-25789-4"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    ISSN
                  </label>
                  <input
                    type="text"
                    placeholder="Optional for periodicals"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Nhà xuất bản <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="Nhà xuất bản Đại học Quốc gia"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Năm xuất bản <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue="2023"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Ngôn ngữ
                  </label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                    <option>Tiếng Việt</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Tái bản
                  </label>
                  <input
                    type="text"
                    defaultValue="2nd Edition"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Số trang
                  </label>
                  <input
                    type="number"
                    defaultValue="456"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Đặc tả
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  defaultValue="Cuốn sách cung cấp kiến thức toàn diện về Machine Learning, từ các khái niệm cơ bản đến các thuật toán nâng cao. Nội dung được trình bày rõ ràng với nhiều ví dụ thực tế và bài tập thực hành sử dụng Python. Phù hợp cho sinh viên ngành Công nghệ thông tin, Khoa học dữ liệu và những người mới bắt đầu tìm hiểu về Machine Learning."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tags <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    'Machine Learning',
                    'Python',
                    'Artificial Intelligence',
                    'Data Science',
                    'Deep Learning',
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:opacity-80
                      ${
                        i === 4
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-indigo-50 text-indigo-600'
                      }`}
                    >
                      {tag} <X size={12} />
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Thêm tag mới"
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                  />
                  <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                    <Plus size={16} /> Thêm
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
              <div className="text-xs text-slate-500">
                Cập nhật lần cuối: Ngày 11 Tháng 12 Năm 2025 lúc 10:24
                <br />
                bởi Nguyễn Văn Thắng
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-slate-300 text-slate-600 font-medium rounded-lg hover:bg-slate-100 flex items-center gap-2">
                  <RotateCcw size={16} /> Reset
                </button>
                <button className="px-6 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                  <Save size={16} /> Lưu
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-200 overflow-hidden">
            <div className="bg-orange-600 px-6 py-3 border-b border-orange-700">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <AlertTriangle size={18} /> Thao Tác Nâng Cao
              </h2>
              <p className="text-orange-100 text-xs">
                Additional tools and operations
              </p>
            </div>
            <div className="p-6 space-y-6">
              {/* Merge */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Copy size={16} className="text-indigo-500" /> Sát Nhập Đầu
                  Sách Trùng Lặp
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Gộp ấn phẩm này với một bản trùng lặp khác. Tất cả bản sao
                  (items) và dữ liệu mô tả (metadata) sẽ được hợp nhất.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập ID ấn phẩm cần gộp..."
                    className="flex-1 px-3 py-2 border border-slate-200 rounded text-sm outline-none"
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1 hover:bg-indigo-700">
                    <Copy size={14} /> Merge
                  </button>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Sync */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <RotateCcw size={16} className="text-green-500" /> Sync
                  Metadata from External API
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Automatically update metadata from Google Books, Open Library,
                  or other sources using ISBN.
                </p>
                <div className="flex gap-2">
                  <div className="px-3 py-2 border border-slate-200 rounded text-sm bg-slate-50 text-slate-700 flex-1">
                    Google Books API
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1 hover:bg-green-600">
                    <Upload size={14} /> Sync Now
                  </button>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* QR */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <QrCode size={16} className="text-blue-500" /> Sinh mã QR Code
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Tạo mã QR liên kết đến ấn phẩm này để dễ dàng truy cập trên
                  thiết bị di động.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 hover:bg-blue-700">
                  <QrCode size={16} /> Sinh mã QR Code
                </button>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4">
                <h3 className="text-sm font-bold text-red-700 flex items-center gap-2 mb-1">
                  <AlertTriangle size={16} /> Vùng Nguy Hiểm
                </h3>
                <p className="text-xs text-red-600 mb-3">
                  Xóa vĩnh viễn ấn phẩm này và tất cả các mục liên quan. Hành
                  động này không thể hoàn tác.
                </p>
                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 hover:bg-red-700">
                  <Trash2 size={16} /> Xoá ấn phẩm
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg sticky top-6">
            <div className="p-4 border-b border-slate-700 flex items-center gap-2">
              <Eye className="text-white" size={20} />
              <span className="text-white font-semibold">Xem Trước</span>
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-48 h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-2xl mb-6 flex items-center justify-center text-white text-opacity-20">
                {/* Simulated Book Cover */}
                <div className="w-full h-full p-4 relative flex flex-col justify-between">
                  <div className="text-2xl font-bold text-white tracking-widest opacity-90 border-b-2 border-white pb-2 mb-2">
                    MACHINE
                    <br />
                    LEARNING
                  </div>
                  <div className="text-xs text-white opacity-70">
                    A Probabilistic Perspective
                  </div>
                  <div className="mt-auto text-xs font-mono opacity-50">
                    MIT PRESS
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                Machine Learning cơ bản
              </h3>
              <p className="text-slate-400 text-sm mb-3">
                Nguyễn Văn A, Trần Thị B • 2023
              </p>

              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={
                      s <= 4
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-slate-600'
                    }
                  />
                ))}
                <span className="text-slate-400 text-xs ml-2">
                  4.5 (127 đánh giá)
                </span>
              </div>

              <div className="w-full space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Available:</span>
                  <span className="text-green-400 font-medium">5 bản sao</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">On Loan:</span>
                  <span className="text-yellow-400 font-medium">3 bản sao</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
                  <span className="text-white">Total:</span>
                  <span className="text-white font-medium">10 bản sao</span>
                </div>
              </div>

              <button className="w-full py-3 bg-secondary hover:bg-indigo-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
                <ExternalLink size={18} /> Xem Trang Công Khai
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
