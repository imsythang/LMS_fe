import { CheckCircle, Clock } from 'lucide-react';
import { Button } from '../../components/ui';

const ReservationItem = ({
  title,
  author,
  date,
  location,
  position,
  status,
  expiry,
  image,
}: any) => (
  <div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow">
    <div className="w-full md:w-16 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
      <img src={image} alt="Book" className="w-full h-full object-cover" />
    </div>
    <div className="flex-grow text-center md:text-left">
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500 mb-2">{author}</p>
      <div className="text-xs text-gray-500 grid grid-cols-2 gap-x-4 gap-y-1">
        <span>
          Ngày đặt: <strong>{date}</strong>
        </span>
        <span>
          Chi nhánh: <strong>{location}</strong>
        </span>
        {position && (
          <span>
            Vị trí hàng chờ: <strong>{position}</strong>
          </span>
        )}
        {expiry && (
          <span className="text-green-600">
            Hạn nhận: <strong>{expiry}</strong>
          </span>
        )}
      </div>
    </div>
    <div className="flex flex-col items-center md:items-end gap-2 min-w-[140px]">
      {status === 'waiting' && (
        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
          <Clock size={12} className="mr-1" /> Đang chờ
        </span>
      )}
      {status === 'ready' && (
        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
          <CheckCircle size={12} className="mr-1" /> Sẵn sàng nhận
        </span>
      )}

      {status === 'ready' ? (
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white w-full"
        >
          Nhận sách
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 w-full"
        >
          Hủy đặt
        </Button>
      )}
    </div>
  </div>
);

const ReservationsPage = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Danh sách đặt trước
          </h1>
          <p className="text-gray-500 text-sm">
            Theo dõi trạng thái sách bạn đã đặt
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-gray-500 text-sm">Tổng đặt trước</span>
          <p className="text-3xl font-bold text-gray-900">5</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-gray-500 text-sm">Đang chờ</span>
          <p className="text-3xl font-bold text-yellow-600">3</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-gray-500 text-sm">Sẵn sàng nhận</span>
          <p className="text-3xl font-bold text-green-600">2</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md"
          />
        </div>
        <Button variant="outline" size="sm">
          Lọc
        </Button>
      </div>

      <div className="space-y-4">
        <ReservationItem
          title="Machine Learning cơ bản"
          author="Nguyễn Văn A"
          date="15/12/2025"
          location="Thư viện cơ sở 2"
          position="2 / 5"
          status="waiting"
          image="public/avatar/Avatar.JPG"
        />
        <ReservationItem
          title="Python cho người mới bắt đầu"
          author="Trần Thị B"
          date="10/12/2025"
          location="Thư viện cơ sở B"
          expiry="28/12/2025"
          status="ready"
          image="public/avatar/Avatar.JPG"
        />
        <ReservationItem
          title="Data Science thực chiến"
          author="Lê Văn C"
          date="18/12/2025"
          location="Thư viện cơ sở A"
          position="1 / 3"
          status="waiting"
          image="public/avatar/Avatar.JPG"
        />
        <ReservationItem
          title="Trí tuệ nhân tạo ứng dụng"
          author="Phạm Thị D"
          date="12/12/2025"
          location="Thư viện cơ sở B"
          expiry="26/12/2025"
          status="ready"
          image="public/avatar/Avatar.JPG"
        />
        <ReservationItem
          title="Deep Learning từ A-Z"
          author="Hoàng Văn E"
          date="20/12/2025"
          location="Thư viện cơ sở A"
          position="3 / 7"
          status="waiting"
          image="public/avatar/Avatar.JPG"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <h4 className="font-bold flex items-center mb-1">
          <CheckCircle size={16} className="mr-2" /> Lưu ý về đặt trước
        </h4>
        <ul className="list-disc list-inside space-y-1 ml-1 text-blue-700">
          <li>
            Khi sách sẵn sàng, bạn có <strong>7 ngày</strong> để đến nhận tại
            chi nhánh đã chọn.
          </li>
          <li>Hệ thống sẽ gửi email thông báo khi sách của bạn đã sẵn sàng.</li>
          <li>
            Bạn có thể đặt trước tối đa <strong>10 cuốn sách</strong> cùng lúc.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReservationsPage;
