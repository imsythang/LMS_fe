import { Bell, Edit2, Lock, Save } from 'lucide-react';
import { Button, Input } from '../../components/ui';

const ProfilePage = () => {
  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Thông tin cá nhân & Cài đặt
        </h1>
        <p className="text-gray-500 text-sm">
          Quản lý thông tin tài khoản và tùy chỉnh trải nghiệm
        </p>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Thông tin cơ bản</h3>
          <Button size="sm" variant="outline" className="text-xs h-8">
            <Edit2 size={12} className="mr-1" /> Chỉnh sửa
          </Button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Họ tên" defaultValue="Võ Quang Thắng" />
          <Input label="Email" defaultValue="lan.nguyen@hcmut.edu.vn" />
          <Input
            label="Mã SV / GV"
            defaultValue="2213214"
            disabled
            className="bg-gray-50"
          />
          <Input
            label="Khoa / Ngành"
            defaultValue="Khoa Công nghệ Thông tin"
            disabled
            className="bg-gray-50"
          />
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-gray-900">Cài đặt tài khoản</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center">
              <Lock size={16} className="mr-2" /> Đổi mật khẩu
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="password" placeholder="Mật khẩu hiện tại" />
              <Input type="password" placeholder="Mật khẩu mới" />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center">
              <Bell size={16} className="mr-2" /> Thông báo
            </h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Nhận email nhắc trả sách
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Nhận email khi sách trong wishlist có bản khả dụng
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* AI Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-gray-900">
            Cấu hình AI & sở thích đọc
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngành ưu tiên
              </label>
              <select className="block w-full border border-gray-300 rounded-md p-2 text-sm">
                <option>Công nghệ thông tin</option>
                <option>Khoa học máy tính</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mục tiêu
              </label>
              <select className="block w-full border border-gray-300 rounded-md p-2 text-sm">
                <option>Nghiên cứu</option>
                <option>Học môn</option>
                <option>Giải trí</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <h4 className="text-sm font-bold text-gray-900">
                Cá nhân hóa AI
              </h4>
              <p className="text-xs text-gray-500">
                Cho phép AI sử dụng lịch sử mượn để đưa ra gợi ý phù hợp hơn
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-blue-600 right-4 border-gray-300"
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer checked:bg-blue-600"
              ></label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="flex items-center px-6">
          <Save size={18} className="mr-2" /> Lưu thay đổi
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
