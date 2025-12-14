import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle,
  Clock,
  Info,
} from 'lucide-react';
import { Button } from '../../components/ui';

const NotificationItem = ({
  type,
  title,
  message,
  time,
  actionText,
  actionLink,
}: any) => {
  const styles: any = {
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      icon: AlertTriangle,
    },
    success: {
      bg: 'bg-white',
      border: 'border-gray-100', // Green border usually for specific emphasis, but design implies clean look
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      icon: CheckCircle,
    },
    info: {
      bg: 'bg-white',
      border: 'border-gray-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      icon: Info,
    },
    warning: {
      bg: 'bg-white',
      border: 'border-gray-100',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      icon: Bell,
    },
  };

  const style = styles[type] || styles.info;
  const Icon = style.icon;

  return (
    <div
      className={`p-6 rounded-xl border ${style.border} ${style.bg} flex flex-col sm:flex-row gap-4 hover:shadow-sm transition-shadow`}
    >
      <div
        className={`w-12 h-12 rounded-full ${style.iconBg} flex items-center justify-center flex-shrink-0`}
      >
        <Icon size={24} className={style.iconColor} />
      </div>
      <div className="flex-grow">
        <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">{message}</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center text-xs text-gray-500 font-medium">
            <Clock size={14} className="mr-1" /> {time}
          </span>
          {actionText && (
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline">
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Thông báo & Nhắc nhở
        </h1>
        <p className="text-gray-500 text-sm">Cập nhật quan trọng cho bạn</p>
      </div>

      <div className="space-y-4">
        <NotificationItem
          type="critical"
          title="Sách quá hạn cần trả ngay"
          message='"Introduction to Machine Learning" đã quá hạn 2 ngày. Vui lòng trả sách để tránh phí phạt tăng thêm.'
          time="2 giờ trước"
          actionText="Xem chi tiết"
        />

        <NotificationItem
          type="success"
          title="Sách đặt trước đã sẵn sàng"
          message='"Quantum Computing: An Applied Approach" đã sẵn sàng để nhận tại Thư viện Cơ sở 2. Hạn giữ: 18/01/2026'
          time="5 giờ trước"
          actionText="Xem vị trí"
        />

        <NotificationItem
          type="info"
          title="Sách mới phù hợp với bạn"
          message="Thư viện vừa nhập 3 cuốn sách mới về AI/ML mà bạn có thể quan tâm. Khám phá ngay!"
          time="1 ngày trước"
          actionText="Xem sách mới"
        />

        <NotificationItem
          type="warning"
          title="Nhắc nhở gia hạn"
          message="Bạn có 2 sách sắp đến hạn trong 3 ngày tới. Nhớ gia hạn nếu cần thêm thời gian."
          time="1 ngày trước"
          actionText="Gia hạn ngay"
        />
      </div>

      <div className="text-center pt-8">
        <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
          Xem tất cả thông báo <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default NotificationsPage;
