import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import { Badge, Button } from '../../components/ui';

// --- Current Loan Item ---
const LoanItem = ({
  title,
  author,
  borrowDate,
  dueDate,
  status,
  fine,
  image,
}: any) => (
  <div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow">
    <div className="w-full md:w-16 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0 shadow-sm">
      <img
        src={image || `https://picsum.photos/100/150?random=${Math.random()}`}
        alt="Book"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-grow text-center md:text-left">
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500 mb-2">{author}</p>
      <div className="text-xs text-gray-500 flex flex-col md:flex-row gap-2 justify-center md:justify-start">
        <span>
          Ngày mượn: <strong>{borrowDate}</strong>
        </span>
        <span className="hidden md:inline">•</span>
        <span>
          Hạn trả: <strong>{dueDate}</strong>
        </span>
      </div>
    </div>
    <div className="flex flex-col items-center md:items-end gap-2 min-w-[120px]">
      {status === 'active' && (
        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
          <Clock size={12} className="mr-1" /> Còn 8 ngày
        </span>
      )}
      {status === 'overdue' && (
        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
          <AlertTriangle size={12} className="mr-1" /> Quá hạn
        </span>
      )}
      {fine && (
        <span className="text-xs font-bold text-red-600">Phạt: {fine}đ</span>
      )}

      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Gia hạn
        </Button>
        {status === 'overdue' && (
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
            Trả ngay
          </Button>
        )}
      </div>
    </div>
  </div>
);

// --- History Table Row ---
const HistoryItem = ({
  title,
  author,
  borrowDate,
  returnDate,
  duration,
  fine,
  image,
}: any) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center">
        <img
          className="h-10 w-8 rounded object-cover mr-3 shadow-sm bg-gray-100"
          src={image}
          alt=""
        />
        <div>
          <div className="text-sm font-medium text-gray-900">{title}</div>
          <div className="text-xs text-gray-500">{author}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {borrowDate}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {returnDate}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {duration}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      {fine ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {fine}
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle size={12} className="mr-1" /> Không
        </span>
      )}
    </td>
  </tr>
);

