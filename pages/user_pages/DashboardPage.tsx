import {
  AlertTriangle,
  ArrowRight,
  Book as BookIcon,
  Calendar,
  Clock,
  DollarSign,
  Info,
  Mail,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/user_pages/ui/Button';
import {
  CURRENT_USER,
  DASHBOARD_STATS,
  DUE_BOOKS,
  RECOMMENDATIONS,
} from '../../constants';
import { Book, DashboardStat } from '../../types';

// 1. Stats Card Component
const StatCard = ({ stat }: { stat: DashboardStat }) => {
  const Icon = {
    Book: BookIcon,
    AlertTriangle: AlertTriangle,
    Clock: Clock,
    DollarSign: DollarSign,
  }[stat.iconName];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    orange: 'bg-amber-100 text-amber-600',
    purple: 'bg-purple-100 text-purple-600',
  }[stat.color];

  const badgeColor = {
    blue: 'bg-green-100 text-green-700',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  }[stat.color];

  // Specific layout adjustments based on screenshot
  // Screenshot shows: Icon (top left), Title (under icon), Big Value, Subtitle
  // Actually screenshot shows: Icon (Left), Title (Right top), Value (Right middle), Subtitle (Right bottom)?
  // Let's look closer at screenshot:
  // Layout:
  // [Icon Box] [Badge (top right)]
  // Title (small gray)
  // Value (Big)
  // Subtitle (Small)

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative">
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2.5 rounded-lg ${colorClasses}`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        {stat.badge && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              stat.color === 'blue'
                ? 'bg-green-100 text-green-700'
                : stat.color === 'red'
                ? 'bg-red-50 text-red-600'
                : stat.color === 'orange'
                ? 'bg-amber-50 text-amber-600'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {stat.badge}
          </span>
        )}
      </div>

      <div className="mt-2">
        <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
            {stat.value}
          </h3>
          {stat.unit && (
            <span className="text-sm text-slate-400 font-medium">
              {stat.unit}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1">{stat.subtitle}</p>
      </div>
    </div>
  );
};

// 2. Due Book List Item
const BookListItem = ({ book }: { book: Book }) => {
  const isOverdue = book.loanStatus === 'overdue';
  const isWarning = book.loanStatus === 'warning';

  let statusBadge;
  let statusColor;

  if (isOverdue) {
    statusBadge = `Quá hạn ${Math.abs(book.daysLeft || 0)} ngày`;
    statusColor = 'bg-red-100 text-red-600';
  } else if (isWarning) {
    statusBadge = `Còn ${book.daysLeft} ngày`;
    statusColor = 'bg-amber-100 text-amber-600';
  } else {
    statusBadge = `Còn ${book.daysLeft} ngày`;
    statusColor = 'bg-emerald-100 text-emerald-600';
  }

  return (
    <div className="flex flex-col sm:flex-row items-center p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all group">
      {/* Image */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-12 h-16 object-cover rounded shadow-sm"
        />
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0 flex flex-col justify-center py-1">
        <h4 className="font-bold text-slate-900 text-sm truncate">
          {book.title}
        </h4>
        <p className="text-xs text-slate-500 mb-1">{book.author}</p>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar size={10} />
            <span>Mượn: {book.borrowDate}</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="font-mono">{book.code}</span>
        </div>
      </div>

      {/* Action / Status */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto mt-3 sm:mt-0 justify-between sm:justify-center">
        <div className="text-right flex flex-col items-end">
          <div
            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold mb-1 ${statusColor}`}
          >
            {isOverdue && <AlertTriangle size={10} className="mr-1" />}
            {statusBadge}
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            Hạn trả:{' '}
            <span className="font-bold text-slate-700">{book.dueDate}</span>
          </p>
        </div>

        <div className="flex gap-2 mt-1">
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] px-3 py-1 h-7 rounded"
          >
            Gia hạn
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-slate-500 border-slate-200 text-[11px] px-3 py-1 h-7 rounded hover:bg-slate-50"
          >
            Chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

