import React from 'react';
import { Save, Bell, Shield, User, Database, Building } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Cài đặt hệ thống</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
           <nav className="space-y-1">
             <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium">
               <Building size={18} /> Thông tin thư viện
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
               <Shield size={18} /> Quy định mượn trả
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
               <Bell size={18} /> Thông báo & Email
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
               <User size={18} /> Tài khoản & Phân quyền
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
               <Database size={18} /> Sao lưu dữ liệu
             </button>
           </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
           {/* Library Info Card */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
               <h3 className="font-semibold text-slate-800">Thông tin chung</h3>
               <p className="text-xs text-slate-500">Các thông tin cơ bản sẽ hiển thị trên trang chủ và phiếu in.</p>
             </div>
             <div className="p-6 space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Tên thư viện</label>
                   <input type="text" defaultValue="SmartLibrary - Đại học Quốc Gia" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Mã thư viện</label>
                   <input type="text" defaultValue="LIB-VNU-01" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-slate-50" readOnly />
                 </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ</label>
                  <input type="text" defaultValue="144 Xuân Thủy, Cầu Giấy, Hà Nội" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Email liên hệ</label>
                   <input type="email" defaultValue="library@vnu.edu.vn" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại</label>
                   <input type="text" defaultValue="+84 24 3754 7777" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                 </div>
               </div>
             </div>
             <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
               <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                 <Save size={16} /> Lưu thay đổi
               </button>
             </div>
           </div>

           {/* Rules Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
               <h3 className="font-semibold text-slate-800">Cấu hình mặc định</h3>
               <p className="text-xs text-slate-500">Thiết lập các giá trị mặc định cho hệ thống.</p>
             </div>
             <div className="p-6 space-y-4">
               <div className="flex items-center justify-between">
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Thời hạn mượn mặc định (ngày)</label>
                    <p className="text-xs text-slate-500">Số ngày tối đa sinh viên được phép giữ sách.</p>
                 </div>
                 <input type="number" defaultValue="14" className="w-24 px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-center" />
               </div>
               <div className="border-t border-slate-100 my-4"></div>
                <div className="flex items-center justify-between">
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Số sách tối đa được mượn</label>
                    <p className="text-xs text-slate-500">Số lượng tài liệu tối đa một độc giả có thể mượn cùng lúc.</p>
                 </div>
                 <input type="number" defaultValue="5" className="w-24 px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-center" />
               </div>
               <div className="border-t border-slate-100 my-4"></div>
                <div className="flex items-center justify-between">
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Phí phạt trễ hạn (VNĐ/ngày)</label>
                    <p className="text-xs text-slate-500">Số tiền phạt tính cho mỗi ngày trễ hạn trên mỗi đầu sách.</p>
                 </div>
                 <input type="number" defaultValue="5000" className="w-32 px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-right" />
               </div>
             </div>
              <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
               <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                 <Save size={16} /> Lưu cấu hình
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
