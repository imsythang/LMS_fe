import { AlertCircle, FileText } from 'lucide-react';
import { Button } from '../../components/ui';

const FineItem = ({ type, book, amount, date, status, action }: any) => (
  <div className="bg-white p-4 rounded-lg border border-gray-100 hover:bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-4 w-full md:w-auto">
      <div
        className={`p-3 rounded-full ${
          type === 'damaged'
            ? 'bg-red-100 text-red-600'
            : 'bg-orange-100 text-orange-600'
        }`}
      >
        <AlertCircle size={20} />
      </div>
      <div>
        <h4 className="font-bold text-gray-900">
          {type === 'damaged' ? 'Hỏng sách' : 'Trễ hạn'}
        </h4>
        <p className="text-sm text-blue-600 font-medium">{book}</p>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
    </div>
    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
      <span className="font-bold text-gray-900">{amount}</span>
      {status === 'unpaid' ? (
        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
          Chưa thanh toán
        </span>
      ) : (
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
          Đã thanh toán
        </span>
      )}
      {status === 'unpaid' ? (
        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
          Thanh toán
        </Button>
      ) : (
        <span className="text-xs text-gray-400">Đã xử lý</span>
      )}
    </div>
  </div>
);

const FinesPage = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Phí phạt</h1>
          <p className="text-gray-500 text-sm">
            Quản lý các khoản phí phạt của bạn
          </p>
        </div>
        <Button variant="outline" className="flex items-center">
          <AlertCircle size={16} className="mr-2" /> Hướng dẫn thanh toán
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Chưa thanh toán</p>
          <h3 className="text-3xl font-bold text-red-600">45,000 VND</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Đã thanh toán</p>
          <h3 className="text-3xl font-bold text-green-600">120,000 VND</h3>
        </div>
        <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg">
          <p className="text-blue-100 text-sm mb-1">Tổng cộng</p>
          <h3 className="text-3xl font-bold">165,000 VND</h3>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 md:flex-none">Thanh toán online</Button>
        <Button
          variant="outline"
          className="flex-1 md:flex-none flex items-center justify-center"
        >
          <FileText size={16} className="mr-2" /> Xuất báo cáo
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50">
          <h3 className="font-bold text-gray-900">Chi tiết phí phạt</h3>
          <div className="flex gap-2 w-full md:w-auto">
            <select className="text-sm border-gray-300 rounded-md p-2 bg-white">
              <option>Tất cả trạng thái</option>
            </select>
            <select className="text-sm border-gray-300 rounded-md p-2 bg-white">
              <option>Năm nay</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          <FineItem
            type="late"
            book="Machine Learning cơ bản"
            amount="25,000 VND"
            date="15/11/2024"
            status="unpaid"
          />
          <FineItem
            type="late"
            book="Python cho người mới bắt đầu"
            amount="20,000 VND"
            date="20/11/2024"
            status="unpaid"
          />
          <FineItem
            type="late"
            book="Cấu trúc dữ liệu và giải thuật"
            amount="40,000 VND"
            date="10/10/2024"
            status="paid"
          />
          <FineItem
            type="damaged"
            book="Lập trình Web với React"
            amount="80,000 VND"
            date="05/09/2024"
            status="paid"
          />
          <FineItem
            type="late"
            book="Kinh tế vi mô"
            amount="15,000 VND"
            date="25/08/2024"
            status="paid"
          />
        </div>
        <div className="p-4 bg-gray-50 flex justify-center">
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              &lt;
            </Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">
              &gt;
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <h4 className="font-bold text-blue-900 mb-2 flex items-center">
          <AlertCircle size={18} className="mr-2" /> Hướng dẫn thanh toán
        </h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></div>{' '}
            <strong>Thanh toán trực tiếp:</strong> Đến quầy thủ thư tại thư viện
            trong giờ hành chính (8:00 - 17:00)
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></div>{' '}
            <strong>Chuyển khoản:</strong> Chuyển vào TK: 1234567890 - Ngân hàng
            ABC - Chi nhánh XYZ (Ghi rõ: Mã SV + Họ tên)
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></div>{' '}
            <strong>Thanh toán online:</strong> Sử dụng nút "Thanh toán online"
            ở trên để thanh toán qua cổng thanh toán điện tử.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FinesPage;
