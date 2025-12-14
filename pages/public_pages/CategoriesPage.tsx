import React, { useState } from 'react';
import { BookOpen, Search, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'cs',
      name: 'Khoa học máy tính',
      nameEn: 'Computer Science',
      count: 1250,
      description: 'Lập trình, thuật toán, cấu trúc dữ liệu, hệ điều hành, mạng máy tính',
      color: 'blue',
      icon: '💻'
    },
    {
      id: 'ai',
      name: 'Trí tuệ nhân tạo',
      nameEn: 'Artificial Intelligence',
      count: 680,
      description: 'Machine Learning, Deep Learning, Neural Networks, NLP, Computer Vision',
      color: 'purple',
      icon: '🤖'
    },
    {
      id: 'math',
      name: 'Toán học',
      nameEn: 'Mathematics',
      count: 920,
      description: 'Đại số, Giải tích, Xác suất thống kê, Toán rời rạc, Toán ứng dụng',
      color: 'green',
      icon: '📐'
    },
    {
      id: 'physics',
      name: 'Vật lý',
      nameEn: 'Physics',
      count: 540,
      description: 'Vật lý cơ học, Điện từ học, Vật lý lượng tử, Vật lý vật chất rắn',
      color: 'red',
      icon: '⚛️'
    },
    {
      id: 'chemistry',
      name: 'Hóa học',
      nameEn: 'Chemistry',
      count: 420,
      description: 'Hóa học hữu cơ, Vô cơ, Phân tích, Hóa lý, Hóa sinh',
      color: 'yellow',
      icon: '🧪'
    },
    {
      id: 'biology',
      name: 'Sinh học',
      nameEn: 'Biology',
      count: 380,
      description: 'Sinh học tế bào, Di truyền học, Sinh thái học, Vi sinh vật học',
      color: 'emerald',
      icon: '🧬'
    },
    {
      id: 'engineering',
      name: 'Kỹ thuật',
      nameEn: 'Engineering',
      count: 1100,
      description: 'Cơ khí, Điện, Xây dựng, Công nghệ thông tin, Tự động hóa',
      color: 'indigo',
      icon: '⚙️'
    },
    {
      id: 'business',
      name: 'Kinh doanh',
      nameEn: 'Business',
      count: 750,
      description: 'Quản trị kinh doanh, Marketing, Tài chính, Kế toán, Kinh tế học',
      color: 'orange',
      icon: '💼'
    },
    {
      id: 'literature',
      name: 'Văn học',
      nameEn: 'Literature',
      count: 890,
      description: 'Văn học Việt Nam, Văn học thế giới, Lý luận văn học, Phê bình văn học',
      color: 'pink',
      icon: '📚'
    },
    {
      id: 'history',
      name: 'Lịch sử',
      nameEn: 'History',
      count: 320,
      description: 'Lịch sử Việt Nam, Lịch sử thế giới, Khảo cổ học, Dân tộc học',
      color: 'amber',
      icon: '📜'
    },
    {
      id: 'philosophy',
      name: 'Triết học',
      nameEn: 'Philosophy',
      count: 280,
      description: 'Triết học phương Đông, Triết học phương Tây, Đạo đức học, Logic học',
      color: 'teal',
      icon: '🧘'
    },
    {
      id: 'art',
      name: 'Nghệ thuật',
      nameEn: 'Arts',
      count: 450,
      description: 'Mỹ thuật, Âm nhạc, Sân khấu, Điện ảnh, Nhiếp ảnh',
      color: 'rose',
      icon: '🎨'
    }
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
    teal: 'bg-teal-100 text-teal-700 border-teal-200',
    rose: 'bg-rose-100 text-rose-700 border-rose-200'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Danh mục sách</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Khám phá hàng ngàn đầu sách được phân loại theo các chủ đề khác nhau
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and View Toggle */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600 text-lg">Không tìm thấy danh mục nào phù hợp.</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                to={`/search?category=${category.id}`}
                className={`block bg-white rounded-xl shadow-sm border-2 hover:shadow-md transition-all ${
                  viewMode === 'list' ? 'p-6 flex items-center gap-6' : 'p-6'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className={`w-16 h-16 ${colorClasses[category.color]} rounded-xl flex items-center justify-center text-3xl mb-4 border-2`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{category.nameEn}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-semibold text-gray-700">{category.count} đầu sách</span>
                      <BookOpen className="text-gray-400" size={20} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`w-20 h-20 ${colorClasses[category.color]} rounded-xl flex items-center justify-center text-4xl border-2 flex-shrink-0`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                        <span className="text-sm font-semibold text-gray-700">{category.count} đầu sách</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{category.nameEn}</p>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                    <BookOpen className="text-gray-400 flex-shrink-0" size={24} />
                  </>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{categories.length}</div>
              <div className="text-blue-100">Danh mục</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {categories.reduce((sum, cat) => sum + cat.count, 0).toLocaleString()}
              </div>
              <div className="text-blue-100">Tổng số sách</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Miễn phí</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Truy cập</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