// 3. Recommendation Card
const RecommendationCard = ({ book }: { book: Book }) => {
  const available = (book.availableCopies || 0) > 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group w-64 flex-shrink-0 flex flex-col">
      <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded text-slate-800 shadow-sm ${
              available
                ? 'bg-[#C5F3D0] text-emerald-800'
                : 'bg-[#FECACA] text-red-800'
            }`}
          >
            {available
              ? `${book.availableCopies} bản khả dụng`
              : 'Đang mượn hết'}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-1 h-10">
          {book.title}
        </h4>
        <p className="text-xs text-slate-500 mb-3 truncate">{book.author}</p>

        <div className="flex gap-1 mb-4 flex-wrap">
          <span className="text-[10px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
            {book.category}
          </span>
          {book.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium bg-purple-50 text-purple-600 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Button
            size="sm"
            fullWidth
            className={`text-xs font-medium h-8 ${
              available
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            disabled={!available}
          >
            {available ? 'Đặt trước' : 'Đặt trước'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// 4. Library Hours Card
const LibraryHoursCard = ({ campus, address, hours, status }: any) => (
  <div className="bg-blue-600 text-white rounded-xl p-5 relative overflow-hidden flex-1">
    {/* Decorative circles */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

    <h3 className="font-bold text-base mb-1">Giờ mở cửa thư viện</h3>
    <p className="text-[11px] text-blue-100 mb-4 leading-snug">{address}</p>

    <div className="space-y-2 text-xs mb-4">
      {hours.map((h: any, idx: number) => (
        <div
          key={idx}
          className="flex justify-between border-b border-blue-500/30 pb-1 last:border-0"
        >
          <span className="text-blue-100">{h.days}</span>
          <span className="font-bold">{h.time}</span>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-2">
      <span className="text-[10px] text-blue-200">Trạng thái hiện tại</span>
      <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
        {status}
      </span>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="animate-fade-in space-y-8 max-w-7xl mx-auto pb-10">
      {/* 1. Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-full bg-white/10 transform skew-x-12 translate-x-20"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">
            Xin chào, {CURRENT_USER.name.split(' ').pop()}! 👋
          </h1>
          <p className="text-blue-100 mb-6 text-sm">
            Hôm nay bạn có <strong className="text-white">2 sách</strong> sắp
            đến hạn trả.
          </p>
          <div className="flex gap-3">
            <Link to="/my-books">
              <Button className="bg-white text-blue-700 hover:bg-white/90 border-none font-bold text-xs px-5 py-2">
                Xem ngay
              </Button>
            </Link>
            <Button
              variant="outline"
              className="text-white border-white/40 hover:bg-white/10 hover:border-white text-xs px-5 py-2"
            >
              Gia hạn tất cả
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* 3. Due Books Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Sách sắp đến hạn
            </h3>
            <p className="text-xs text-slate-500">
              Danh sách các sách cần trả sớm nhất
            </p>
          </div>
          <Link
            to="/my-books"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center hover:underline"
          >
            Xem tất cả <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {DUE_BOOKS.map((book) => (
            <BookListItem key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* 4. Recommendations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Info size={18} className="text-blue-500" /> Gợi ý cho bạn
            </h3>
            <p className="text-xs text-slate-500">
              Dựa trên môn học và sở thích đọc của bạn
            </p>
          </div>
          <Link
            to="/search"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center hover:underline"
          >
            Xem thêm gợi ý <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-4 overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x">
            {RECOMMENDATIONS.map((book) => (
              <RecommendationCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>

      {/* 5. Footer Info (Hours & Support) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col md:flex-row gap-4">
          <LibraryHoursCard
            campus="Cơ sở 1"
            address="Cơ sở 1: 268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh"
            hours={[
              { days: 'Thứ Hai - Thứ Sáu', time: '07:30 - 20:00' },
              { days: 'Thứ Bảy', time: '07:30 - 17:00' },
              { days: 'Chủ Nhật', time: 'ĐÓNG CỬA' },
            ]}
            status="Đang mở cửa"
          />
          <LibraryHoursCard
            campus="Cơ sở 2"
            address="Cơ sở 2: Khu phố Tân Lập, Phường Đông Hòa, Thành phố Dĩ An, Tỉnh Bình Dương"
            hours={[
              {
                days: 'Thứ Hai - Thứ Sáu',
                time: 'Sáng: 7:30 - 11:30 | Chiều: 13:00 - 17:00',
              },
              { days: 'Thứ Bảy - Chủ Nhật', time: 'ĐÓNG CỬA' },
            ]}
            status="Đang mở cửa"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Liên hệ hỗ trợ</h3>
              <p className="text-xs text-slate-500">
                Chúng tôi luôn sẵn sàng giúp đỡ
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
              <Mail size={16} className="text-slate-400 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm font-bold text-slate-800">
                  library@hcmut.edu.vn
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
              <Phone size={16} className="text-slate-400 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500">Điện thoại</p>
                <p className="text-sm font-bold text-slate-800">
                  (+84) 88 676 5392
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