const MyBooksPage = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sách đang mượn</h1>
          <p className="text-gray-500 text-sm">
            Quản lý các tài liệu bạn đang mượn và lịch sử mượn trả
          </p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'current'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Đang mượn (3)
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Lịch sử mượn
          </button>
        </div>
      </div>

      {activeTab === 'current' && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-600 rounded-xl p-5 text-white shadow-lg flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-blue-100 font-medium">
                  Sách đang mượn
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <BookOpen size={24} />
              </div>
            </div>
            <div className="bg-red-500 rounded-xl p-5 text-white shadow-lg flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-red-100 font-medium">Sách quá hạn</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <AlertCircle size={24} />
              </div>
            </div>
            <div className="bg-orange-500 rounded-xl p-5 text-white shadow-lg flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-orange-100 font-medium">
                  Sắp đến hạn
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Clock size={24} />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600/90">Lọc:</span>

              <Badge
                variant="secondary"
                className="
    cursor-pointer
    bg-blue-600
    !text-white
    hover:bg-blue-700
    transition-colors
    ring-1 ring-white/20
  "
              >
                Tất cả
              </Badge>

              <Badge
                variant="outline"
                className="cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                Chỉ quá hạn
              </Badge>
            </div>

            <span className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700 hover:underline transition-colors">
              Xóa bộ lọc
            </span>
          </div>

          {/* List */}
          <div className="space-y-4">
            <LoanItem
              title="Machine Learning cơ bản"
              author="Nguyễn Thanh Tuấn"
              borrowDate="15/11/2024"
              dueDate="05/01/2025"
              status="active"
              image="public/avatar/Avatar.JPG"
            />
            <LoanItem
              title="Deep Learning with Python"
              author="François Chollet"
              borrowDate="10/11/2024"
              dueDate="20/12/2024"
              status="overdue"
              fine="15,000"
              image="public/avatar/Avatar.JPG"
            />
            <LoanItem
              title="Python for Data Analysis"
              author="Wes McKinney"
              borrowDate="20/11/2024"
              dueDate="10/01/2025"
              status="active"
              image="public/avatar/Avatar.JPG"
            />
          </div>
        </>
      )}

      {activeTab === 'history' && (
        <>
          <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
            <Calendar size={18} className="text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">
              Khoảng thời gian:
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
                3 tháng gần đây
              </button>
              <button className="px-3 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
                6 tháng gần đây
              </button>
              <button className="px-3 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
                12 tháng gần đây
              </button>
              <button className="px-3 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                Tất cả
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sách
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ngày mượn
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ngày trả
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thời gian mượn
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phí phạt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <HistoryItem
                    title="Introduction to Algorithms"
                    author="Thomas H. Cormen"
                    borrowDate="01/10/2024"
                    returnDate="25/10/2024"
                    duration="24 ngày"
                    image="https://m.media-amazon.com/images/I/61MhLhF7LzL._AC_UF1000,1000_QL80_.jpg"
                  />
                  <HistoryItem
                    title="Database System Concepts"
                    author="Abraham Silberschatz"
                    borrowDate="15/09/2024"
                    returnDate="18/10/2024"
                    duration="33 ngày"
                    fine="30,000 VND"
                    image="https://m.media-amazon.com/images/I/81+N4+nK6gL._AC_UF1000,1000_QL80_.jpg"
                  />
                  <HistoryItem
                    title="Software Engineering"
                    author="Ian Sommerville"
                    borrowDate="05/08/2024"
                    returnDate="28/08/2024"
                    duration="23 ngày"
                    image="https://m.media-amazon.com/images/I/71J19-p3B6L._AC_UF1000,1000_QL80_.jpg"
                  />
                  <HistoryItem
                    title="Computer Networks"
                    author="Andrew S. Tanenbaum"
                    borrowDate="10/07/2024"
                    returnDate="02/08/2024"
                    duration="23 ngày"
                    image="https://m.media-amazon.com/images/I/71f743sOPoL._AC_UF1000,1000_QL80_.jpg"
                  />
                  <HistoryItem
                    title="Operating System Concepts"
                    author="Abraham Silberschatz"
                    borrowDate="20/06/2024"
                    returnDate="15/07/2024"
                    duration="25 ngày"
                    image="https://m.media-amazon.com/images/I/61f5XjIRWHL._AC_UF1000,1000_QL80_.jpg"
                  />
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Hiển thị 1-5 trong tổng số 24 kết quả
              </span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" disabled>
                  &lt;
                </Button>
                <Button size="sm" className="bg-blue-600 text-white">
                  1
                </Button>
                <Button size="sm" variant="outline">
                  2
                </Button>
                <Button size="sm" variant="outline">
                  3
                </Button>
                <Button size="sm" variant="outline">
                  &gt;
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-full mb-2">
                <BookOpen size={20} />
              </div>
              <span className="text-2xl font-bold text-gray-900">24</span>
              <span className="text-xs text-gray-500">Tổng sách đã mượn</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center">
              <div className="p-2 bg-green-50 text-green-600 rounded-full mb-2">
                <CheckCircle size={20} />
              </div>
              <span className="text-2xl font-bold text-gray-900">22</span>
              <span className="text-xs text-gray-500">Trả đúng hạn</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center">
              <div className="p-2 bg-red-50 text-red-600 rounded-full mb-2">
                <AlertTriangle size={20} />
              </div>
              <span className="text-2xl font-bold text-gray-900">2</span>
              <span className="text-xs text-gray-500">Trả trễ</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-full mb-2">
                <span className="font-bold">₫</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">30K</span>
              <span className="text-xs text-gray-500">Tổng phí phạt</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyBooksPage;
