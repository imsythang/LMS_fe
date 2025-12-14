import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tổng quan</h1>
        <p className="text-slate-500">Chào mừng trở lại, Võ Quang Thắng</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase">
              Tổng số sách
            </p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">842</h3>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp size={14} /> +12 đầu sách mới
            </p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <BookOpen size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase">
              Đang mượn
            </p>
            <h3 className="text-3xl font-bold text-indigo-600 mt-2">145</h3>
            <p className="text-xs text-slate-400 mt-2">Khoảng 18% tổng kho</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase">
              Quá hạn
            </p>
            <h3 className="text-3xl font-bold text-red-500 mt-2">12</h3>
            <p className="text-xs text-red-500 mt-2 font-medium">
              Cần xử lý ngay
            </p>
          </div>
          <div className="p-3 bg-red-50 text-red-500 rounded-lg">
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase">
              Độc giả hoạt động
            </p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-2">1,204</h3>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-2">
              <TrendingUp size={14} /> +5% tháng này
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <Users size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section - Simulated */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg text-slate-800">
              Thống kê lượt mượn (2025)
            </h2>
            <select className="text-sm border-slate-200 border rounded-lg px-2 py-1 outline-none text-slate-600">
              <option>6 tháng gần nhất</option>
              <option>1 năm</option>
            </select>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {/* Simulated Bar Chart */}
            {[45, 60, 75, 50, 80, 95, 85, 70, 60, 90, 100, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-full bg-blue-100 hover:bg-blue-600 transition-all rounded-t-sm relative group"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h * 10}
                  </div>
                </div>
                <span className="text-xs text-slate-500">Th{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-800">Hoạt động gần đây</h2>
            <Link
              to="/librarian/notifications"
              className="text-xs text-blue-600 font-medium hover:underline"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              {
                user: 'Nguyễn Văn A',
                action: 'đã mượn',
                book: 'Clean Code',
                time: '2 phút trước',
                color: 'blue',
              },
              {
                user: 'Trần Thị B',
                action: 'đã trả',
                book: 'The Pragmatic Programmer',
                time: '15 phút trước',
                color: 'green',
              },
              {
                user: 'Lê Văn C',
                action: 'làm hỏng',
                book: 'Design Patterns',
                time: '1 giờ trước',
                color: 'red',
              },
              {
                user: 'Phạm Thị D',
                action: 'đã mượn',
                book: 'Introduction to Algorithms',
                time: '2 giờ trước',
                color: 'blue',
              },
              {
                user: 'Hệ thống',
                action: 'Cập nhật',
                book: '34 đầu sách mới',
                time: '5 giờ trước',
                color: 'slate',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 flex gap-3 hover:bg-slate-50 transition-colors"
              >
                <div
                  className={`w-2 h-2 mt-2 rounded-full bg-${item.color}-500 shrink-0`}
                ></div>
                <div>
                  <p className="text-sm text-slate-800">
                    <span className="font-medium">{item.user}</span>{' '}
                    {item.action}{' '}
                    <span className="font-medium italic">"{item.book}"</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Clock size={10} /> {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-100 bg-slate-50">
            <button className="w-full py-2 text-sm text-slate-600 font-medium hover:text-blue-600 flex items-center justify-center gap-1">
              Xem lịch sử hoạt động <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div>
        <h2 className="font-bold text-lg text-slate-800 mb-4">
          Truy cập nhanh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/librarian/circulation"
            className="p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="bg-white p-3 rounded-lg text-blue-600 shadow-sm">
              <BookOpen size={20} />
            </div>
            <span className="font-medium text-slate-700">Mượn sách mới</span>
          </Link>
          <Link
            to="/librarian/circulation"
            className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="bg-white p-3 rounded-lg text-indigo-600 shadow-sm">
              <TrendingUp size={20} />
            </div>
            <span className="font-medium text-slate-700">Trả sách</span>
          </Link>
          <Link
            to="/librarian/books"
            className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="bg-white p-3 rounded-lg text-emerald-600 shadow-sm">
              <BookOpen size={20} />
            </div>
            <span className="font-medium text-slate-700">Thêm đầu sách</span>
          </Link>
          <Link
            to="/librarian/requests"
            className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="bg-white p-3 rounded-lg text-orange-600 shadow-sm">
              <AlertTriangle size={20} />
            </div>
            <span className="font-medium text-slate-700">Xử lý yêu cầu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
