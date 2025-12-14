import React from 'react';
import { Bell, Info, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    { id: 1, title: 'Hệ thống bảo trì định kỳ', message: 'Hệ thống sẽ tạm ngừng hoạt động để bảo trì từ 00:00 đến 04:00 ngày 15/12/2025.', type: 'info', time: '2 giờ trước', read: false },
    { id: 2, title: 'Cảnh báo sách quá hạn', message: 'Có 5 độc giả mới vi phạm quy định quá hạn trên 30 ngày. Vui lòng kiểm tra.', type: 'warning', time: '5 giờ trước', read: false },
    { id: 3, title: 'Yêu cầu mua sách mới được duyệt', message: 'Đề xuất mua sách "Deep Learning Specialization" đã được Ban giám hiệu phê duyệt.', type: 'success', time: '1 ngày trước', read: true },
    { id: 4, title: 'Cập nhật phiên bản 2.1.0', message: 'Đã cập nhật tính năng mới: Quét mã QR Code cho độc giả.', type: 'info', time: '2 ngày trước', read: true },
    { id: 5, title: 'Lỗi đồng bộ dữ liệu', message: 'Không thể đồng bộ dữ liệu với máy chủ thư viện quốc gia lúc 10:00 AM.', type: 'error', time: '3 ngày trước', read: true },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="text-blue-500" size={24} />;
      case 'warning': return <AlertCircle className="text-orange-500" size={24} />;
      case 'success': return <CheckCircle className="text-green-500" size={24} />;
      case 'error': return <AlertCircle className="text-red-500" size={24} />;
      default: return <Bell className="text-slate-500" size={24} />;
    }
  };

  const getBgColor = (type: string) => {
     switch (type) {
      case 'info': return 'bg-blue-50';
      case 'warning': return 'bg-orange-50';
      case 'success': return 'bg-green-50';
      case 'error': return 'bg-red-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Thông báo</h1>
          <p className="text-slate-500">Cập nhật tin tức và cảnh báo từ hệ thống</p>
        </div>
        <button className="text-sm text-blue-600 font-medium hover:underline">Đánh dấu tất cả là đã đọc</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-4 rounded-xl border ${notif.read ? 'bg-white border-slate-200' : 'bg-blue-50/50 border-blue-100 shadow-sm'} flex gap-4 transition-all hover:shadow-md`}
          >
            <div className={`w-12 h-12 rounded-full ${getBgColor(notif.type)} flex items-center justify-center flex-shrink-0`}>
              {getIcon(notif.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`font-semibold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</h3>
                {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-600 mt-2"></span>}
              </div>
              <p className="text-slate-600 text-sm mt-1">{notif.message}</p>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <Clock size={12} /> {notif.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="px-6 py-2 border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-50 text-sm">
          Tải thêm thông báo cũ
        </button>
      </div>
    </div>
  );
};

export default Notifications;
