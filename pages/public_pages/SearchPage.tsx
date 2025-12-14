import {
  BookOpen,
  CheckCircle,
  Filter,
  Grid,
  ListFilter,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Badge, Button } from '../../components/ui';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<string>(() => {
    const sort = searchParams.get('sort');
    if (sort === 'newest') return 'newest';
    if (sort === 'oldest') return 'oldest';
    if (sort === 'popular') return 'popular';
    return 'relevance';
  });

  useEffect(() => {
    const sort = searchParams.get('sort');
    if (sort === 'newest') setSortBy('newest');
    else if (sort === 'oldest') setSortBy('oldest');
    else if (sort === 'popular') setSortBy('popular');
    else setSortBy('relevance');
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const newParams = new URLSearchParams(searchParams);
    if (value === 'relevance') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', value);
    }
    navigate(`/search?${newParams.toString()}`, { replace: true });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                defaultValue="machine learning cơ bản"
                className="block w-full pl-10 pr-20 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button className="hidden sm:flex h-full px-3 text-gray-500 bg-gray-50 hover:bg-gray-100 border-l border-gray-300 text-sm font-medium items-center">
                  <Sparkles size={14} className="mr-1 text-purple-600" />{' '}
                  Semantic
                </button>
                <button className="ml-2 bg-blue-600 text-white px-4 py-1.5 rounded-r-lg rounded-l-none sm:rounded-lg text-sm font-medium hover:bg-blue-700 mr-1">
                  Tìm kiếm
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto whitespace-nowrap pb-1 md:pb-0 scrollbar-hide">
              <span>Tìm gần đây:</span>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-gray-200"
              >
                Python cơ bản
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-gray-200"
              >
                Data science cho người mới
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center">
                <Filter size={18} className="mr-2" /> Bộ lọc
              </h3>
              <button className="text-xs text-blue-600 hover:underline">
                Xoá tất cả
              </button>
            </div>

            {/* Filter Group */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Tình trạng
              </h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Có bản khả dụng
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Tất cả đang mượn
                  </span>
                </label>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Chủ đề</h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Trí tuệ nhân tạo
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Machine Learning
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Data Science
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Lập trình Python
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Khoa học máy tính
                  </span>
                </label>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Năm xuất bản
              </h4>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Từ"
                  defaultValue="2015"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Đến"
                  defaultValue="2024"
                />
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Ngôn ngữ
              </h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">Tiếng Việt</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">English</span>
                </label>
              </div>
            </div>

            <Button fullWidth variant="primary">
              Áp dụng bộ lọc
            </Button>
          </div>

          {/* Main Results */}
          <div className="flex-grow min-w-0">
            {/* AI Summary Box */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-100 rounded-xl p-5 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={100} className="text-indigo-600" />
              </div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mt-1 shadow-sm">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    AI hiểu yêu cầu của bạn như sau:
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    Bạn đang tìm kiếm tài liệu về{' '}
                    <span className="font-semibold text-indigo-700 bg-indigo-100 px-1 rounded">
                      Machine Learning cơ bản
                    </span>{' '}
                    phù hợp cho người mới bắt đầu, có thể là sách giáo trình
                    hoặc tài liệu tham khảo bằng tiếng Việt.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-gray-500 py-1">
                      Gợi ý tinh chỉnh:
                    </span>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-white border-dashed text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    >
                      + Chỉ sách sau 2020
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-white border-dashed text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    >
                      + Chỉ tiếng Anh
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-white border-dashed text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    >
                      + Có code mẫu Python
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls & Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-lg font-bold text-gray-900">
                47 kết quả cho "machine learning cơ bản"
              </h2>
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm text-blue-600 cursor-pointer font-medium hover:underline flex items-center">
                  <BookOpen size={14} className="mr-1" /> Lưu tìm kiếm này
                </span>
                <div className="h-4 w-px bg-gray-300 mx-2"></div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Sắp xếp:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border-gray-200 rounded-md text-sm font-medium text-gray-700 focus:ring-blue-500 focus:border-blue-500 cursor-pointer py-1.5 pl-2 pr-8"
                  >
                    <option value="relevance">Độ liên quan (AI)</option>
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="popular">Được mượn nhiều</option>
                    <option value="rating">Đánh giá cao nhất</option>
                  </select>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-0.5 ml-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md ${
                      viewMode === 'list'
                        ? 'bg-white shadow-sm text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <ListFilter size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md ${
                      viewMode === 'grid'
                        ? 'bg-white shadow-sm text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              <SearchResultCard
                title="Machine Learning Cơ Bản: Từ Lý Thuyết Đến Thực Hành"
                author="Nguyễn Văn An, Trần Thị Bình"
                year="2023"
                publisher="NXB Đại học Quốc gia"
                image="https://m.media-amazon.com/images/I/61f5XjIRWHL._AC_UF1000,1000_QL80_.jpg"
                tags={['Trí tuệ nhân tạo', 'Machine Learning', 'Python']}
                desc="Cuốn sách cung cấp kiến thức nền tảng về Machine Learning với các thuật toán phổ biến như Linear Regression, Decision Trees, Neural Networks. Bao gồm code mẫu Python và bài tập thực hành chi tiết."
                availability={{
                  total: 12,
                  available: 8,
                  nextReturn: '15/01/2026',
                }}
                link="/book/1"
              />
              <SearchResultCard
                title="Nhập Môn Machine Learning và Deep Learning"
                author="Lê Minh Hoàng"
                year="2022"
                publisher="NXB Thông tin và Truyền thông"
                image="https://m.media-amazon.com/images/I/61q3Kk+yRSL._AC_UF1000,1000_QL80_.jpg"
                tags={['AI/ML', 'Deep Learning', 'Beginner']}
                desc="Tài liệu dành cho sinh viên năm 3-4 ngành CNTT, giới thiệu các khái niệm cơ bản về ML, DL và ứng dụng thực tế. Có phần hướng dẫn sử dụng TensorFlow và Keras."
                availability={{ total: 8, available: 5, ebook: true }}
                link="/book/2"
              />
              <SearchResultCard
                title="Python cho Machine Learning: Hướng Dẫn Toàn Diện"
                author="Phạm Đức Cường, Võ Thị Diệu"
                year="2021"
                publisher="NXB Khoa học Kỹ thuật"
                image="https://m.media-amazon.com/images/I/71951W96oWL._AC_UF1000,1000_QL80_.jpg"
                tags={['Python', 'Machine Learning', 'Scikit-learn']}
                desc="Sách tập trung vào việc triển khai các thuật toán ML bằng Python và thư viện Scikit-learn. Bao gồm 50+ ví dụ thực tế và dự án mini hoàn chỉnh."
                availability={{
                  total: 6,
                  available: 0,
                  nextReturn: '08/01/2026',
                }}
                link="/book/3"
              />
              <SearchResultCard
                title="Khoa Học Dữ Liệu và Machine Learning Cơ Bản"
                author="Hoàng Văn Khánh"
                year="2023"
                publisher="NXB Giáo dục Việt Nam"
                image="https://m.media-amazon.com/images/I/61MhLhF7LzL._AC_UF1000,1000_QL80_.jpg"
                tags={['Data Science', 'Machine Learning', 'Statistics']}
                desc="Giáo trình chính thức cho sinh viên đại học, kết hợp kiến thức thống kê, xử lý dữ liệu và machine learning. Có bài tập và đề thi mẫu kèm theo."
                availability={{ total: 15, available: 12, ebook: true }}
                link="/book/4"
              />
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                &lt;
              </Button>
              <Button variant="primary" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="px-2 py-1 text-gray-500">...</span>
              <Button variant="outline" size="sm">
                10
              </Button>
              <Button variant="outline" size="sm">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchResultCard = ({
  title,
  author,
  year,
  publisher,
  image,
  tags,
  desc,
  availability,
  link,
}: any) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-all duration-300 group">
      <div className="flex-shrink-0 w-full sm:w-36 h-52 bg-gray-100 rounded-lg overflow-hidden relative shadow-sm">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-gray-400 hover:text-blue-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 mb-1 leading-tight">
              <Link to={link}>{title}</Link>
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {author} • {year} • {publisher}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-gray-100 text-gray-600 border border-gray-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-gray-100 pt-3 mt-auto gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm">
            {availability.available > 0 ? (
              <span className="flex items-center text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                <CheckCircle size={14} className="mr-1.5" />{' '}
                {availability.available}/{availability.total} bản khả dụng
              </span>
            ) : (
              <span className="flex items-center text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                <X size={14} className="mr-1.5" /> Hết sách
              </span>
            )}
            {availability.nextReturn && (
              <span className="text-gray-500">
                • Trả sớm nhất: {availability.nextReturn}
              </span>
            )}
            {availability.ebook && (
              <span className="text-blue-600 font-medium flex items-center">
                • <Sparkles size={12} className="mr-1" /> Ebook có sẵn
              </span>
            )}
          </div>

          {/* Fixed overflow buttons by using flex-wrap and gap */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Link to={link} className="flex-grow md:flex-grow-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full whitespace-nowrap"
              >
                Xem chi tiết
              </Button>
            </Link>
            {availability.available > 0 ? (
              <Button
                size="sm"
                className="flex-grow md:flex-grow-0 w-full whitespace-nowrap"
              >
                Đặt trước
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                className="flex-grow md:flex-grow-0 w-full whitespace-nowrap"
              >
                Đăng ký chờ
              </Button>
            )}
            {availability.ebook && (
              <Button
                size="sm"
                variant="ai"
                className="flex-grow md:flex-grow-0 w-full whitespace-nowrap"
              >
                Đọc online
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
